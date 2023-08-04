import { Config } from "./domain/Config"

const whiteList: RegExp[] = [
]

const blackList: RegExp[] = [
]

const configs: Config[] = [
    {
        url: /.*/,
        listLocators: [ ],
        whiteList,
        blackList
    }
]

const config = configs.find(c => c.url.test(window.location.href))

if (!!config) {
    console.log("config found")
    const elementBuckets = config.listLocators.map(locator => document.querySelectorAll(locator) as unknown as HTMLCollectionOf<HTMLElement>)
    
    for (const elements of elementBuckets) {
        for (const element of elements) {
            console.log("processing element")
    
            let content = element.innerHTML
    
            if (config.blackList.some(blItem => blItem.test(content))) {
                console.log("black-listed item found")
    
                element.style.opacity = "0.3"
                continue;
            }
    
            for (const wlItem of config.whiteList) {
                if (!wlItem.test(content)) {
                    continue;
                }
    
                console.log("white-listed item found")
    
                content = content.replace(wlItem, '<b style="color: red;">$1</b>')
            }
    
            element.innerHTML = content
        }
    }
}
