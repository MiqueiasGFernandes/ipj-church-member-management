export enum UseCaseErrorEnum {
  DUPLICATED_RESOURCE = 'DUPLICATED_RESOURCE',
}

export type UseCaseResponse<T> = {
  error?: {
    name: string
    message: string,
  }
  data?: T
}