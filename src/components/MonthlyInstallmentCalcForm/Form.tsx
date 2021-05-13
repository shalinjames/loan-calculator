import React from "react";
import {
    Input,
    InputLabel,
    InputAdornment,
    FormControl,
    Button,
    Select,
    FormHelperText
} from '@material-ui/core';

type handlers = {
    handleChange: any,
    handleSubmit: React.MouseEventHandler,
    handleBlur: React.FocusEventHandler
}

interface FormProps {
    handlers: handlers
    values: Record<string, string>,
}

const Form = ({
    handlers: { handleChange, handleSubmit, handleBlur },
    values
}: FormProps) =>
    <form noValidate autoComplete="off" className="installment-form">
        <FormControl>
            <InputLabel htmlFor="amount">Amount</InputLabel>
            <Input
                data-testid="amount"
                id="amount"
                name="amount"
                value={values.amount}
                onChange={handleChange}
                onBlur={handleBlur}
                startAdornment={<InputAdornment position="start">€</InputAdornment>}
            />
            <FormHelperText>amount € 10,000 - € 100,000</FormHelperText>
        </FormControl>

        <FormControl>
            <InputLabel htmlFor="duration">Duration</InputLabel>
            <Select
                native
                labelId="duration"
                id="duration"
                name="duration"
                value={values.duration}
                onChange={handleChange}
            >   {[1, 2, 3, 4, 5].map((key) => <option key={key} value={key}>{key}</option>)}
            </Select>
            <FormHelperText>Lending Duration 1-5 years</FormHelperText>
        </FormControl>
        <FormControl style={{ marginTop: 16, marginLeft: 20 }}>
            <Button
                data-testid="calculate-button"
                onClick={handleSubmit}
                variant="contained"
                color="primary">Calculate</Button>
        </FormControl>
    </form >;

export default Form;