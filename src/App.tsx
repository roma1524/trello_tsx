import React from 'react';
import './App.css'
import {TodoList} from "./components/TodoList/TodoList";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export function App() {

    const tasks1 : Array<TaskType> = [
        {id: 1, title: 'CSS', isDone: false},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: false},
    ]

    const tasks2 : Array<TaskType> = [
        {id: 1, title: 'fort', isDone: false},
        {id: 2, title: 'XXX', isDone: true},
        {id: 3, title: 'Blade runner', isDone: false},
    ]

    return (
        <div className="App">
            <TodoList tittle={"List1"} tasks={tasks1}/>
            <TodoList tittle={"List2"} tasks={tasks2}/>
        </div>
    );
}




