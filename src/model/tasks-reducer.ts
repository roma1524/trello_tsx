import {TasksObjPropsType} from "../app/App";
import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";

const todoListId1 = nanoid();
const todoListId2 = nanoid();

export const initialState: TasksObjPropsType = {
    [todoListId1]: [
        {id: nanoid(), title: 'CSS', isDone: false},
        {id: nanoid(), title: 'JS', isDone: true},
        {id: nanoid(), title: 'React', isDone: false},
        {id: nanoid(), title: 'Redux', isDone: false}
    ],
    [todoListId2]: [
        {id: nanoid(), title: 'Milk', isDone: false},
        {id: nanoid(), title: 'Beer', isDone: false},
        {id: nanoid(), title: 'Onion', isDone: false}
    ],
}

// export type RemoveTaskActionType = {
//     type: 'REMOVE-TASK';
//     payload: {
//         todolistId: string
//         taskId: string
//     };
// }
// export type AddTaskActionType = {
//     type: 'ADD-TASK';
//     payload: {
//         todolistId: string
//         title: string
//     };
// }
// export type CreateTodolistActionType = {
//     type: 'CREATE-TODOLIST';
//     payload: {
//         todolistId: string
//     };
// }
// export type ChangeTaskStatusActionType = {
//     type: 'CHANGE-TASK"S-STATUS';
//     payload: {
//         todolistId: string
//         taskId: string
//         isDone: boolean
//     };
// }
// export type ChangeTaskTitleActionType = {
//     type: 'CHANGE-TASK"S-TITLE';
//     payload: {
//         todolistId: string
//         taskId: string
//         title: string
//     };
// }



export const RemoveTaskAC = createAction<{todolistId: string, taskId: string}>('tasks/RemoveTask')
export const AddTaskAC = createAction<{todolistId: string, title: string}>('tasks/AddTask')
export const CreateTodolistAC = createAction<{todolistId: string}>('tasks/CreateTodolist')
export const ChangeTaskStatusAC = createAction<{todolistId: string, taskId: string, isDone: boolean}>('tasks/ChangeTaskStatus')
export const ChangeTaskTitleAC = createAction<{todolistId: string, taskId: string, title: string}>('tasks/ChangeTaskTitle')



export const tasksReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(RemoveTaskAC, (state, action) => {
            const elId = state[action.payload.todolistId].findIndex(task => task.id === action.payload.taskId);
            if (elId !== -1) {
                state[action.payload.todolistId].splice(elId, 1)
            }
        })
        .addCase(AddTaskAC, (state, action) => {
            state[action.payload.todolistId].push( {id: nanoid(), title: action.payload.title, isDone: false})
        })
        .addCase(CreateTodolistAC, (state, action) => {
            state[action.payload.todolistId] = [];
        })
})


// export const tasksReducer1 = (state: TasksObjPropsType = initialState, action: Actions): TasksObjPropsType => {
//     switch (action.type) {
//         case 'REMOVE-TASK':
//             return {...state, [action.payload.todolistId]: state[action.payload.todolistId].filter(task => task.id !== action.payload.taskId)}
//         case 'ADD-TASK':
//             return {...state, [action.payload.todolistId]: [...state[action.payload.todolistId], {id: nanoid(), title: action.payload.title, isDone: false}]}
//         case 'CREATE-TODOLIST':
//             return {...state, [action.payload.todolistId]: [...[]]}
//         case 'CHANGE-TASK"S-STATUS':
//             return {...state, [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.taskId ? {...el, isDone: action.payload.isDone} : el)}
//         case 'CHANGE-TASK"S-TITLE':
//             return {...state, [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.taskId ? {...el, title: action.payload.title} : el)}
//         default:
//             return state;
//     }
// }


// export const RemoveTaskAC = (todolistId: string, taskId: string): RemoveTaskActionType => {
//     return {type: 'REMOVE-TASK', payload: {todolistId, taskId}} as const;
// }
// export const AddTaskAC = (todolistId: string, title: string): AddTaskActionType => {
//     return {type: 'ADD-TASK', payload: {todolistId, title}} as const;
// }
// export const CreateTodolistAC = (todolistId: string): CreateTodolistActionType => {
//     return {type: 'CREATE-TODOLIST', payload: {todolistId}} as const;
// }
// export const ChangeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean): ChangeTaskStatusActionType => {
//     return {type: 'CHANGE-TASK"S-STATUS', payload: {todolistId, taskId, isDone}} as const;
// }
// export const ChangeTaskTitleAC = (todolistId: string, taskId: string, title: string): ChangeTaskTitleActionType => {
//     return {type: 'CHANGE-TASK"S-TITLE', payload: {todolistId, taskId, title}} as const;
// }

// export type Actions = RemoveTaskActionType | AddTaskActionType | CreateTodolistActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType