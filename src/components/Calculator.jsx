import { useState } from "react"

export default function Calculator() {
    const [calc, setCalc] = useState({
        amount: 0,
        interestRate: 0,
        loanTerm: 0,
        monthlyPayment: 0
    })

    function handleChange(event) {
        const { name, value } = event.target
        setCalc(prevCalc => ({
            ...prevCalc,
            [name]: value
        }))
    }

    function calculateQuote() {
        // calculate aux variables
        console.log(calc)
        const monthlyInterestRate = (calc.interestRate / 100) / 12
        const numberOfPayments = calc.loanTerm * 12
        // calculate monthly payment
        const monthlyPayment = (calc.amount * monthlyInterestRate) / (1 - Math.pow((1 + monthlyInterestRate), -numberOfPayments))
        
        setCalc(prevCalc => ({
            ...prevCalc,
            monthlyPayment: monthlyPayment.toFixed(2)
        }))
    }

    return (
        <div className="calculator">
            <div className="calculator-inputs">
                <div>
                    <label htmlFor="amount">Enter Amount</label>
                    <input type="text" name="amount" onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="interestRate">Interest rate</label>
                    <input type="text" name="interestRate" onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="loanTerm">Loan term</label>
                    <input type="text" name="loanTerm" onChange={handleChange} />
                </div>
                <br />
                <button onClick={calculateQuote}>Calculate</button>
            </div>
            <div className="calculator-results">
                <h2>Your monthly quote is:</h2>
                <p>Total: ${calc.monthlyPayment}</p>
            </div>
        </div>
    )
}