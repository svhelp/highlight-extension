import { Alert, AlertTitle, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { storageKey } from "../../constants/storageKey"
import { Config } from "../../domain/Config"
import { ConfigEditor } from "./ConfigEditor";

export const Dashboard = () => {
    const [ location, setLocation ] = useState<chrome.tabs.Tab | null>(null)
    const [ configs, setConfigs ] = useState<Config[]>([])

    const getCurrentTab = async () => {
        let queryOptions = { active: true, lastFocusedWindow: true };
        // `tab` will either be a `tabs.Tab` instance or `undefined`.
        let [tab] = await chrome.tabs.query(queryOptions);

        setLocation(tab)
    }

    const loadData = async () => {
        const storageData = await chrome.storage.sync.get(storageKey)
        const configs: Config[] = storageData[storageKey] ?? []

        setConfigs(configs)
    }

    useEffect(() => {
        getCurrentTab()
    }, [])

    useEffect(() => {
        loadData()
    }, [ location ])

    const config = configs.find(c => new RegExp(c.url, "i").test(location?.url ?? ""))

    const addOrEditConfig = (patch: Partial<Config>) => {
        if (!location) {
            return
        }

        const updatedConfig: Config = config
            ? Object.assign(config, patch)
            : {
                url: location.url ?? "",
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
        <div>
            <Typography variant="h5">{location?.url ?? "Loading..."}</Typography>

            {!config &&
                <Alert severity="warning">
                    <AlertTitle>Warning</AlertTitle>
                    There is no config for the host.
                </Alert>
            }
            
            {config && <ConfigEditor config={config} addOrEditConfig={addOrEditConfig} />}
        </div>
    )
}
