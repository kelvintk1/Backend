console.log('Hello Node js from Typescript');

// basic types
let isDone : Boolean = false;
let num : number = 100;
let str : string = 'Hello World';
let list : number[] = [1, 2, 3];
let products : string[] = ["product 1", "product 2", "product 3"];

let randomVal : any = 10;
randomVal = "Hello";
// randomVal = true; // this is allowed because of any type
// randomVal = [1, 2, 3]; // this is allowed because of any type
// randomVal = { name: "John" }; // this is allowed because of any type
// randomVal = null; // this is allowed because of any type
// randomVal = undefined; // this is allowed because of any type

let xyz : undefined = undefined
let yz : null = null

enum Color{
    Red, Green, Blue
}
let d : Color = Color.Green;

// tuple
let abc : [string, number]=["hi", 400];

// interfaces, types
interface User {
    name: string;
    id: number;
    email?: string;
    readonly createdAt: Date;
}

const user: User = {
    name: "John Doe",
    id: 1,
    createdAt: new Date(),
    email: "john.doe@example.com"
};

type Product = {
    title: string;
    price: number;
}
const product1: Product = {
    title: "Product 1",
    price: 100
};

// functions with type annotations
function add(x: number, y: number): number {
    return x + y;
}

const multiply = (num1: number, num2: number) : number => {
    return num1 * num2;
}
function greet(name: string, age?: number): string {
    if (age) {
        return `Hello ${name}, you are ${age} years old.`;
    }
    return `Hello ${name}`;
}

console.log(greet('John', 30));
