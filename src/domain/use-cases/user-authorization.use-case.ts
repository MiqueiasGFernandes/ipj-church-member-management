export interface UserAuthorizationUseCase {
  getPermissions(): Promise<string>
}