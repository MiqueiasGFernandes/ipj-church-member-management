export interface IAdminAuthenticateUseCase {
  login(username: string, password: string): Promise<void>
}