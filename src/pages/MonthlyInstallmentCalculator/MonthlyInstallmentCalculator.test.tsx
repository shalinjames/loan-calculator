import React from "react";
import axios from "axios";
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import MonthlyInstallmentCalculator from "./MonthlyInstallmentCalculator";
import MockAdapter from "axios-mock-adapter";
import { DATA_FETCH_ERROR } from "../../constants/errors";

describe("When MonthlyInstallmentCalculator is rendered", () => {

    let mockAdapter: MockAdapter;

    beforeAll(() => {
        mockAdapter = new MockAdapter(axios);
    });

    afterAll(() => {
        mockAdapter.reset();
    });

    const renderComponent = () => {
        render(<MonthlyInstallmentCalculator />);
    }
    test("Should set mount the MonthlyInstallmentCalcForm", () => {
        renderComponent();
        expect(screen.getByTestId("monthly-installment-calc-form")).toBeInTheDocument();
    });

    test("Should set the monthly installment response", async () => {
        renderComponent();
        mockAdapter.onGet('/monthlyInstallment.response.json').replyOnce(200, { monthlyInstallment: "300" });
        const submitButton = screen.getByTestId("calculate-button");
        act(() => {
            fireEvent.click(submitButton);
        });
        await waitFor(() => {
            expect(screen.getByTestId("installment-result")).toHaveTextContent("Monthly Installments: 300");
        })
    });

    test("Should set the monthly installment response", async () => {
        renderComponent();
        mockAdapter.onGet('/monthlyInstallment.response.json').replyOnce(400);
        const submitButton = screen.getByTestId("calculate-button");
        act(() => {
            fireEvent.click(submitButton);
        });
        await waitFor(() => {
            expect(screen.getByTestId("installment-result")).toHaveTextContent(DATA_FETCH_ERROR);
        })
    });
})