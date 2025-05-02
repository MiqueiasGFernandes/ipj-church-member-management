export interface IUserGetPermissionsUseCase {
  getPermissions(): Promise<string>
}