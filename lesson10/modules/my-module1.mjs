console.log("Begin my-module1")

import log, { setCount, showCount} from './my-module2.mjs'


export function div(a, b) {
    log('Received ' + a + " and " + b)
    return a/b
}

setCount(33)

showCount()

console.log("End my-module1")
