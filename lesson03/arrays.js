//let a = [1,2,3,4,5]
let a = [1,"2",[3,4,5], "Sport", "Lisboa", "e", "Benfica", { }]
let o = {'0': 1, '1': "2",'2': [3,4,5], '3':"Sport", '4':"Lisboa", '5': "e", '6': "Benfica", '7': { }}

console.log(a[0])
console.log(o[0])

console.log(a)
console.log(o)

console.log(a.length)
console.log(o.length)

a.a = "SLB"
console.log(a)
console.log(a.length)

a[1327] = 55
a[57625] = 99
console.log(a)
console.log(a.length)
//console.log(a[57000])
// console.log(a[58000])


a.length = 3
console.log(a)

// a.length = 57625
// console.log(a)

// Push an element to the end of the array
// Push(20)
a[a.length] = 20    
console.log(a)

// Pop
let last = a[a.length -1]
--a.length

console.log(last)
console.log(a)

for(const name in a) {
    console.log(name)
}