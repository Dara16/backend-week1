//PROBLEM 15
const fetch = require("node-fetch")

const fetchCharacters = async () => {
    try {
        const result = await fetch('https://rickandmortyapi.com/api/character')
        const data = await result.json()

        let characters = []
        for (const item of data.results) {
            characters.push(item.name)
        }
        console.log(characters)

    } catch (err) {
        return err.message
    }
}

const fetchData = async () => {
    try{
        const response = fetch('https://rickandmortyapi.com/api/character/2')
        const response2 = fetch('https://randomuser.me/api/?results=1')
        const [getResponse, getResponse2] = await Promise.all([response, response2])

        const finalResponse = await getResponse.json()
        const finalResponse2 = await getResponse2.json()

        let names = []
        names.push(finalResponse.name)
       
        for (const elem of finalResponse2.results) {
            fullName = elem.name.first + " " + elem.name.last
            names.push(fullName)
        }

        console.log(names)

    } catch (err) {
        return err.message
    }
}

console.log(fetchCharacters())
console.log(fetchData())