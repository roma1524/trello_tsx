import {v1} from 'uuid'
import {TodoListType} from '../App';
import {ChangeTitleAC, changeTodolistFilterAC, todolistsReducer} from './todolists-reducer'

test('correct todolist should be deleted', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    // 1. Стартовый model
    const startState: TodoListType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'},
    ]

    // 2. Действие
    const action = {
        type: 'REMOVE-TODOLIST',
        payload: {
            id: todolistId1,
        },
    } as const
    const endState = todolistsReducer(startState, action)

    // 3. Проверка, что действие измененило model соответствующим образом
    // в массиве останется один тудулист
    expect(endState.length).toBe(1)
    // удалится нужный тудулист, не любой
    expect(endState[0].id).toBe(todolistId2)
})


test('correct todolist should be created', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const startState: TodoListType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'},
    ]

    const title = 'New todolist'
    // 2. Действие
    const action = {
        type: 'ADD-TODOLIST',
        payload: {
            title: title,
        },
    } as const

    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(title)
})


test('correct todolist should change its title', () => {
    const title = 'New title'

    let todolistId1 = v1()
    let todolistId2 = v1()

   const startState: TodoListType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'},
    ]

    const endState = todolistsReducer(startState, ChangeTitleAC(todolistId2, title))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(title)
})

test('correct todolist should change its filter', () => {
    const filter = 'Completed'

    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: TodoListType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'},
    ]

    const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistId2, filter))

    expect(endState[0].filter).toBe('All')
    expect(endState[1].filter).toBe(filter)
})