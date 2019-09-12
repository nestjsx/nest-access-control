import {AccessControlModule} from './access-control.module';
import {Test, TestingModule} from '@nestjs/testing';
import { RolesBuilder } from './roles-builder.class';
import {ROLES_BUILDER_TOKEN} from './constants';
import { delay } from 'rxjs/operators';
import { GrantsController } from './grants.controller';

describe('forRootAsync', () => {
  it('Can instance with provider method', async () => {

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AccessControlModule.forRootAsync({
          useFactory: (): RolesBuilder => new RolesBuilder(),
        }),
      ],
    }).compile();

    const roles = module.get(ROLES_BUILDER_TOKEN);

    expect(roles).toBeInstanceOf(RolesBuilder);
  });

  it('Can instance with asnyc provider method', async () => {

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AccessControlModule.forRootAsync({
          useFactory: async (): Promise<RolesBuilder> => {
            await delay(100);
            return new RolesBuilder();
          },
        }),
      ],
    }).compile();

    const roles = module.get(ROLES_BUILDER_TOKEN);

    expect(roles).toBeInstanceOf(RolesBuilder);
  });
});

describe('forRoles', () => {
  it('Expose <serveGrants> endpoint when a value is provided', async () => {

    const roles: RolesBuilder = new RolesBuilder();
    const serveGrants = 'grants';

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AccessControlModule.forRoles(roles, serveGrants),
      ],
    }).compile();

    const controller = module.get<GrantsController>(GrantsController);

    expect(controller).toBeDefined();
    expect(Reflect.getMetadata('path', GrantsController)).toBe(serveGrants);
  });

  it('Do not expose <serveGrants> endpoint when a value is not provided', async () => {

    const roles: RolesBuilder = new RolesBuilder();

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AccessControlModule.forRoles(roles),
      ],
    }).compile();

    expect(() => {
      module.get<GrantsController>(GrantsController);
    }).toThrowError();
  });
});
