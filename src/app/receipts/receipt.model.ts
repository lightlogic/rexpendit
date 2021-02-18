export interface Receipt {
  id: string;
  debitorOrganisation: string;
  creditorUser: string;
  totalCreditAmount: number;
  creditDate: string;
  description: string;
  digitalCopy: string;
  createdAt: string;
}
