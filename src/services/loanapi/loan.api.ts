import axios, { AxiosResponse } from "axios"

const monthlyInstallmentUrl = "/monthlyInstallment.response.json";

interface MonthlyInstallmentReq {
    amount: string;
    duration: string;
}

interface MonthlyInstallmentRes {
    amount: string;
    duration: string;
    monthlyInstallment: string
}

interface MonthlyInstallmentResBase {
    data: MonthlyInstallmentRes
}

export function monthlyInstallment({ amount, duration }: MonthlyInstallmentReq):
    Promise<AxiosResponse<MonthlyInstallmentRes>> {
    return axios.get<MonthlyInstallmentRes>(monthlyInstallmentUrl, {
        params: {
            amount,
            duration
        }
    });
}

