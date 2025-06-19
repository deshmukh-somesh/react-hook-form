// React.FC explained:
// React.FC stands for "React Function Component" - it's a TypeScript type that tells TypeScript "this is a React functional component."
// It's basically saying: "This function returns JSX and can accept props."

import React, { useState } from 'react';

const CounterApp1: React.FC = () => {

    const [count, setCount] = useState<number>(0);

    const handleIncrement = (): void => {
        setCount(count + 1)
    }

    const handleDecrement = () => {
        setCount(count - 1);
    }
    console.log("render");

    return (
        <div>
            <h1>My First Counter App</h1>
            <p> {count}</p>

            <button onClick={handleIncrement} className='text-red-500'>Increment</button>
            <div>

                <button onClick={handleDecrement} className='text-green-500' disabled={count >0 ? false : true}>Decrement</button>
            </div>
        </div>
    )
}

export default CounterApp1;