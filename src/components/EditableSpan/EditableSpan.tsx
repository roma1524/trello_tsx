import React, {useState} from "react";


type EditableSpanPropsType = {
    title: string
    onChange: (newValue: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {

    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState('')

    function activateEditMode() {
        setEditMode(!editMode);
        setTitle(props.title);
    }

    function activateVeiwMode() {
        setEditMode(!editMode)
    }

    function onChangeInputHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setTitle(e.currentTarget.value)
        props.onChange(title)
    }

    return editMode ? <input
        value={title}
        onBlur={activateVeiwMode}
        autoFocus
        onChange={onChangeInputHandler}/> : <span onDoubleClick={activateEditMode}>{props.title}</span>
}