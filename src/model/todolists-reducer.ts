import {TodoListType} from '../App';
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

export const todolistsReducer = (state = initialState, action: any) :TodoListType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(el => el.id !== action.payload.id);
        case 'ADD-TODOLIST':
            return [{id: v1(), title: action.payload.title, filter: 'All'}, ...state]
        default:
            return state;
    }
}


type ActionsType = RemoveTodolist | AddTodoList