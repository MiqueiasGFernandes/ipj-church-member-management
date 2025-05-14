import { MemberRequestDto } from "@application/dto";

export interface IShowMemberRequestById {
  execute(id: string): Promise<MemberRequestDto>
}