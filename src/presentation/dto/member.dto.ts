export class MemberDto {
  /**
   * Nome
   */
  name: string;
  /**
   * Matrícula gerada automaticamente
   */
  memberDocumentId?: string;
  /**
   * Data de Nascimento
   */
  birthdate: Date;
  /**
   * Naturalidade
   */
  naturality: string;
  /**
   * UF
   */
  ufOrigin: string;
   /**
   * Estado civil
   */
  maritalStatus: string;
  /**
   * Data de Casamento (opcional)
   */
  weddingDate?: Date;
  /**
   * Nome do Cônjuge (opcional)
   */
  spouse?: string;
  /**
   * Nome do Pai
   */
  fatherName: string;
   /**
   * Nome da Mãe
   */
  motherName: string;
   /**
   * Outros membros da família (opcional)
   */
  anotherFamilyMembers?: string;
  /**
   * CEP
   */
  cep: string;
  /**
   * Endereço
   */
  address: string;
  /**
   * Telefone Celular
   */
  mobilePhone: string;
  /**
   * Email
   */
  email: string;
  /**
   * Grau de escolaridade
   */
  schooling: string;
  /**
   * Profissão
   */
  occupation: string;
  /**
   * É membro
   */
  isMember: string;
  /**
   * Igreja presbiteriana anterior
   */
  previousPresbyterianChurch?: string;
  /**
   * Data de pedobatismo
   */
  pedobaptismDate?: Date;
  /**
   * Ministro de pedobatismo
   */
  pedobaptismMinister?: string;
  /**
   * Data de confissão de Fé
   */
  faithConfessionDate?: Date;
  /**
   * Ministro de confissão de Fé
   */
  faithConfessionMinister?: string;
  /**
   * Observações
   */
  observations?: string;
  /**
   * Frequentante
   */
  frequenter: string;
}
