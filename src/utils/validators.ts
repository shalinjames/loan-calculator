import { AMOUNT, LOAN_DURATION } from "../constants/range";

const purifyInput = (str: string) => {
    const regex = new RegExp(/[^0-9.]/g);
    return str.replace(regex, "");
}

const validateAmount = (amount: string): string => {

    amount = purifyInput(amount);

    if (amount === "") {
        return AMOUNT.MIN;
    }
    const amt = parseInt(amount);

    if (amt < parseInt(AMOUNT.MIN)) {
        return AMOUNT.MIN
    }

    if (amt > parseInt(AMOUNT.MAX)) {
        return AMOUNT.MAX
    }
    return amt.toString();
};

const validateDuration = (duration: string): string => {

    duration = purifyInput(duration);

    const dur = parseInt(duration);
    const durationMin = parseInt(LOAN_DURATION.MIN);
    const durationMax = parseInt(LOAN_DURATION.MAX);

    if (isNaN(dur) || dur < durationMin) {
        return LOAN_DURATION.MIN
    }

    if (dur > durationMax) {
        return LOAN_DURATION.MAX
    }
    return dur.toString();
};

export { validateAmount, validateDuration }