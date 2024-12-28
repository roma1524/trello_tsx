import React, {ButtonHTMLAttributes, useState} from "react";
import {FilterValueType, TaskType} from "../../App";

type TodoListPropsType = {
    tittle: string
    tasks: TaskType[]
    removeTask: (arg: string) => void
    changeFilterTask: (value: FilterValueType) => void
    addTask: (val: string) => void
}

export function TodoList({tittle, tasks, removeTask, changeFilterTask, addTask}: TodoListPropsType) {

    const [inputValue, setInputValue] = useState("");

    function onChangeInputHandler(event: React.ChangeEvent<HTMLInputElement>) {
        setInputValue(event.currentTarget.value);
    }

    function addTaskHandler() {
        addTask(inputValue)
        setInputValue('')
    }


    return (
        <div>
            <h3>{tittle}</h3>
            <div>
                <input type="text" value={inputValue} onChange={onChangeInputHandler}/>
                <button onClick={addTaskHandler}>+</button>
            </div>
            <ul>
                {tasks.map(task => {
                    return (
                        <li key={task.id}>
                            <input type="checkbox" checked={task.isDone}/>
                            <span>{task.title}</span>
                            <button onClick={() => removeTask(task.id)}>X</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={() => changeFilterTask('All')}>All</button>
                <button onClick={() => changeFilterTask('Active')}>Active</button>
                <button onClick={() => changeFilterTask('Completed')}>Completed</button>
            </div>
        </div>
    )
}