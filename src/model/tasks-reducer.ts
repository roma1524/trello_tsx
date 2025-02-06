import {TasksObjPropsType} from "../app/App";
import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";
import {AddTodoListAC, RemoveTodolistAC} from "./todolists-reducer";

export const initialState: TasksObjPropsType = {}

export const RemoveTaskAC = createAction<{todolistId: string, taskId: string}>('tasks/RemoveTask')
export const AddTaskAC = createAction<{todolistId: string, title: string}>('tasks/AddTask')
export const ChangeTaskStatusAC = createAction<{todolistId: string, taskId: string, isDone: boolean}>('tasks/ChangeTaskStatus')
export const ChangeTaskTitleAC = createAction<{todolistId: string, taskId: string, title: string}>('tasks/ChangeTaskTitle')

export const tasksReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(RemoveTodolistAC, (state, action) => {
            delete state[action.payload.id]
        })
        .addCase(RemoveTaskAC, (state, action) => {
            const elId = state[action.payload.todolistId].findIndex(task => task.id === action.payload.taskId);
            if (elId !== -1) {
                state[action.payload.todolistId].splice(elId, 1)
            }
        })
        .addCase(AddTaskAC, (state, action) => {
            state[action.payload.todolistId].push( {id: nanoid(), title: action.payload.title, isDone: false})
        })
        .addCase(AddTodoListAC, (state, action) => {
            state[action.payload.id] = []
        })
        .addCase(ChangeTaskStatusAC, (state, action) => {
           const elItem = state[action.payload.todolistId].find(el => el.id === action.payload.taskId)
            if (elItem) {
                elItem.isDone = action.payload.isDone
            }
        })
        .addCase(ChangeTaskTitleAC, (state, action) => {
            const elItem = state[action.payload.todolistId].find(el => el.id === action.payload.taskId)
            if (elItem) {
                elItem.title = action.payload.title
            }
        })
})