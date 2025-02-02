import {v1} from "uuid";
import {TasksObjPropsType} from "../App";

const todoListId1 = v1();
const todoListId2 = v1();

export const initialState: TasksObjPropsType = {
    [todoListId1]: [
        {id: v1(), title: 'CSS', isDone: false},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Redux', isDone: false}
    ],
    [todoListId2]: [
        {id: v1(), title: 'Milk', isDone: false},
        {id: v1(), title: 'Beer', isDone: false},
        {id: v1(), title: 'Onion', isDone: false}
    ],
}

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK';
    payload: {
        todolistId: string
        taskId: string
    };
}

export type AddTaskActionType = {
    type: 'ADD-TASK';
    payload: {
        todolistId: string
        title: string
    };
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK"S-STATUS';
    payload: {
        todolistId: string
        taskId: string
        isDone: boolean
    };
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK"S-TITLE';
    payload: {
        todolistId: string
        taskId: string
        title: string
    };
}

export const RemoveTaskAC = (todolistId: string, taskId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', payload: {todolistId, taskId}} as const;
}
export const AddTaskAC = (todolistId: string, title: string): AddTaskActionType => {
    return {type: 'ADD-TASK', payload: {todolistId, title}} as const;
}
export const ChangeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK"S-STATUS', payload: {todolistId, taskId, isDone}} as const;
}
export const ChangeTaskTitleAC = (todolistId: string, taskId: string, title: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK"S-TITLE', payload: {todolistId, taskId, title}} as const;
}

export type Actions = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType

export const tasksReducer = (state = initialState, action: Actions): TasksObjPropsType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].filter(task => task.id !== action.payload.taskId)}
        case 'ADD-TASK':
            return {...state, [action.payload.todolistId]: [...state[action.payload.todolistId], {id: v1(), title: action.payload.title, isDone: false}]}
        case 'CHANGE-TASK"S-STATUS':
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.taskId ? {...el, isDone: action.payload.isDone} : el)}
        case 'CHANGE-TASK"S-TITLE':
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.taskId ? {...el, title: action.payload.title} : el)}
        default:
            return state;
    }

}
