export type MemberRequestDto = {
  id: string,
  memberId: string,
  status: 'rejected' | 'approved' | 'pending',
  createdAt: string,
  updatedAt: string,
}