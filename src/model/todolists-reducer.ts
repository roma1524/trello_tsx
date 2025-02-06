import {FilterValueType, TodoListType} from '../app/App';
import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";

// const todolistId1 = nanoid()
// const todolistId2 = nanoid()

// const initialState: TodoListType[] = [
//     {id: todolistId1, title: 'What to learn', filter: 'All'},
//     {id: todolistId2, title: 'What to buy', filter: 'All'},
// ]

const initialState: TodoListType[] = []

export const RemoveTodolistAC = createAction<{ id: string }>('todolist/RemoveTodolist')
export const AddTodoListAC = createAction('todolists/createTodolist', (title: string) => {
    return  {payload: { title, id: nanoid() }}
})
export const ChangeTitleAC = createAction<{id: string, title: string}>('todolist/ChangeTitle')
export const ChangeTodolistFilterAC = createAction<{id: string, filter: FilterValueType}>('todolist/ChangeTodolistFilter')

export const todolistsReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(RemoveTodolistAC, (state, action) => {
            const currentEl = state.findIndex((item) => item.id === action.payload.id)
            if (currentEl !== -1) {
                state.splice(currentEl, 1)
            }
        })
        .addCase(AddTodoListAC, (state, action) => {
            state.push({...action.payload, filter: 'All'})
        })
        .addCase(ChangeTitleAC, (state, action) => {
            const elementId = state.find(item => item.id === action.payload.id)
            if (elementId) {
                elementId.title = action.payload.title
            }
        })
        .addCase(ChangeTodolistFilterAC, (state, action) => {
            const currentEl = state.find((item) => item.id === action.payload.id)
            if (currentEl) {
                currentEl.filter = action.payload.filter;
            }
        })
})