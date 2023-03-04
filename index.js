//PROBLEM 1
2 == '2'         //true
'he' == 'she'    //false
2 === 2          //true
'true' == true   //false 
true === true    //true
'true' != true   //true
'true' !== true  //true

//PROBLEM 2
//Variables can be declared using the "let", "const" and "var" keywords.
//Variables declared using "let" can be reassigned
//Variables declared using "const" cannot be reassigned
//Variables declared with "var" are globally scoped and can be accessed from anywhere within the program

//PROBLEM 3
//First class function
const greeting = () => {
    return "Hello, World!"
}

console.log(greeting())

//Higher Order Function
const numbers = [1, 2, 3, 4, 5]

const counter = numbers.forEach((number) => console.log(number ++))

//Callback Function
function greetUser() {
    return "Hello, User"
}

function print(callback) {  
   return callback()
}

console.log(print(greetUser))

//PROBLEM 4
// const a = 'hi';
// console.log(c);

// const someFunction = (arg) => {
//     const b = 'bye';
//     if (arg) {
//         const c = 'see ya!';
//         console.log(a);
//         console.log(b);
//     }
// }   //Theoretically, console.log(a) will log 'hi' because it is in global scope, 
    //console.log(b) will log 'bye' because it is declared outside the if statement and 
    //console.log(c) will log undefined or break the program because it's declaration is out of scope.

//PROBLEM 5
const someArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

for(let i=1;i<=someArray.length;i++) {
    console.log(i)
}

for(const item of someArray) {
    console.log(item)
}

//PROBLEM 6
//NM = Non-mutative, M = Mutative

// - Use the concat() method to merge the two arrays to return: [1, 2, 3, 4, 5] NM
// - Use the length property to return the length of the array  NM
// - Use the filter() method to filter out the element “3” and return: [1, 2, 4, 5] NM
// - Use the find() method to find and return the value of 5.   NM
// - Use the slice() method to return back this array: [3, 4]   NM
// - Use the splice() method to return back this array: [1, 2, 5]   M
// - Use the includes() method to return back TRUE when I pass in “4” into the includes method. NM
// - Use the indexOf() method to return back the index of the element “2”   NM
// - Use the isArray() method to return back TRUE when I pass in the array  NM
// - Use the join() method to return back: “1, 2, 3, 4, 5”  NM
// - Use the map() method to return back a new array: [2, 4, 6, 8, 10]  NM
// - Use the pop() method to return back a new array: [1, 2, 3, 4]  M
// - Use the push() method to return back a new array: [1, 2, 3, 4, 5, 6]   M
// - Use the shift() method to return back a new array: [2, 3, 4, 5]    M
// - Use the unshift() method to return back a new array: [0, 1, 2, 3, 4, 5]    M
// - Sort this array [9, 1, 3, 5] to return from smallest to largest using the sort() method, should return:
// [1, 3, 5, 9] NM
// - Use the reduce() method to return back the sum of all numbers in the array NM

//PROBLEM 7
const someObject = {
    color: 'black'
}

Object.assign(someObject, {name: "John Doe"})
someObject.age = 22
someObject["address"] = "123 test address"
console.log(Object.keys(someObject))
console.log(Object.values(someObject))

for(const property in someObject) {
    console.log(property)
}

for(const property in someObject) {
    console.log(someObject[property])
}

console.log(someObject)

//PROBLEM 8
const numberObjects = [
    {
    num: 1
    },
    {
    num: 2
    },
    {
    num: 3
    }
]

for(const { num } of numberObjects) {
    console.log(num)
}

//PROBLEM 9
const mySet = new Set()
mySet.add({name: "John Doe"})
mySet.delete({name: "John Doe"})

console.log(mySet)

//PROBLEM 10
const myMap = new Map()
myMap.set({name: "John Doe"})
myMap.delete({name: "John Doe"})

console.log(myMap)

//PROBLEM 11
//Asynchronous Programming is writing programs that can handle multiple tasks concurrently  
//rather than executing them one after the other.
//Examples of asynchronous JavaScript are callbacks, promises and async/await.
//These allow programs to start potentially long-running tasks. Promises can be returned which will either resolve or fail.


//PROBLEM 12
//Callback hell refers to a situation where callbacks are nested within other callbacks several levels deep, 
//making the code unreadable and difficult to maintain.

//PROBLEM 13
//A promise is an object that is returned as the result of an asynchronous operation.
//A promise has three states: pending, fulfilled or rejected.

//PROBLEM 14
//async/await improves the readability of asynchronous code by reading like synchronous code. The await keyword tells JavaScript 
//to wait for an asynchronous action to finish before continuing the function. In order to use the await keyword in a function, 
//the function has to be declared with the async keyword.

//PROBLEM 15
const fetchData = async () => {
    try{
        const response = fetch('https://rickandmortyapi.com/api/character/2')
        const response2 = fetch('https://randomuser.me/api/?results=1')
        const [getResponse, getResponse2] = await Promise.all([response, response2])

        const finalResponse = await getResponse.json()
        const finalResponse2 = await getResponse2.json()

    } catch (err) {
        return err.message
    }
}
