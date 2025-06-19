import React, { useState } from "react";


const CounterApp2: React.FC = () => {

    interface StepOption {
        value: number;
        label: string;
    }

    const STEP_OPTIONS: StepOption[] = [
        { value: 1, label: '1' },
        { value: 5, label: '5' },
        { value: 10, label: '10' }

    ]

    const [count, setCount] = useState<number>(0);
    const [step, setStep] = useState<number>(1)


    const handleIncrement = (): void => {
        setCount(prev => prev + step)
    }

    const handleDecrement = (): void => {
        setCount(prev => prev - step)
    }

    const reset = (): void => {
        setCount(0);
    }

    const handleStepChange = (e:React.ChangeEvent<HTMLSelectElement>)=>{
        // console.log("triggered")
        // console.log("value of e", e);
        // console.log("value of e.target", e.target); // the elemet that triggered the event (your select)
        // console.log("value of e.target.value: ", e.target.value) ; // the selected option's value.
        // console.log("type of ", typeof(Number(e.target.value)))
        setStep(Number(e.target.value));
    }

    return (
        <div>
            <div className="flex flex-col gap-10 font-medium ">
                <h1>Counter</h1>
                <h1>{count}</h1>
                <div className="flex flex-col items-center justify-center">

                    <label>
                        Step:
                    </label>
                    <select className="w-10" value={step} onChange={handleStepChange} >
                        {STEP_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex items-center justify-center gap-10">
                    <button onClick={handleDecrement} className="border-1 bg-red-500 w-12 rounded-md p-3 text-center">-{step}</button>
                    <button onClick={reset} className="border-1 bg-gray-500 w-30 rounded-md p-3">Reset</button>
                    <button onClick={handleIncrement} className="border-1 bg-green-500 w-12 rounded-md p-3 text-center">+{step}</button>

                </div>
            </div>
        </div>
    )
}

export default CounterApp2;