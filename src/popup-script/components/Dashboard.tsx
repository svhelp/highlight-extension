import { Container, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { storageKey } from "../../constants/storageKey"
import { Config } from "../../domain/Config"
import { ConfigEditor } from "./ConfigEditor";
import { ConfigCreator } from "./ConfigCreator";

export const Dashboard = () => {
    const [ location, setLocation ] = useState<chrome.tabs.Tab | null>(null)
    const [ configs, setConfigs ] = useState<Config[]>([])

    const init = async () => {
        let queryOptions = { active: true, lastFocusedWindow: true };
        // `tab` will either be a `tabs.Tab` instance or `undefined`.
        let [tab] = await chrome.tabs.query(queryOptions);

        const storageData = await chrome.storage.sync.get(storageKey)
        const configs: Config[] = storageData[storageKey] ?? []

        setLocation(tab)
        setConfigs(configs)
    }

    useEffect(() => {
        init()
    }, [])

    const config = configs.find(c => new RegExp(c.url, "i").test(location?.url ?? ""))

    const addOrEditConfig = (patch: Partial<Config>) => {
        if (!location) {
            return
        }

        const updatedConfig: Config = config
            ? Object.assign(config, patch)
            : {
                url: patch.url ?? "",
                listLocators: patch.listLocators ?? [],
                whiteList: patch.whiteList ?? [],
                blackList: patch.blackList ?? [],
            }

        const updateConfigs = [
            ...configs.filter(c => c !== config),
            updatedConfig
        ]

        setConfigs(updateConfigs)

        chrome.storage.sync.set({
            [storageKey]: updateConfigs
        })
    }

    return (
        <Container maxWidth="xs" sx={{ minWidth: 340 }}>
            {!config &&
                <ConfigCreator location={location} addOrEditConfig={addOrEditConfig} />
            }
            
            {config && 
                <>
                    <Typography variant="h5">{config.url}</Typography>
                    <ConfigEditor config={config} addOrEditConfig={addOrEditConfig} />
                </>
            }
        </Container>
    )
}
