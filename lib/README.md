# Nest Access Control

![MIT](https://img.shields.io/cocoapods/l/AFNetworking.svg?style=flat-square)
[![npm version](https://badge.fury.io/js/nest-access-control.svg)](https://badge.fury.io/js/nest-access-control)
![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=102)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/uses-badges.svg)](https://forthebadge.com)

#### A helper Module for building a Role and Attribute based Access Control System for Nestjs

> TL;DR: recently our system was needing to have a Control Panel, so you can control, and monitor every thing from there, and it was really really needing some Role based access control system, so i build this module for that, it is really cool, so i'd love to share it with you, and any PR are more than welcome :heart:

This module is built on top of [onury's](https://github.com/onury) [accesscontrol](https://github.com/onury/accesscontrol) library
here is some of it's Core Features

- Chainable, friendly API.  
  e.g. `ac.can(role).create(resource)`
- Role hierarchical **inheritance**.
- Define grants **at once** (e.g. from database result) or **one by one**.
- Grant/deny permissions by attributes defined by **glob notation** (with nested object support).
- Ability to **filter** data (model) instance by allowed attributes.
- Ability to control access on **own** or **any** resources.
- Ability to **lock** underlying grants model.
- No **silent** errors.
- **Fast**. (Grants are stored in memory, no database queries.)
- Brutally **tested**.
- TypeScript support.

#### What does this Module Provide?

In this module you will have all these features out of the box, but in nest-ish way.

- It's **Decorator-based** so most of the time you will use decorators in your routes.
- Built-in **ACGuard** so you can go and use it directly.
- Access to the underlying **AccessControl** object from everywhere.

## Installation

- NPM:

```bash
npm install nest-access-control --save
```

- Yarn:

```bash
yarn add nest-access-control
```

---

#### Example

> See example folder for the more code

We need to build a Video service so users can share there videos with others, but we need some `admins` to control these videos.

1.  Let's first define our roles:

    To build our roles we will need the `RolesBuilder` class, it extends the `AccessControl` class from `accesscontrol` package.

    ```ts
    // app.roles.ts

    export enum AppRoles {
      USER_CREATE_ANY_VIDEO = 'USER_CREATE_ANY_VIDEO',
      ADMIN_UPDATE_OWN_VIDEO = 'ADMIN_UPDATE_OWN_VIDEO',
    }

    export const roles: RolesBuilder = new RolesBuilder();

    roles
      .grant(AppRoles.USER_CREATE_ANY_VIDEO) // define new or modify existing role. also takes an array.
        .createOwn('video') // equivalent to .createOwn('video', ['*'])
        .deleteOwn('video')
        .readAny('video')
      .grant(AppRoles.ADMIN_UPDATE_OWN_VIDEO) // switch to another role without breaking the chain
        .extend(AppRoles.USER_CREATE_ANY_VIDEO) // inherit role capabilities. also takes an array
        .updateAny('video', ['title']) // explicitly defined attributes
        .deleteAny('video');
    ```

> Pro Tip :+1: : Keep all roles organized and in one file e,g: `app.roles.ts`

2.  Next let's use `AccessControlModule` in our Root module:

```ts
    // app.module.ts

    import { roles } from './app.roles';

    @Module({
      imports: [AccessControlModule.forRoles(roles)],
      controllers: [AppController],
      providers: [AppService],
    })
    export class AppModule {}
```

Until now everything is fine, but let's make our application,
assume that we have list of video names, user can - _according to our roles_ - `create:own` new video, and `read:any` video, so let's build it:

```ts
    // app.controller.ts
    ...
    @Controller()
    export class AppController  {
      constructor(private readonly appService: AppService)  {}
      @UseGuards(AuthGuard, ACGuard)
      @UseRoles({
        resource:  'video',
        action:  'read',
        possession:  'any',
      })
      @Get()
      root(@UserRoles() userRoles: any)  {
        return this.appService.root(userRoles);
      }
    }
```

### ForRootAsync 

Injecting providers for a RoleBuilder Factory (using a database to populate roles)

```ts
@Injectable()
class RoleProvider {

  getRoles(): Promise<string[]> {
    return Promise.resolve([
      'my-custom-role',
    ]);
  }
}

@Module({
  providers: [RoleProvider],
  exports: [RoleProvider],
})
class RoleModule {

}

@Module({
  imports: [
    AccessControlModule.forRootAsync({
      imports: [TestModule],
      inject: [RoleService],
      useFactory: async (roleService: RoleService): Promise<RolesBuilder> => {
        return new RolesBuilder(await roleService.getRoles());
      },
    }),
  ],
})
export class AccessModule {}
```
Notice the use of `imports` in the forRootAsync method. This will allow you to inject exported providers from the imported module. Injecting providers, provided in the same module as the imported AccessControlModule will result in the provider not being found. This is because the module is created before the providers.

So let's discuss what's going on!

First we introduced two new decorators, actually they are three, but let's see what they can do:

- `@UseRoles({ ... })`: this the most used decorator, it define what roles should user have to access this route.
  It may take one or more role, but keep in mind that all roles **must** be satisfied.
  The structure of the role is really simple, for example, here we define what resources we have, and the **ACGuard\*** - _Damn, it's a good name for a guard :joy:_ - will check for the user roles, then if the user roles have the permissions to access this resource the guard will return `true`, else it will throw a `ForbiddenException`.
  For more information about the structure of roles see `roles.interface.ts` file or read the original [documentation](https://onury.io/accesscontrol/) form `accesscontrol` library [here](https://onury.io/accesscontrol/?api=ac#AccessControl~IQueryInfo).
  > \*note: for those who are asking what ACGuard stands for, it of course stands for Access Control Guard :smile:

* `UserRoles(<prop>)`: if you want to get access to the user roles directly, maybe you want to check it's roles manually instead of `ACGuard` doing it for you, then that decorator is what you are looking for.
  The decorator is really simple, it just return the `req.user.roles` value from the `request` object, but wait, what if the user roles doesn't exist in `prop: role`?  We knew that you would ask this question, so you can pass an optional property key to the decorator to get it from the user object e.g `@UserRoles('permissions')` will return the `req.user.permissions` instead.

* `@InjectRolesBuilder()`: if you hate the `ACGuard` - _imo it's a good guard_ - and want to build your own Guard instead, you will likely need to access to the underlying `RolesBuilder` Object , then that decorator is for you; it will inject the `Roles` you have defined before, i.e the object passed to the `AccessControlModule.forRoles(roles)`.

4.  Are you still there? Ok, that's it, you can go and run the application now, but wait, did someone asked for the `AuthGuard`?
    Ok let's discuss the **LIMITATIONS**.

#### Limitations

First of all, this module built with some assumptions

1.  The user object will exist in `req.user`
2.  It is up to you to build your own `AuthGuard` that will attach the `user` object to the `req` object, [read more](https://docs.nestjs.com/guards)
3.  The `AuthGuard` must be registered before roles guard, in this case it's `ACGuard`, and of course you can combine the `AuthGuard` and `ACGuard` in one guard, and use it everywhere.

Secondly, i don't think these are limitations, since you can easily build your own guard and you don't need the built-in ones anymore.

## CHANGELOG

See [CHANGELOG](CHANGELOG.md) for more information.

## Contributing

You are welcome with this project for contributing, just make a PR.

## Authors

- **Shady Khalifa** - _Initial work_

See also the list of [contributors](https://github.com/nestjsx/nest-access-control/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
