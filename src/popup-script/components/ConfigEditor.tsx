import { Config } from "../../domain/Config"
import { ListEditor } from "./ListEditor";

interface ConfigEditorProps {
    config: Config
    addOrEditConfig: (patch: Partial<Config>) => void
}

export const ConfigEditor = ({config, addOrEditConfig}: ConfigEditorProps) => {

    const addElement = (element: string, selector: (config: Config) => string[]) =>
        [ ...selector(config), element ]

    const removeElement = (element: string, selector: (config: Config) => string[]) =>
        selector(config).filter(el => el !== element)

    const editList = (createPatch: (modifiedList: string[]) => Partial<Config>, selector: (config: Config) => string[]) => ({
        onCreate: (element: string) => {
            addOrEditConfig(createPatch(addElement(element, selector)))
        },
        onRemove: (element: string) => {
            addOrEditConfig(createPatch(removeElement(element, selector)))
        }
    })

    const editLocators = () => editList(list => ({ listLocators: list }), c => c.listLocators)
    const editWhiteList = () => editList(list => ({ whiteList: list }), c => c.whiteList)
    const editBlackList = () => editList(list => ({ blackList: list }), c => c.blackList)

    return (
        <div>
            <ListEditor name="Locators" list={config.listLocators} {...editLocators()} />

            <ListEditor name="White list" list={config.whiteList} {...editWhiteList()} />

            <ListEditor name="Black list" list={config.blackList} {...editBlackList()} />
        </div>
    )
}
