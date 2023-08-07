import { Alert, AlertTitle, Box, Button, Input } from "@mui/material"
import { useEffect, useState } from "react"
import { Config } from "../../domain/Config"
import styled from "styled-components"

interface ConfigCreatorProps {
    location: chrome.tabs.Tab | null
    addOrEditConfig: (patch: Partial<Config>) => void
}

export const ConfigCreator = ({ location, addOrEditConfig }: ConfigCreatorProps) => {
    const [creationMode, setCreationMode ] = useState(false)
    const [hostPattern, setHostPattern ] = useState(location?.url ?? "")

    useEffect(() => {
        if (!location){
            return
        }

        setHostPattern(location.url ?? "")
    }, [ location ])

    const toggleCreationMode = () => setCreationMode(value => !value)

    const onPatternChanged = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setHostPattern(e.target.value)
    }

    const onSaveConfig = () => {
        addOrEditConfig({
            url: hostPattern
        })
    }

    return creationMode
        ? (
            <>
                <Input fullWidth value={hostPattern} onChange={onPatternChanged} />
                <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
                    <Button size="small" color="error" onClick={toggleCreationMode}>
                        Cancel
                    </Button>
                    <Button size="small" onClick={onSaveConfig} disabled={!hostPattern}>
                        Add
                    </Button>
                </Box>
            </>
        )
        : (
            <Alert
                severity="warning"
                action={
                    <Button color="inherit" size="small" onClick={toggleCreationMode}>
                        Create
                    </Button>
                }
            >
                <AlertTitle>Warning</AlertTitle>
                There is no config for the host.
            </Alert>
        )
}

const ButtonsContainer = styled.div`
    display: flex;
`