import React from "react";
import {FilterValueType, TaskType} from "../../App";

type TodoListPropsType = {
    tittle: string
    tasks: TaskType[]
    removeTask: (arg: number) => void
    changeFilterTask: (value: FilterValueType) => void
}

export function TodoList ( {tittle, tasks, removeTask, changeFilterTask}:  TodoListPropsType)  {

    return (
        <div>
            <h3>{tittle}</h3>
            <div>
                <input type="text"/>
                <button>+</button>
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