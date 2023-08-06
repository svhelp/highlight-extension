import { IconButton, List, ListItem, ListItemText, Typography } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';

interface ConfigEditorProps {
    name: string
    list: string[]
}

export const ListEditor = ({name, list}: ConfigEditorProps) => {
    return (
        <>
            <Typography variant="h6">{name}</Typography>
            <List dense>
                {list.map(listItem => (
                    <ListItem
                        secondaryAction={
                        <IconButton edge="end" aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                        }
                    >
                        <ListItemText primary={listItem} />
                    </ListItem>
                ))}
              
            </List>
        </>
    )
}
