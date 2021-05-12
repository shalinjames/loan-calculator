export interface MonthlyInstallmentReq {
    amount: string;
    duration: string;
}

export interface MonthlyInstallmentRes {
    amount: string;
    duration: string;
    monthlyInstallment: string
}
