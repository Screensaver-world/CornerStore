import { UAParser } from 'ua-parser-js'

let parser;
let device;

if (typeof window !== "undefined") {
    parser = new UAParser(window.navigator.userAgent)
    device = parser?.getDevice()
}

export const userAgent = parser?.getResult()

export const isMobile = device?.type === 'mobile' || device?.type === 'tablet'
