

// 1.Using JSX : 

/*
const Hello = ()=> {
    return (
        <div>
            <h1> Hello Somesh </h1>
        </div>
    )
}

export default Hello;

*/


// 2.Without using JSX : 

import React from 'react';

const Hello = () => {
    return React.createElement("div", null, React.createElement("h1", null, "Hello Somesh Deshmukh!"))
}

export default Hello;

// Output : Hello Somesh Deshmukh!

