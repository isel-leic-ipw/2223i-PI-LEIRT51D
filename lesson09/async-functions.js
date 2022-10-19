async function f() {
    //return 5
    return Promise.resolve(5)
}

let p = Promise.resolve(3)

console.log(p)
console.log(f())
