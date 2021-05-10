import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { monthlyInstallment } from "./loan.api";
import monthlyInstallmentResponse from "../../test/monthlyInstallment.response.json";

describe("Loan API monthlyInstallment is called", () => {
    let mockAdapter: MockAdapter;

    beforeAll(() => {
        mockAdapter = new MockAdapter(axios);
    });

    afterAll(() => {
        mockAdapter.reset();
    });

    test("should receive the monthly installment for provided payload", () => {

        mockAdapter.onGet('/monthlyInstallment.response.json').replyOnce(200, monthlyInstallmentResponse);

        const requestPayload = { "amount": "10000.00", "duration": "5" };

        expect.assertions(2);

        return monthlyInstallment(requestPayload).then((response) => {
            expect(response.data).toHaveProperty("monthlyInstallment");
            expect(response.data.monthlyInstallment).toEqual("5390.61");
        });

    });

    test("should return 4XX error while trying to send wrong params", () => {
        const requestPayload = { "amount": "abc", "duration": "nothing!" };

        mockAdapter.onGet('/monthlyInstallment.response.json', { params: requestPayload }).networkErrorOnce();

        expect.assertions(1);

        return monthlyInstallment(requestPayload).catch((exception) => {
            expect(exception.isAxiosError).toBeTruthy();
        });
    });

    test("should timeout while trying to send empty params", () => {
        const requestPayload = { "amount": "timeout", "duration": "timeout" };

        mockAdapter.onGet('/monthlyInstallment.response.json', { params: requestPayload }).replyOnce(500);

        expect.assertions(1);

        return monthlyInstallment(requestPayload).catch((exception) => {
            expect(exception.isAxiosError).toBeTruthy();
        });
    });
});