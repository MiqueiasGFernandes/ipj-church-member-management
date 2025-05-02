import { MemberDto } from "@application/dto";

type Options = {
  page: number,
  perPage: number,
  sort: {
    direction: string,
    by: keyof MemberDto
  }
}

type PaginatedResult = {
  data: MemberDto[]
  count: number
  currentPage: number
}

export interface IListMemberUseCase {
  execute(options: Options): Promise<PaginatedResult>
}