export interface IAdminGetPermissionsUseCase {
  execute(): Promise<string>
}