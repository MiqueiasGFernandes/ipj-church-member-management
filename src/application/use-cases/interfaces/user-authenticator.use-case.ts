export interface IUserAuthenticateUseCase {
  login(username: string, password: string): Promise<void>
}