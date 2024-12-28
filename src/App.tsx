import React, {useState} from 'react';
import './App.css'
import {TodoList} from "./components/TodoList/TodoList";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type FilterValueType = 'Active' | 'Completed' | 'All'

export function App() {

    const [tasks, setTasks] = useState<TaskType[]>([
        {id: 1, title: 'CSS', isDone: false},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: false},
    ])
    const [filter, setFilter] = useState<FilterValueType>('All');
    let taskForTodoList = tasks;

    function removeTask(id: number) {
        const remArr = tasks.filter((task) => task.id !== id);
        setTasks(remArr);
    }

    function changeFilterTask(value: FilterValueType) {
        setFilter(value);
    }

    if (filter == 'Active') {
        taskForTodoList = tasks.filter(t => t.isDone === false);
    }
    if (filter == 'Completed') {
        taskForTodoList = tasks.filter(t => t.isDone === true);
    }


    return (
        <div className="App">
            <TodoList tittle={"List1"} tasks={taskForTodoList} removeTask={removeTask} changeFilterTask={changeFilterTask}/>
            {/*<TodoList tittle={"List2"} tasks={tasks} removeTask={removeTask} changeFilterTask={changeFilterTask}/>*/}
        </div>
    );
}




