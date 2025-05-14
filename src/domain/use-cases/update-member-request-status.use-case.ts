export interface IUpdateMemberRequestStatusUseCase {
  execute(requestId: string, status: 'approved' | 'rejected'): Promise<void>
}