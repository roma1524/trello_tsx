import {FilterValueType, TodoListType} from '../App';
import {v1} from 'uuid';

const todoListId1 = v1();
const todoListId2 = v1();

const initialState :TodoListType[] = [
    {id: todoListId1, title: 'What to learn', filter: 'All'},
    {id: todoListId2, title: 'What to buy', filter: 'All'}
];

export type RemoveTodolist = {
    type: 'REMOVE-TODOLIST'
    payload: {
        id: string
    }
}

export type AddTodoList = {
    type: 'ADD-TODOLIST'
    payload: {
        title: string
    }
}

export type ChangeTitle = {
    type: 'CHANGE_TITLE'
    payload: {
        id: string
        title: string
    }
}

export type ChangeFilter = {
    type: 'CHANGE_FILTER'
    payload: {
        id: string
        filter: FilterValueType
    }
}

export const ChangeTitleAC = (id: string, title: string): ChangeTitle => {
    return {
        type: 'CHANGE_TITLE', payload: {id, title} as const
    }
}

export const changeTodolistFilterAC = (id: string, filter: FilterValueType): ChangeFilter => {
    return {type: 'CHANGE_FILTER', payload: {id, filter}} as const
}

    export const todolistsReducer = (state = initialState, action: ActionsType): TodoListType[] => {
        switch (action.type) {
            case 'REMOVE-TODOLIST':
                return state.filter(el => el.id !== action.payload.id);
            case 'ADD-TODOLIST':
                return [...state, {id: v1(), title: action.payload.title, filter: 'All'}]
            case 'CHANGE_TITLE':
                return state.map(el => el.id === action.payload.id ? {...el, title: action.payload.title} : el)
            case 'CHANGE_FILTER':
                return state.map(el => el.id === action.payload.id ? {...el, filter: action.payload.filter} : el)
            default:
                return state;
        }
    }

type ActionsType = RemoveTodolist | AddTodoList | ChangeTitle | ChangeFilter