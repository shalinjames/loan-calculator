import React, { useState } from "react";
import { AMOUNT, LOAN_DURATION } from "../../constants/range";
import Form from "./Form";
import { Paper } from '@material-ui/core';

interface MonthlyInstallmentCalcFormProps {
    validate: {
        [key: string]: Function
    },
    getMonthlyInstallment: Function,
    children: React.ReactChild
}

const MonthlyInstallmentCalcForm = ({ validate, getMonthlyInstallment, children }: MonthlyInstallmentCalcFormProps) => {

    const [inputValues, setInputValues] = useState<Record<string, string>>({ amount: AMOUNT.DEFAULT, duration: LOAN_DURATION.DEFAULT });

    const handleSubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        const formValues: Record<string, string> = {};
        Object.keys(inputValues).forEach(key => {
            if (validate[key]) {
                formValues[key] = validate[key](inputValues[key]);
            } else {
                formValues[key] = inputValues[key];
            }

        });
        setInputValues(formValues);
        getMonthlyInstallment(inputValues);
    };


    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setInputValues({
            ...inputValues,
            [name]: value,
        });
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (validate[name]) {
            setInputValues({
                ...inputValues,
                [name]: validate[name](value)
            });
        }

    }

    return <Paper elevation={3} data-testid="monthly-installment-calc-form">
        <h1>Calculate Your Loan Installments</h1>
        <Form
            handlers={{ handleSubmit, handleBlur, handleChange }}
            values={inputValues}
        ></Form>
        <div className="installment-result" data-testid="installment-result">{children}</div>
    </Paper>
}

export default MonthlyInstallmentCalcForm;