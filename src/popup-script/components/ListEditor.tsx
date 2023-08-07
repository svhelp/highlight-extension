import { IconButton, Input, List, ListItem, ListItemText, Typography } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";

interface ConfigEditorProps {
    name: string
    list: string[]
    onCreate: (element: string) => void
    onRemove: (element: string) => void
}

export const ListEditor = ({name, list, onCreate, onRemove}: ConfigEditorProps) => {
    const [ newItem, setNewItem ] = useState("")

    const onNewItemChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewItem(e.target.value)
    }
    
    const onNewItemSave = () => {
        onCreate(newItem)
        setNewItem("")
    }

    return (
        <>
            <Typography variant="h6">{name}</Typography>
            <List dense>
                {list.map(listItem => (
                    <ListItem
                        secondaryAction={
                            <IconButton edge="end" aria-label="delete" onClick={() => onRemove(listItem)}>
                                <DeleteIcon />
                            </IconButton>
                        }
                    >
                        <ListItemText primary={listItem} />
                    </ListItem>
                ))}
              
                <ListItem
                    secondaryAction={
                        <IconButton edge="end" aria-label="delete" disabled={!newItem} onClick={onNewItemSave}>
                            <AddIcon />
                        </IconButton>
                    }
                >
                    <Input value={newItem} onChange={onNewItemChange} />
                </ListItem>
            </List>
        </>
    )
}
