import {AccessControlModule} from './access-control.module';
import {Test, TestingModule} from '@nestjs/testing';
import { RolesBuilder } from './roles-builder.class';
import {ROLES_BUILDER_TOKEN} from './constants';

describe('forRootAsync', () => {
  it('Can instance with asnyc provider method', async () => {

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
});
