

function doSomething(uri, fetch) {
    fixedWork1()
    // Variable work
    fetch(uri)
    fixedWork2()
}


function fixedWork1() {

}

function fixedWork2() {

}

function variableWork1() {

}

function variableWork2() {

}

function variableWork3() {

}


import fetch from 'node-fetch'

doSomething('https://imdb-api.com/en/API/Top250Movies/k_0gcvmqbk', fetch)

import myFetchInit from 'my-fetch'
const myFetch = myFetchInit('k_0gcvmqbk')
doSomething('https://imdb-api.com/en/API/Top250Movies/k_0gcvmqbk', myFetch)


// my-fetch

