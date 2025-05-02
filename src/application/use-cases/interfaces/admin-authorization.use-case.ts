export interface IAdminGetPermissionsUseCase {
  getPermissions(): Promise<string>
}