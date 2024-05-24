import React, { useEffect, useState } from 'react'
import {tenureData} from '../utils/constants.js'
import { NumberWithCommas } from '../utils/config.js'
import TextInput from './TextInput.jsx'
import SliderInput from './SliderInput.jsx'

function EMICalculator() {
    const [cost, setCost] = useState(0)
    const [interest, setInterest] = useState(10)
    const [fee, setFee] = useState(1)
    const [downPayment, setDownPayment] = useState(0)
    const [emi, setEmi] = useState(0)
    const [tenure, setTenure] = useState(12)

    useEffect(()=>{
        if(!(cost>0)){
            setDownPayment(0)
            setEmi(0)
        }
        const emi = calculateEMI(downPayment)
        setEmi(emi)
    },[tenure,cost])

    const calculateEMI = (downpayment) => {
        if(!cost) return 
        const loanAmt = cost - downpayment
        const rateOfInterest = interest / 100
        const numberOfYears = tenure / 12
        const EMI = (loanAmt*rateOfInterest*(1+rateOfInterest)**numberOfYears)/
            ((1+rateOfInterest)**numberOfYears-1)
        return Number(EMI/12).toFixed(0)
    }

    const calculateDP = (emi)=>{
        if(!cost) return 
        const downPaymentPercent = 100 - (emi/ calculateEMI(0))*100
        return Number((downPaymentPercent/100)*cost).toFixed(0)
    }

    const updateEmi = (e) => {
        if(!cost) return 
        const dp=Number(e.target.value)
        setDownPayment(dp.toFixed(0))
        const emi = calculateEMI(dp)
        setEmi(emi)
    }

    const updateDownPayment = (e) => {
        if(!cost) return 
        const emi=Number(e.target.value)
        setEmi(emi.toFixed(0))
        const dp=calculateDP(emi)
        setDownPayment(dp)
    }

    const totalDownPayment=()=>{
        return NumberWithCommas((Number(downPayment)+(cost-downPayment)*(fee/100)).toFixed(0))
    }

    const totalEmi=()=>{
        return NumberWithCommas((emi*tenure).toFixed(0))
    }

    return (
        <div className='App'>
            <span className='title'>EMI Calculator</span>
            <TextInput 
                state={cost}
                setState={setCost}
                title={"Total Cost of Asset"}
            />
            <TextInput 
                state={interest}
                setState={setInterest}
                title={"Interest Rate in (%)"}
            />
            <TextInput 
                state={fee}
                setState={setFee}
                title={"Processing Fee in (%)"}
            />

            <SliderInput
                title="Down Payment"
                min={0}
                max={cost}
                state={downPayment}
                underlineTitle={`Total Down Payment - ${totalDownPayment()} 
                    with ${fee}% processing fee`}
                onChange={updateEmi}
                labelMin={"0%"}
                labelMax={"100%"}
            />

            <SliderInput
                title="Loan Per Month"
                min={calculateEMI(cost)}
                max={calculateEMI(0)}
                state={emi}
                underlineTitle={`Total Loan Amount - ${totalEmi()}`}
                onChange={updateDownPayment}
            />

            <span className='title'>Tenure</span>
            <div className='tenureContainer'>
                {tenureData.map((t,idx) => {
                    return (
                        <button
                            key={idx}
                            className={`tenure ${t === tenure ? 'selected' : ''}`}
                            onClick={() => setTenure(t)}
                        >
                            {t}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export default EMICalculator
