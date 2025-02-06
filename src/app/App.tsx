import React from 'react';
import './App.css'
import {TodoList} from "../components/TodoList/TodoList";
import {v1} from "uuid";
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import {AppBar, Box, Button, Container, Grid, Paper, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from "@mui/material/IconButton";
import {
    AddTodoListAC,
    ChangeTitleAC,
    ChangeTodolistFilterAC,
    RemoveTodolistAC,
} from "../model/todolists-reducer";
import {
    AddTaskAC,
    ChangeTaskStatusAC,
    ChangeTaskTitleAC,
    CreateTodolistAC,
    RemoveTaskAC,
} from "../model/tasks-reducer";
import {useAppDispatch} from "../common/hooks/useAppDispatch";
import {useAppSelector} from "../common/hooks/useAppSelector";
import {selectTodolists} from "../model/todolists-selectors";
import {selectTasks} from "../model/tasks-selectors";

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

    const todoLists = useAppSelector(selectTodolists)
    const tasksObj = useAppSelector(selectTasks)

    const dispatch = useAppDispatch();

    function removeTask(id: string, todolistId: string) {
        dispatch(RemoveTaskAC({todolistId, taskId: id}))
    }
    function OnChangeTitle(id: string, newTitle: string, todoListId: string) {
        // dispatch(ChangeTaskTitleAC(todoListId, id, newTitle))
    }

    function addTask(title: string, todolistId: string) {
        dispatch(AddTaskAC({todolistId, title}))
    }
    function changeStatus(id: string, isDone: boolean, todoListId: string) {
        // dispatch(ChangeTaskStatusAC(todoListId, id, isDone))
    }

    function changeFilterTask(filter: FilterValueType, todoListId: string) {
        dispatch(ChangeTodolistFilterAC({id: todoListId, filter}))
    }
    function removeTodolist(todoListId: string) {
        dispatch(RemoveTodolistAC({id: todoListId}))
    }
    function addTodoList(title: string) {
        // dispatch(AddTodoListAC(title, id))
        // dispatch(CreateTodolistAC(id))
    }
    function changeTodoTitle(id: string, newTitle: string) {
        dispatch(ChangeTitleAC({id, title: newTitle}))
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




