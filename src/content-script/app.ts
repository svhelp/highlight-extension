import { Config } from "../domain/Config"
import { storageKey } from "../constants/storageKey"

const blacklistClass = "highlight-extension-blacklist-item"

const processPage = async () => {
    const storageData = await chrome.storage.sync.get(storageKey)
    const configs: Config[] = storageData[storageKey] ?? []
    const config = configs.find(c => new RegExp(c.url, "i").test(window.location.href))
    
    if (!config) {
        return
    }

    console.log("config found")
    const elementBuckets = config.listLocators.map(locator => document.querySelectorAll(locator) as unknown as HTMLCollectionOf<HTMLElement>)
    
    for (const elements of elementBuckets) {
        for (const element of elements) {
            console.log("processing element")
    
            let content = element.innerHTML
    
            if (config.blackList.some(blItem => new RegExp(blItem, "i").test(content))) {
                console.log("black-listed item found")
    
                element.classList.add(blacklistClass)
                continue;
            }
    
            for (const wlItem of config.whiteList) {
                const wlItemPattern = new RegExp(`(${wlItem})`, "i")

                if (!wlItemPattern.test(content)) {
                    continue;
                }
    
                console.log("white-listed item found")
    
                content = content.replace(wlItemPattern, '<span class="highlight-extension-whitelist-item">$1</span>')
            }
    
            element.innerHTML = content
        }
    }
}

const reset = () => {
    const blacklistedItems = document.querySelectorAll(`.${blacklistClass}`)

    for (const item of blacklistedItems) {
        item.classList.remove(blacklistClass)
    }

    const content = document.body.innerHTML
    document.body.innerHTML = content.replace(/\<span class=\"highlight-extension-whitelist-item\"\>(.+?)\<\/span\>/g, '$1')
}

chrome.storage.onChanged.addListener(
    () => {
        console.log("storage changed")
        reset()
        processPage()
    }
)

processPage()
