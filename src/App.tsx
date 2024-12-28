import React, {useState} from 'react';
import './App.css'
import {TodoList} from "./components/TodoList/TodoList";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export function App() {

    const [tasks, setTasks] = useState([
        {id: 1, title: 'CSS', isDone: false},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: false},
    ])

    function removeTask(id: number) {
        const remArr = tasks.filter((task) => task.id !== id);
        setTasks(remArr);
    }


    return (
        <div className="App">
            <TodoList tittle={"List1"} tasks={tasks} removeTask={removeTask}/>
            <TodoList tittle={"List2"} tasks={tasks} removeTask={removeTask}/>
        </div>
    );
}




