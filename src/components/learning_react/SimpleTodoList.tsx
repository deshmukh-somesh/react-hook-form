import React, { useState } from "react";
const SimpleTodoList: React.FC = () => {

    interface newTodos {
        id: number,
        text: string,
        completed: boolean
    }

    const [todos, setTodos] = useState([
        { id: 1, text: "Buy Milk", completed: false },
        { id: 2, text: "Buy Butter", completed: false }
    ])

    const [inputText, setInputText] = useState<string>("")

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e.target.value);
        setInputText(e.target.value)
        // console.log(inputText);s
    }


    const handleCheckBox = (todoId: number) => {

        console.log(todoId)

        const updatedTodos = todos.map((todo) => {
            if (todo.id === todoId) {
                return { ...todo, completed: !todo.completed }
            }
            else {
                return todo;
            }
        })

        setTodos(updatedTodos);
    }



    const handleAddTask = () => {

        if (inputText.trim() === "") return;


        const newTodo: newTodos = {
            id: Date.now(),
            text: inputText,
            completed: false
        }

        setTodos([...todos, newTodo]);


        setInputText("");
    }

    const deleteTask = (todoId: number) => {

        const todosWithoutDelete = todos.filter((todo => todo.id !== todoId))
        setTodos(todosWithoutDelete);
    }



    return (
        <div>
            <h1>My Todo List</h1>
            <div className="flex gap-3 m-10">

                <input type="text" value={inputText} onChange={handleInputChange} ></input>
                <button className="bg-green-500 w-10 rounded-md" onClick={handleAddTask} >Add</button>
            </div>
            {/* <div>Walk my dog</div>
            <div>buy milk</div> */}
            <div>Tasks</div>
            {todos.map((todo) => (
                <div key={todo.id} className="flex justify-center items-center gap-10 mb-4">
                    <input type="checkbox" checked={todo.completed} onChange={() => handleCheckBox(todo.id)} />
                    <span>{todo.text}</span>
                    <button className="w-20 bg-red-500 rounded-md" onClick={() => deleteTask(todo.id)} >
                        delete
                    </button>

                    {/* {todo.text}: {todo.completed ? "done" : "Not done"} */}
                </div>
            ))}
        </div>
    )
}

export default SimpleTodoList;