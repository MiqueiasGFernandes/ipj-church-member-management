export interface IAdminAuthenticateUseCase {
  execute(username: string, password: string): Promise<void>
}