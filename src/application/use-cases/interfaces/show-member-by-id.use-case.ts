import { MemberDto } from "@application/dto";

export interface IShowMemberById {
  execute(id: string): Promise<MemberDto>
}