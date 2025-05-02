import { MemberDto } from "@application/dto";

export interface IAddMemberUseCase {
  execute(member: MemberDto): Promise<MemberDto>
}