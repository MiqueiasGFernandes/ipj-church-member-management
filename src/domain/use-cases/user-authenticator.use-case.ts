export interface UserAuthenticatorUseCase {
  login(username: string, password: string): Promise<void>
  logout(): Promise<void>
  checkAuth(options: {isGuest: boolean}): Promise<void>
  checkError(): Promise<void>
}