import { Test, TestingModule } from '@nestjs/testing';
import { PATH_METADATA } from '@nestjs/common/constants';
import { GrantsController } from './grants.controller';
import { RolesBuilder } from './roles-builder.class';
import { ROLES_BUILDER_TOKEN } from './constants';

describe('Grants Controller #getGrants', () => {

  let controller: GrantsController;
  const roles: RolesBuilder = new RolesBuilder();

  beforeEach(async () => {

    Reflect.defineMetadata(PATH_METADATA, 'grants', GrantsController);

    const module: TestingModule = await Test.createTestingModule({
      controllers: [
        GrantsController,
      ],
      providers: [
        {
          provide: ROLES_BUILDER_TOKEN,
          useValue: roles,
        },
      ],
    }).compile();

    controller = module.get<GrantsController>(GrantsController);
  });

  it('should should return grants provided', () => {
    expect(controller.getGrants()).toBe(roles.getGrants());
  });
});
