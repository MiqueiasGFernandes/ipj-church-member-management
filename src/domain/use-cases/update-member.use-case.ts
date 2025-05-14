import { MemberDto } from "@application/dto";

export interface IUpdateMemberUseCase {
  execute(member: Partial<MemberDto>): Promise<MemberDto>
}