import {FilterValueType, TodoListType} from "../App";
import {v1} from 'uuid'

export type DeleteTodolistActionType = {
    type: 'DELETE-TODOLIST'
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
export type ChangeFilterOfTodolistActionType = {
    type: 'CHANGE-FILTER'
    id: string
    filter: FilterValueType
}

type ActionType = DeleteTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeFilterOfTodolistActionType;

export const todolistsReducer = (state: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case 'DELETE-TODOLIST':
            return state.filter(el => el.id !== action.id)
        case 'ADD-TODOLIST':
            return [
                ...state,
                {id: v1(), title: action.title, filter: 'All'}
            ]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(el => {
                return el.id === action.id ? {...el, title: action.title} : el
            })
        case 'CHANGE-FILTER':
            return state.map(el => {
                return el.id === action.id ? {...el, filter: action.filter} : el
            })
        default:
            throw new Error("I don't understand this action type")
    }
}

export function DeleteTodolistAC (id: string): DeleteTodolistActionType {
    return {type: 'DELETE-TODOLIST', id: id}
}
export function AddTodolistAC (title: string): AddTodolistActionType {
    return {type: 'ADD-TODOLIST', title}
}
export function ChangeTodolistTitleAC (id: string, title: string): ChangeTodolistTitleActionType {
    return {type: 'CHANGE-TODOLIST-TITLE', id, title}
}
export function ChangeFilterOfTodolistAC (id: string, filter: FilterValueType): ChangeFilterOfTodolistActionType {
    return {type: 'CHANGE-FILTER', id, filter}
}