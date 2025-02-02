import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC, tasksReducer} from "./tasks-reducer";
import {TasksObjPropsType} from "../App";
import {v1} from "uuid";


test('correct task should be deleted', () => {
    const todoListId1 = v1();
    const todoListId2 = v1();

    const taskId2 = v1()

    const startState: TasksObjPropsType = {
        [todoListId1]: [
            {id: v1(), title: 'CSS', isDone: false},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false}
        ],
        [todoListId2]: [
            {id: v1(), title: 'Milk', isDone: false},
            {id: v1(), title: 'Beer', isDone: false},
            {id: taskId2, title: 'Onion', isDone: false}
        ],
    }

    const endState = tasksReducer(startState, RemoveTaskAC(todoListId2, taskId2))

    expect(endState[todoListId2].length).toBe(2)
})


test('correct task should be created', () => {
    const todoListId1 = v1();
    const todoListId2 = v1();

    const startState: TasksObjPropsType = {
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

    const nemTitle = 'Q7'

    const endState = tasksReducer(startState, AddTaskAC(todoListId1, nemTitle))

    expect(endState[todoListId1].length).toBe(5)
    expect(endState[todoListId1][4].title).toBe('Q7')
    expect(endState[todoListId2].length).toBe(3)
})


test('correct task status should be changed', () => {
    const todoListId1 = v1();
    const todoListId2 = v1();
    const taskId2 = v1()

    const startState: TasksObjPropsType = {
        [todoListId1]: [
            {id: v1(), title: 'CSS', isDone: false},
            {id: v1(), title: 'JS', isDone: true},
            {id: taskId2, title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false}
        ],
        [todoListId2]: [
            {id: v1(), title: 'Milk', isDone: false},
            {id: v1(), title: 'Beer', isDone: false},
            {id: v1(), title: 'Onion', isDone: false}
        ],
    }


    const endState = tasksReducer(startState, ChangeTaskStatusAC(todoListId1, taskId2, true))

    expect(endState[todoListId1].length).toBe(4)
    expect(endState[todoListId1][2].isDone).toBe(true)
    expect(endState[todoListId2].length).toBe(3)
})

test('correct task should change its title', () => {
    const todoListId1 = v1();
    const todoListId2 = v1();
    const taskId2 = v1()
    const newTitle = 'TypeScript'

    const startState: TasksObjPropsType = {
        [todoListId1]: [
            {id: v1(), title: 'CSS', isDone: false},
            {id: v1(), title: 'JS', isDone: true},
            {id: taskId2, title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false}
        ],
        [todoListId2]: [
            {id: v1(), title: 'Milk', isDone: false},
            {id: v1(), title: 'Beer', isDone: false},
            {id: v1(), title: 'Onion', isDone: false}
        ],
    }


    const endState = tasksReducer(startState, ChangeTaskTitleAC(todoListId1, taskId2, newTitle))

    expect(endState[todoListId1].length).toBe(4)
    expect(endState[todoListId1][2].title).toBe(newTitle)
    expect(endState[todoListId2].length).toBe(3)
})
