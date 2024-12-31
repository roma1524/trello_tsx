import React, {ChangeEvent, useState} from "react";
import {FilterValueType, TaskType} from "../../App";
import '../../App.css'
import {AddItemForm} from "../AddItemForm/AddItemForm";

type TodoListPropsType = {
    id: string
    tittle: string
    tasks: TaskType[]
    removeTask: (arg: string, todoListId: string) => void
    changeFilterTask: (value: FilterValueType, todoListId: string) => void
    addTask: (val: string, todoListId: string) => void
    changeStatus: (id: string, isDone: boolean, todoListId: string) => void
    filter: FilterValueType
    removeTodolist: (todoListId: string) => void
}

export function TodoList({
                             tittle,
                             tasks,
                             removeTask,
                             changeFilterTask,
                             addTask,
                             changeStatus,
                             filter,
                             id,
                             removeTodolist
                         }: TodoListPropsType) {

    function onAllClickHandler() {
        changeFilterTask('All', id)
    }

    function onActiveClickHandler() {
        changeFilterTask('Active', id)
    }

    function onCompletedClickHandler() {
        changeFilterTask('Completed', id)
    }

    function rTodolist() {
        removeTodolist(id);
    }

    function addTaskH(title: string) {
        addTask(title, id)
    }

    return (
        <div>
            <h3>{tittle}
                <button onClick={rTodolist}>X</button>
            </h3>
            <AddItemForm addItem={addTaskH} />
            <ul>
                {tasks.map(task => {
                    return (
                        <li key={task.id}
                            className={task.isDone ? 'is-done' : ''}>
                            <input type="checkbox"
                                   checked={task.isDone}
                                   onChange={(e: ChangeEvent<HTMLInputElement>) => changeStatus(task.id, e.currentTarget.checked, id)}/>
                            <span>{task.title}</span>
                            <button onClick={() => removeTask(task.id, id)}>X</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button className={filter === 'All' ? 'active-filter' : ''} onClick={onAllClickHandler}>All</button>
                <button className={filter === 'Active' ? 'active-filter' : ''} onClick={onActiveClickHandler}>Active
                </button>
                <button className={filter === 'Completed' ? 'active-filter' : ''}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}

