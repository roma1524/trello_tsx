import React, {useState} from "react";
import {TextField} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddBoxIcon from '@mui/icons-material/AddBox';

type AddItemFormPropsType = {
    addItem: (val: string) => void
    title: string
}

export function AddItemForm({addItem, title}: AddItemFormPropsType) {

    const [inputValue, setInputValue] = useState("");
    const [error, setError] = useState<string | null>(null);

    function onChangeInputHandler(event: React.ChangeEvent<HTMLInputElement>) {
        setError(null);
        setInputValue(event.currentTarget.value);
    }

    function addTaskHandler() {
        if (inputValue.trim() === "") {
            setInputValue('')
            setError('Field is required');
            return;
        }
        addItem(inputValue.trim())
        setInputValue('')
    }

    return (
        <div>
            <TextField label={title}
                       variant="outlined"
                       value={inputValue}
                       onChange={onChangeInputHandler}
                       helperText={error ? 'Field is required' : ''}
                       error={error ? true : undefined}
                       className={error ? 'error' : ''}
                       size={'small'}
            />
            <IconButton onClick={addTaskHandler} color={'secondary'} size={'medium'}><AddBoxIcon/></IconButton>
        </div>
    )
}