const whiteList = [
]

const blackList = [
]

const elements = document.querySelectorAll('tr.tCenter')

for (const element of elements) {
    const content = element.innerHTML

    if (blackList.some(blItem => content.includes(blItem))) {
        element.style.opacity = 0.3
        continue;
    }

    for (const wlItem of whiteList) {
        if (!content.includes(wlItem)) {
            continue;
        }

        element.innerHTML = content.replace(wlItem, `<b style="color: red;">${wlItem}</b>`)
    }
}