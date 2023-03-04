class Shape {
    constructor(name, sides, sideLength) {
        this.name = name;
        this.sides = sides;
        this.sideLength = sideLength
    }

    calcPerimeter() {
        console.log(this.sides * this.sideLength)
    }

}

const square = new Shape("square", 4, 5)
square.calcPerimeter()

const triangle = new Shape("triangle", 3, 3)
triangle.calcPerimeter()

class Square extends Shape {
    constructor(sideLength) {
        super(sideLength)
        this.sideLength = sideLength
        this.name = "square"
        this.sides = 4
    }

    calcArea() {
        console.log(this.sideLength * this.sideLength)
    }
}

const square1 = new Square(6)
console.log(square1)
square1.calcArea()
square1.calcPerimeter()