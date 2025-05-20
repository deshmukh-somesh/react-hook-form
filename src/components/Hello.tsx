

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

/*
import React from 'react';

const Hello = () => {
    return React.createElement("div", null, React.createElement("h1", null, "Hello Somesh Deshmukh!"))
}

export default Hello;

// Output : Hello Somesh Deshmukh!

*/
/*
React.createElement Parameters Explained
React.createElement takes three main parameters:

Type: The first parameter specifies the element type

Can be a string for HTML elements (like 'div', 'span', 'button')
Can be a React component (class or function)
Can be a React Fragment (React.Fragment)


Props: The second parameter is an object containing the properties/attributes

Contains all attributes/props you want to pass to the element
Can include event handlers like onClick, onSubmit
Can be null or empty object ({}) if no props are needed
Includes special props like key, ref, className, style, etc.


Children: The third and subsequent parameters are the children

Can be strings for text content
Can be other React elements (more createElement calls)
Can be arrays of elements
Can be null or undefined (no children)

*/

import React from 'react';
const Hello = () => {
    return React.createElement("div", { id: "hello", className: "dummyClass" }, React.createElement("h1", null, "Hello Vishwas"))
}

export default Hello;


// JSX differences : 

/*
Class -> ClassName
for -> htmlFor
camelCase property naming convention 
onclick -> onClick
tabindex -> tabIndex  
*/