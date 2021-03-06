import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import MonthlyInstallmentCalcForm from "./MonthlyInstallmentCalcForm";


describe("When Mounting MonthlyInstallmentCalcForm", () => {

    let mockValidate: Record<string, Function>, mockGetInstallment: Function;

    beforeAll(() => {
        mockValidate = {
            amount: jest.fn().mockReturnValue("MockReturn")
        };
        mockGetInstallment = jest.fn();
    });

    const renderComponent = (validate = mockValidate) => {
        render(<MonthlyInstallmentCalcForm
            validate={validate}
            getMonthlyInstallment={mockGetInstallment}>54321
            </MonthlyInstallmentCalcForm>);
    }

    test("should have Amount, Duration, Calculate Button and Installment Result elements", () => {
        renderComponent();
        expect(screen.getByLabelText("Amount")).toBeInTheDocument();
        expect(screen.getByLabelText("Duration")).toBeInTheDocument();
        expect(screen.getByText("Calculate")).toBeInTheDocument();
        expect(screen.getByTestId("calculate-button")).toBeInTheDocument();
        expect(screen.queryByTestId("installment-result")).toBeInTheDocument();
    });

    test("Should save the values in the state while user enters", () => {
        renderComponent();
        let amountElement = screen.getByRole("textbox");
        userEvent.clear(amountElement);
        userEvent.type(amountElement, "100000");
        expect(amountElement).toHaveValue("100000");
    });

    test("Should call the validators while focusing out of the element", () => {
        let mockFun = jest.fn().mockImplementation(() => {
            return "validamount"
        });
        renderComponent({
            amount: mockFun
        });
        let amountElement = screen.getByRole("textbox");

        act(() => {
            fireEvent.blur(amountElement, {
                target: {
                    name: "amount",
                    value: "abcdefg"
                }
            });
        });

        expect(mockFun).toHaveBeenCalledWith("abcdefg");
        expect(amountElement).toHaveValue("validamount");
    });

    test("Should not call the validator if not defined on blur", () => {
        let mockFun = jest.fn().mockImplementation(() => {
            return "validamount"
        });
        renderComponent({
            duration: mockFun
        });
        let amountElement = screen.getByRole("textbox");

        act(() => {
            fireEvent.blur(amountElement, {
                target: {
                    name: "amount",
                    value: "abcdefg"
                }
            });
        });
        expect(mockFun).toHaveBeenCalledTimes(0);
        expect(amountElement).toHaveValue("abcdefg");
    });


    test("Should call the getInstallment while submitting the form", () => {
        renderComponent();
        const submitButton = screen.getByTestId("calculate-button");
        act(() => { fireEvent.click(submitButton) });
        expect(mockGetInstallment).toHaveBeenCalled();
    });

});