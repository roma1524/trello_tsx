import React, {useState} from 'react';
import './App.css'
import {TodoList} from "./components/TodoList/TodoList";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
}

export type FilterValueType = 'Active' | 'Completed' | 'All'

export function App() {

    const todoListId1 = v1();
    const todoListId2 = v1();

    const [todoLists, setTodoLists] = useState<TodoListType[]>([
        {id: todoListId1, title: 'What to learn', filter: 'Active'},
        {id: todoListId2, title: 'What to buy', filter: 'Completed'}
    ]);


    const [tasksObj, settasksObj] = useState({
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
    })

    function removeTask(id: string, todoListId: string) {
        let tasks = tasksObj[todoListId];
        const remArr = tasks.filter((task) => task.id !== id);
        tasksObj[todoListId] = remArr;
        settasksObj({...tasksObj});
    }

    function changeFilterTask(value: FilterValueType, todoListId: string) {
        let todoList = todoLists.find(task => task.id === todoListId);
        if (todoList) {
            todoList.filter = value;
            setTodoLists([...todoLists])
        }
    }

    function addTask(value: string, todoListId: string) {
        let task = {id: v1(), title: value, isDone: false}
        let tasks = tasksObj[todoListId];
        let newTask = [task, ...tasks];
        tasksObj[todoListId] = newTask
        settasksObj({...tasksObj});
    }

    function changeStatus(id: string, isDone: boolean, todoListId: string) {
        let tasks = tasksObj[todoListId];
        let task = tasks.find(t => t.id === id);
        if (task) {
            task.isDone = isDone;
            settasksObj({...tasksObj})
        }
    }

    function removeTodolist(todoListId: string) {
        let filterForTodolists = todoLists.filter(item => item.id !== todoListId);
        setTodoLists([...filterForTodolists]);
        delete tasksObj[todoListId];
        settasksObj({...tasksObj});
    }

    return (
        <div className="App">
            {todoLists.map(tdL => {

                let taskForTodoList = tasksObj[tdL.id];
                if (tdL.filter === 'Active') {
                    taskForTodoList = taskForTodoList.filter(t => t.isDone === false);
                }
                if (tdL.filter === 'Completed') {
                    taskForTodoList = taskForTodoList.filter(t => t.isDone === true);
                }

                return (
                    <TodoList
                        key={tdL.id}
                        id={tdL.id}
                        tittle={tdL.title}
                        addTask={addTask}
                        tasks={taskForTodoList}
                        removeTask={removeTask}
                        changeFilterTask={changeFilterTask}
                        changeStatus={changeStatus}
                        filter={tdL.filter}
                        removeTodolist={removeTodolist}/>
                )
            })}

        </div>
    );
}




