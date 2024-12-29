import React, {ChangeEvent, useState} from "react";
import {FilterValueType, TaskType} from "../../App";
import '../../App.css'

type TodoListPropsType = {
    tittle: string
    tasks: TaskType[]
    removeTask: (arg: string) => void
    changeFilterTask: (value: FilterValueType) => void
    addTask: (val: string) => void
    changeStatus: (id: string, isDone: boolean) => void
    filter: FilterValueType
}

export function TodoList({tittle, tasks, removeTask, changeFilterTask, addTask, changeStatus, filter}: TodoListPropsType) {

    const [inputValue, setInputValue] = useState("");
    let [error, setError] = useState<string | null>(null);

    function onChangeInputHandler(event: React.ChangeEvent<HTMLInputElement>) {
        setError(null);
        setInputValue(event.currentTarget.value);
    }

    function addTaskHandler() {
        if (inputValue.trim() === "") {
            setInputValue('')
            setError('Field is required');
            return;
        }
        addTask(inputValue.trim())
        setInputValue('')
    }

    function onAllClickHandler() {
        changeFilterTask('All')
    }
    function onActiveClickHandler() {
        changeFilterTask('Active')
    }
    function onCompletedClickHandler() {
        changeFilterTask('Completed')
    }


    return (
        <div>
            <h3>{tittle}</h3>
            <div>
                <input type="text"
                       value={inputValue}
                       onChange={onChangeInputHandler}
                       className={error ? 'error' : ''}/>
                <button onClick={addTaskHandler}>+</button>
                {error && <div className="error-message">{error}</div>}
            </div>
            <ul>
                {tasks.map(task => {
                    return (
                        <li key={task.id}
                            className={task.isDone ? 'is-done' : ''}>
                            <input type="checkbox"
                                   checked={task.isDone}
                                   onChange={(e: ChangeEvent<HTMLInputElement>) => changeStatus(task.id, e.currentTarget.checked)}/>
                            <span>{task.title}</span>
                            <button onClick={() => removeTask(task.id)}>X</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button className={filter === 'All' ? 'active-filter' : ''} onClick={onAllClickHandler}>All</button>
                <button className={filter === 'Active' ? 'active-filter' : ''} onClick={onActiveClickHandler}>Active</button>
                <button className={filter === 'Completed' ? 'active-filter' : ''} onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}