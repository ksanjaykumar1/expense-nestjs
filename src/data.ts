interface Data {
  report: {
    id: string;
    source: string;
    amount: number;
    created_at: Date;
    updated_at: Date;
    type: ReportType;
  }[];
}
export const data: Data = {
  report: [],
};

// export interface Report {
//   id: string;
//   source: string;
//   amount: number;
//   created_at: Date;
//   updated_at: Date;
//   type: ReportType;
// }

// export const reports: Report[] = [];

export enum ReportType {
  INCOME = 'income',
  EXPENSE = 'expense',
}
