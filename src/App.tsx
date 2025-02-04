import React, {useReducer, useState} from 'react';
import './App.css'
import {TodoList} from "./components/TodoList/TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {AppBar, Box, Button, Container, Grid, Paper, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from "@mui/material/IconButton";
import {
    AddTodoListAC,
    ChangeTitleAC,
    ChangeTodolistFilterAC,
    RemoveTodolistAC,
    todolistsReducer
} from "./model/todolists-reducer";
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC, tasksReducer} from "./model/tasks-reducer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
}

export type FilterValueType = 'Active' | 'Completed' | 'All'

export type TasksObjPropsType = {
    [key: string]: TaskType[]
}

export function App() {

    const todoListId1 = v1();
    const todoListId2 = v1();

    const [todoLists, dispatchTodoLists] = useReducer(todolistsReducer, [
        {id: todoListId1, title: 'What to learn', filter: 'All'},
        {id: todoListId2, title: 'What to buy', filter: 'All'}
    ]);


    const [tasksObj, dispatchTasksObj] = useReducer(tasksReducer ,{
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
        dispatchTasksObj(RemoveTaskAC(todoListId, id))
    }

    function changeFilterTask(filter: FilterValueType, todoListId: string) {
        dispatchTodoLists(ChangeTodolistFilterAC(todoListId, filter))
    }

    function addTask(title: string, todoListId: string) {
        dispatchTasksObj(AddTaskAC(todoListId, title))
    }

    function changeStatus(id: string, isDone: boolean, todoListId: string) {
        dispatchTasksObj(ChangeTaskStatusAC(todoListId, id, isDone))
    }

    function removeTodolist(todoListId: string) {
        dispatchTodoLists(RemoveTodolistAC(todoListId))
    }

    function addTodoList(title: string) {
        const tdId = v1()
        dispatchTasksObj(AddTaskAC(tdId, title = '112223333'))
        dispatchTodoLists(AddTodoListAC(tdId, title))
    }

    function OnChangeTitle(id: string, newTitle: string, todoListId: string) {
        dispatchTasksObj(ChangeTaskTitleAC(todoListId, id, newTitle))
    }

    function changeTodoTitle(id: string, newTitle: string) {
        dispatchTodoLists(ChangeTitleAC(id, newTitle))
    }

    return (
        <div className="App">

            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            News
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </Box>

            <Container sx={{flexGrow: 1}}>
                <Grid container>
                    <Grid container style={{padding: '20px'}}>
                        <AddItemForm addItem={addTodoList} title={'List name'}/>
                    </Grid>

                    <Grid container spacing={10}>

                        {todoLists.map(tdL => {

                            let taskForTodoList = tasksObj[tdL.id];
                            if (tdL.filter === 'Active') {
                                taskForTodoList = taskForTodoList.filter(t => t.isDone === false);
                            }
                            if (tdL.filter === 'Completed') {
                                taskForTodoList = taskForTodoList.filter(t => t.isDone === true);
                            }
                            console.log(taskForTodoList)
                            return <Grid item>
                                <Paper style={{padding: '20px', minHeight: '250px'}}>
                                    <TodoList
                                        key={tdL.id}
                                        id={tdL.id}
                                        title={tdL.title}
                                        addTask={addTask}
                                        tasks={taskForTodoList}
                                        removeTask={removeTask}
                                        changeFilterTask={changeFilterTask}
                                        changeStatus={changeStatus}
                                        filter={tdL.filter}
                                        removeTodolist={removeTodolist}
                                        changeTitle={OnChangeTitle}
                                        changeTodoTitle={changeTodoTitle}/>
                                </Paper>
                            </Grid>
                        })}
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}




