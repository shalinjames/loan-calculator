import { validateAmount, validateDuration } from "./validators";
import { AMOUNT, LOAN_DURATION } from "../../constants/range";

describe("When Validators are called", () => {

    describe("When validateAmount is called", () => {
        test("should return invalid input error message for empty string", () => {
            expect(validateAmount("")).toEqual(AMOUNT.MIN);
        });

        test("should return invalid input error message for 123abcd", () => {
            expect(validateAmount("123abcd")).toEqual(AMOUNT.MIN);
        });

        test("should return lower amount error message for 9999", () => {
            expect(validateAmount("9999")).toEqual(AMOUNT.MIN);
        });

        test("should return higher amount message for 100001", () => {
            expect(validateAmount("100001")).toEqual(AMOUNT.MAX);
        });

        test("should return empty string for valid input", () => {
            expect(validateAmount("15000")).toEqual("15000");
        });
    });

    describe("When validateDuration is called", () => {

        test("should return invalid input error message for empty string", () => {
            expect(validateDuration("")).toEqual(LOAN_DURATION.MIN);
        });

        test("should return invalid input error message for 123abcd", () => {
            expect(validateDuration("123abcd")).toEqual(LOAN_DURATION.MAX);
        });

        test("should return lower amount error message for 0", () => {
            expect(validateDuration("0")).toEqual(LOAN_DURATION.MIN);
        });

        test("should return higher amount message for 6", () => {
            expect(validateDuration("6")).toEqual(LOAN_DURATION.MAX);
        });

        test.each`
        input | expected
        ${"1"}  | ${"1"}
        ${"2"}  | ${"2"}
        ${"3"}  | ${"3"}
        ${"4"}  | ${"4"}
        ${"5"}  | ${"5"}
        `("", ({ input, expected }) => {
            expect(validateDuration(input)).toEqual(expected);
        })

    });
});