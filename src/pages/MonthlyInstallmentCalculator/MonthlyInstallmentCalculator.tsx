import React, { useState } from 'react';
import MonthlyInstallmentCalcForm from '../../components/MonthlyInstallmentCalcForm/MonthlyInstallmentCalcForm';
import { validateAmount } from "../../utils/validators";
import { monthlyInstallment } from "../../services/loanapi/loan.api";
import { MonthlyInstallmentReq } from "../../types";
import { DATA_FETCH_ERROR } from "../../constants/errors"

const MonthlyInstallmentCalculator = () => {
    const [installment, setInstallment] = useState<string>("");
    const validate = {
        amount: validateAmount
    }

    const getMonthlyInstallment = ({ amount, duration }: MonthlyInstallmentReq) => {
        monthlyInstallment({ amount, duration }).then(response => {
            setInstallment(`Monthly Installments: ${response.data.monthlyInstallment}`);
        }).catch(_ => {
            setInstallment(DATA_FETCH_ERROR);
        });
    }
    return <div className="app-container">
        <MonthlyInstallmentCalcForm
            validate={validate}
            getMonthlyInstallment={getMonthlyInstallment}>
            {installment}
        </MonthlyInstallmentCalcForm>
    </div>
}


export default MonthlyInstallmentCalculator;