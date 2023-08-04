export interface Config {
    url: RegExp,
    listLocators: string[],
    whiteList: RegExp[],
    blackList: RegExp[],
}