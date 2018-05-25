import { Inject } from '@nestjs/common';
import { ROLES_BUILDER_TOKEN } from '../constants';

/**
 *  Get access to the underlying `RolesBuilder` Object
 */
export const InjectRolesBuilder = () => Inject(ROLES_BUILDER_TOKEN);
