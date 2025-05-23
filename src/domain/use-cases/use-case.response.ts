export enum UseCaseErrorEnum {
  DUPLICATED_RESOURCE = 'DUPLICATED_RESOURCE'
}

export type UseCaseResponse<T> =  {
  errorName?: string
  errorMessage?: string,
  data?: T
}