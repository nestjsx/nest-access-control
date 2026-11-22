import 'reflect-metadata';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ACGuard } from './access-control.guard';
import { UseRoles } from './decorators/use-roles.decorator';
import { RolesBuilder } from './roles-builder.class';

const read = { resource: 'record', action: 'read', possession: 'any' } as const;
const update = { resource: 'record', action: 'update', possession: 'any' } as const;

@UseRoles(read)
class ControllerPolicy {
  index() {}

  @UseRoles(update)
  edit() {}

  @UseRoles()
  inherit() {}
}

class HandlerPolicy {
  @UseRoles(update)
  edit() {}

  index() {}
}

const context = (target: typeof ControllerPolicy | typeof HandlerPolicy, handler: Function, role?: string) =>
  ({
    getClass: () => target,
    getHandler: () => handler,
    getType: () => 'http',
    switchToHttp: () => ({ getRequest: () => ({ user: role ? { roles: [role] } : undefined }) }),
  }) as unknown as ExecutionContext;

describe('ACGuard policy composition', () => {
  const policy = new RolesBuilder();
  policy.grant('reader').readAny('record');
  policy.grant('editor').updateAny('record');
  policy.grant('owner').readAny('record').updateAny('record');
  const guard = new ACGuard(new Reflector(), policy);

  it('enforces a controller policy without handler metadata', async () => {
    const handler = ControllerPolicy.prototype.index;
    await expect(guard.canActivate(context(ControllerPolicy, handler, 'reader'))).resolves.toBe(true);
    await expect(guard.canActivate(context(ControllerPolicy, handler, 'editor'))).resolves.toBe(false);
    await expect(guard.canActivate(context(ControllerPolicy, handler))).rejects.toBeInstanceOf(UnauthorizedException);
  });

  it('preserves a handler policy without a controller policy', async () => {
    const handler = HandlerPolicy.prototype.edit;
    await expect(guard.canActivate(context(HandlerPolicy, handler, 'editor'))).resolves.toBe(true);
    await expect(guard.canActivate(context(HandlerPolicy, handler, 'reader'))).resolves.toBe(false);
  });

  it('requires both policies when the controller and handler declare permissions', async () => {
    const handler = ControllerPolicy.prototype.edit;
    await expect(guard.canActivate(context(ControllerPolicy, handler, 'owner'))).resolves.toBe(true);
    await expect(guard.canActivate(context(ControllerPolicy, handler, 'editor'))).resolves.toBe(false);
    await expect(guard.canActivate(context(ControllerPolicy, handler, 'reader'))).resolves.toBe(false);
  });

  it('keeps the controller policy when a handler declares no additional requirements', async () => {
    await expect(guard.canActivate(context(ControllerPolicy, ControllerPolicy.prototype.inherit, 'editor')))
      .resolves.toBe(false);
  });

  it('leaves undecorated targets alone', async () => {
    await expect(guard.canActivate(context(HandlerPolicy, HandlerPolicy.prototype.index))).resolves.toBe(true);
  });

  it('does not write principal roles into reusable decorator metadata', async () => {
    const handler = ControllerPolicy.prototype.index;
    await guard.canActivate(context(ControllerPolicy, handler, 'reader'));
    expect(new Reflector().get('roles', ControllerPolicy)).toEqual([
      { resource: 'record', action: 'read', possession: 'any' },
    ]);
  });
});
