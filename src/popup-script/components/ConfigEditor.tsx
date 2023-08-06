import { Config } from "../../domain/Config"
import { ListEditor } from "./ListEditor";

interface ConfigEditorProps {
    config: Config
}

export const ConfigEditor = ({config}: ConfigEditorProps) => {
    return (
        <div>
            <ListEditor name="Locators" list={config.listLocators} />

            <ListEditor name="White list" list={config.whiteList} />

            <ListEditor name="Black list" list={config.blackList} />
        </div>
    )
}
