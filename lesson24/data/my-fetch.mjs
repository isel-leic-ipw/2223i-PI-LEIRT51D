


export default function(apiKey) {
    const data = {
        ['https://imdb-api.com/en/API/Top250Movies/' + apiKey]: 'file1.json',
        'https://imdb-api.com/en/API/Top250Movies/k_0gcvmqbk': 'file2.json'
    }

    return async function(uri) {
        const fileName = data[uri]
        return readFile(fileName)
    }
    
}