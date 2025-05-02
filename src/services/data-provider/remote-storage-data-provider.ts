import axios from 'axios';
import { CreateParams, DataProvider, DeleteManyResult, DeleteParams, GetListParams, GetListResult, GetManyReferenceResult, GetManyResult, GetOneParams, RaRecord, UpdateManyResult, UpdateParams } from 'ra-core';

export class RemoteStorageDataProvider implements DataProvider {
  getMany<RecordType extends RaRecord = any>(): Promise<GetManyResult<RecordType>> {
    throw new Error('Method not implemented')
  };
  getManyReference<RecordType extends RaRecord = any>(): Promise<GetManyReferenceResult<RecordType>> {
    throw new Error('Method not implemented')
  };
  updateMany<RecordType extends RaRecord = any>(): Promise<UpdateManyResult<RecordType>> {
    throw new Error('Method not implemented')
  };
  deleteMany<RecordType extends RaRecord = any>(): Promise<DeleteManyResult<RecordType>> {
    throw new Error('Method not implemented')
  };
  async getList(
    resource: string,
    params: GetListParams
  ): Promise<GetListResult<any>> {
    const authorization = { authorization: `Bearer ${localStorage.getItem('token')}` };

    const urlParams = [`sortBy=${params.sort.field}`, `sortDirection=${params.sort.order}`];

    if ('filter' in params && params.filter) {
      Object.entries(params.filter).forEach(([key, value]) => {
        urlParams.push(`${key}=${value}`);
      });
    }

    if ('pagination' in params && params.pagination) {
      Object.entries(params.pagination).forEach(([key, value]) => {
        urlParams.push(`${key}=${value}`);
      });
    }

    const url = `${process.env.REACT_APP_API_URL}/${resource}?${urlParams.join('&')}`;
    const response = await axios.get(url, { ...params, headers: { ...authorization } });
    const { data, total } = response.data;
    return Promise.resolve({ data, total });
  }

  async getOne(
    resource: string,
    params: GetOneParams
  ): Promise<any> {
    const authorization = { authorization: `Bearer ${localStorage.getItem('token')}` };

    const url = `${process.env.REACT_APP_API_URL}/${resource}/${params.id}`;
    try {
      const response = await axios.get(url, { headers: { ...authorization } });
      const { data } = response;
      return Promise.resolve({ data });
    } catch (error) {
      return this.checkError(error);
    }
  }

  async create(
    resource: string,
    params: CreateParams
  ): Promise<any> {
    const url = `${process.env.REACT_APP_API_URL}/${resource}`;
    try {
      const authorization = { authorization: `Bearer ${localStorage.getItem('token')}` };
      const response = await axios.post(url, params.data, { headers: { ...authorization } });
      const { data } = response.data;
      return Promise.resolve({ data });
    } catch (error) {
      return this.checkError(error);
    }
  }

  async update(
    resource: string,
    params: UpdateParams
  ): Promise<any> {
    const url = `${process.env.REACT_APP_API_URL}/${resource}/${params.id}`;
    try {
      const authorization = { authorization: `Bearer ${localStorage.getItem('token')}` };
      const response = await axios.patch(url, params.data, { headers: { ...authorization } });
      const { data } = response.data;
      return Promise.resolve({ data });
    } catch (error) {
      return this.checkError(error);
    }
  }

  async delete(
    resource: string,
    params: DeleteParams
  ): Promise<any> {
    const url = `${process.env.REACT_APP_API_URL}/${resource}/${params.id}`;
    try {
      const authorization = { authorization: `Bearer ${localStorage.getItem('token')}` };
      await axios.delete(url, { headers: { ...authorization } });
      return Promise.resolve({ data: params.previousData });
    } catch (error) {
      return this.checkError(error);
    }
  }

  private async checkError(error: any): Promise<string | null> {
    switch (error.response.status) {
      case 401:
        localStorage.removeItem('token');
        localStorage.removeItem('permissions');

        window.location.href = '/';
        return Promise.reject(null);
      default:
        return Promise.reject(error.response.data.message);
    }
  }
}