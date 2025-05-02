import axios from 'axios';
import { AuthProvider } from 'ra-core';

export class RemoteAuthProvider implements AuthProvider {
  async register({ name, email, password }: { name: string, email: string, password: string }): Promise<void> {
    try {
      const url = `${process.env.REACT_APP_LOGIN_URL}/register`;
      await axios.post(url, { name, email, password });
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async login(params: { username: string, password: string }): Promise<{ redirectTo?: string | boolean; } | void | any> {
    const url = `${process.env.REACT_APP_LOGIN_URL}/login`;
    try {
      const response = await axios.post(url, { email: params.username, password: params.password });
      const { access_token } = response.data;
      localStorage.setItem('token', access_token);
      localStorage.setItem('permissions', 'admin');
      return Promise.resolve();
    } catch (error: any) {
      if (error.response.status === 429) {
        return Promise.reject(
          'Limite máximo de solicitações atingido. Tente novamente mais tarde',
        );
      }
      return Promise.reject(error.response.message);
    }
  }
  async logout(): Promise<void | false | string> {
    localStorage.removeItem('token');
    localStorage.removeItem('permissions');
    return Promise.resolve();
  }


  checkAuth(params: { isGuest: boolean }): Promise<void> {
    if (params.isGuest) {
      return Promise.resolve();
    }
    const isAuth = localStorage.getItem('token');
    return isAuth ? Promise.resolve() : Promise.reject();
  }
  checkError(error: { status: number }): Promise<void> {
    if (error.status === 401 || error.status === 403) {
      localStorage.removeItem('token');
      window.location.href = '/login';
      return Promise.reject();
    }
    return Promise.resolve();
  }
  getPermissions(): Promise<any> {
    const role = localStorage.getItem('permissions');
    return Promise.resolve(role || 'guest');
  }
}