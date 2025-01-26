import {v1} from 'uuid'
import {todolistsReducer} from './todolists-reducer'
import {FilterValueType, TodoListType} from "../App";

test('correct todolist should be deleted', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    // 1. Стартовый state
    const startState: TodoListType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'},
    ]

    const action = {
        type: 'DELETE-TODOLIST' as const,
        id: todolistId1
    }
    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})


test('correct todolist should be added', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    let newTodoListTitle = 'New Todolist'

    const startState: TodoListType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'},
    ]

    const endState = todolistsReducer(startState, {type: 'ADD-TODOLIST', title: newTodoListTitle})

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodoListTitle)
})

test('correct todolist should change its name', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    let newTodoListTitle = 'New Todolist Title'

    const startState: TodoListType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'},
    ]

    const action = {
        type: 'CHANGE-TODOLIST-TITLE',
        id: todolistId2,
        title: newTodoListTitle
    }

    const endState = todolistsReducer(startState, action)

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodoListTitle)
})

test('correct filter of todolist should be change ', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    let newFilter: FilterValueType = 'Active'

    const startState: TodoListType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'},
    ]

    const action = {
        type: 'CHANGE-FILTER',
        id: todolistId1,
        filter: newFilter
    }

    const endState = todolistsReducer(startState, action)

    expect(endState[0].filter).toBe(newFilter)
    expect(endState[1].filter).toBe('All')
})