import axios, { AxiosResponse } from "axios"
import { MonthlyInstallmentReq, MonthlyInstallmentRes } from "../../types"

const monthlyInstallmentUrl = "/monthlyInstallment.response.json";

export function monthlyInstallment({ amount, duration }: MonthlyInstallmentReq):
    Promise<AxiosResponse<MonthlyInstallmentRes>> {
    return axios.get<MonthlyInstallmentRes>(monthlyInstallmentUrl, {
        params: {
            amount,
            duration
        }
    });
}

