import { Config } from "./domain/Config"

const storageKey = 'highlight-extension-user-data'

const processPage = async () => {
    // chrome.storage.sync.set({[storageKey]: configs})

    const storageData = await chrome.storage.sync.get(storageKey)
    const configs: Config[] = storageData[storageKey] ?? []

    console.log(configs)

    const config = configs.find(c => new RegExp(c.url, "i").test(window.location.href))
    
    if (!!config) {
        console.log("config found")
        const elementBuckets = config.listLocators.map(locator => document.querySelectorAll(locator) as unknown as HTMLCollectionOf<HTMLElement>)
        
        for (const elements of elementBuckets) {
            for (const element of elements) {
                console.log("processing element")
        
                let content = element.innerHTML
        
                if (config.blackList.some(blItem => new RegExp(blItem, "i").test(content))) {
                    console.log("black-listed item found")
        
                    element.style.opacity = "0.3"
                    continue;
                }
        
                for (const wlItem of config.whiteList) {
                    const wlItemPattern = new RegExp(wlItem, "i")

                    if (!wlItemPattern.test(content)) {
                        continue;
                    }
        
                    console.log("white-listed item found")
        
                    content = content.replace(wlItemPattern, '<b style="color: red;">$1</b>')
                }
        
                element.innerHTML = content
            }
        }
    }
}

processPage()
