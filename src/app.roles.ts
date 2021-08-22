import { RolesBuilder } from "nest-access-control";
export enum AppRoles{
    user='user',
    admin='admin'
}
export enum AppResource{
    User='user',
    Lugar='lugar'
}
export const roles:RolesBuilder= new RolesBuilder();
roles
    // User Roles
    .grant(AppRoles.user)
    .updateOwn(AppResource.User)
    .deleteOwn(AppResource.User)
    // admin Roles
    .grant(AppRoles.admin)
    .extend(AppRoles.user)
    .createAny(AppResource.User,AppResource.Lugar)
    .updateAny(AppResource.User,AppResource.Lugar)
    .deleteAny(AppResource.User,AppResource.Lugar)