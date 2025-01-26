import React, {ChangeEvent} from "react";
import {FilterValueType, TaskType} from "../../App";
import '../../App.css'
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import IconButton from '@mui/material/IconButton';
import BackspaceIcon from '@mui/icons-material/Backspace';
import DeleteIcon from '@mui/icons-material/Delete';
import {Button} from "@mui/material";
import s from "./TodoList.module.css";

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
            <h3 className={s.title}>
                <EditableSpan title={title} onChange={changeTodoListTitle}/>
                <IconButton onClick={rTodolist} aria-label="delete" size="small">
                    <DeleteIcon fontSize="inherit" />
                </IconButton>
            </h3>
            <AddItemForm addItem={addTaskH} title={'Item name'}/>
            <ul className={s.lists}>
                {tasks.map(task => {
                    function onChangeStatusHandler(e: ChangeEvent<HTMLInputElement>) {
                        let newIsDoneValue = e.currentTarget.checked
                        changeStatus(task.id, newIsDoneValue, id)
                    }
                    function onChangeTitleHandler(newTitle: string) {

                        changeTitle(task.id, newTitle, id)
                    }

                    const listItemStyle = s.listItem + ' ' + (task.isDone ? s.isDone : '')

                    return (
                        <li key={task.id}
                            className={listItemStyle}>
                            <input type="checkbox"
                                   checked={task.isDone}
                                   onChange={onChangeStatusHandler}/>

                            <EditableSpan title={task.title} onChange={onChangeTitleHandler}/>
                            <IconButton onClick={() => removeTask(task.id, id)}><BackspaceIcon color={'error'}/></IconButton>
                        </li>
                    )
                })}
            </ul>
            <div>
                <Button variant={filter === 'All' ? 'contained' : 'text'} onClick={onAllClickHandler}>All</Button>
                <Button color={'primary'} variant={filter === 'Active' ? 'contained' : 'text'} onClick={onActiveClickHandler}>Active
                </Button>
                <Button color={'secondary'} variant={filter === 'Completed' ? 'contained' : 'text'}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    )
}

