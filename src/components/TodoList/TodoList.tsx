import React, {ChangeEvent} from "react";
import {FilterValueType, TaskType} from "../../App";
import '../../App.css'
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";

type TodoListPropsType = {
    id: string
    title: string
    tasks: TaskType[]
    removeTask: (arg: string, todoListId: string) => void
    changeFilterTask: (value: FilterValueType, todoListId: string) => void
    addTask: (val: string, todoListId: string) => void
    changeStatus: (id: string, isDone: boolean, todoListId: string) => void
    filter: FilterValueType
    removeTodolist: (todoListId: string) => void
    changeTitle: (id: string, newTitle: string, todoListId: string) => void
    changeTodoTitle: (id: string, newTitle: string) => void
}

export function TodoList({
                             title,
                             tasks,
                             removeTask,
                             changeFilterTask,
                             addTask,
                             changeStatus,
                             filter,
                             id,
                             removeTodolist,
                             changeTodoTitle,
                             changeTitle
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

    function changeTodoListTitle(newTitle: string) {
        changeTodoTitle(id, newTitle)
    }


    return (
        <div>
            <h3><EditableSpan title={title} onChange={changeTodoListTitle}/>
                <button onClick={rTodolist}>X</button>
            </h3>
            <AddItemForm addItem={addTaskH}/>
            <ul>
                {tasks.map(task => {
                    function onChangeStatusHandler(e: ChangeEvent<HTMLInputElement>) {
                        let newIsDoneValue = e.currentTarget.checked
                        changeStatus(task.id, newIsDoneValue, id)
                    }
                    function onChangeTitleHandler(newTitle: string) {

                        changeTitle(task.id, newTitle, id)
                    }

                    return (
                        <li key={task.id}
                            className={task.isDone ? 'is-done' : ''}>
                            <input type="checkbox"
                                   checked={task.isDone}
                                   onChange={onChangeStatusHandler}/>

                            <EditableSpan title={task.title} onChange={onChangeTitleHandler}/>
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

