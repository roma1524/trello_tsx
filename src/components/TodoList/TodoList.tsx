import React from "react";
import {TaskType} from "../../App";

type TodoListPropsType = {
    tittle: string
    tasks: TaskType[]
    removeTask: (arg: number) => void;
}

export function TodoList ( {tittle, tasks, removeTask}:  TodoListPropsType)  {
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
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}