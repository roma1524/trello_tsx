import React from "react";
import {TaskType} from "../../App";

type TodoListPropsType = {
    tittle: string
    tasks: TaskType[]
}

export function TodoList ( {tittle, tasks}:  TodoListPropsType)  {
    return (
        <div>
            <h3>{tittle}</h3>
            <div>
                <input type="text"/>
                <button>+</button>
            </div>
            <ul>
                {tasks.map((task: TaskType, index: number) => {
                    return (
                        <li key={task.id}><input type="checkbox" checked={task.isDone}/><span>{task.title}</span></li>
                    )
                })}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}