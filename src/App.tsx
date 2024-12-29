import React, {useState} from 'react';
import './App.css'
import {TodoList} from "./components/TodoList/TodoList";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValueType = 'Active' | 'Completed' | 'All'

export function App() {

    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: 'CSS', isDone: false},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
    ])
    const [filter, setFilter] = useState<FilterValueType>('All');
    let taskForTodoList = tasks;

    function removeTask(id: string) {
        const remArr = tasks.filter((task) => task.id !== id);
        setTasks(remArr);
    }

    function changeFilterTask(value: FilterValueType) {
        setFilter(value);
    }

    function addTask(value: string) {
        let newTask = {id: v1(), title: value, isDone: false}
        setTasks([newTask, ...tasks]);
    }

    if (filter === 'Active') {
        taskForTodoList = tasks.filter(t => t.isDone === false);
    }
    if (filter === 'Completed') {
        taskForTodoList = tasks.filter(t => t.isDone === true);
    }

    function changeStatus(id: string, isDone: boolean) {
        let task = tasks.find(t => t.id === id);
        if (task) {
            task.isDone = isDone;
        }
        setTasks([...tasks])
    }

    return (
        <div className="App">
            <TodoList tittle={"List1"}
                      addTask={addTask}
                      tasks={taskForTodoList}
                      removeTask={removeTask}
                      changeFilterTask={changeFilterTask}
                      changeStatus={changeStatus}
                      filter={filter}/>

        </div>
    );
}




