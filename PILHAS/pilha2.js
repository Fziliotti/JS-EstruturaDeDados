// Creates a stack
class Stack{
    constructor(){
        this.count = 0;
        this.storage = [];
    };  
    // Adds a value onto the end of the stack
    push(value) {
        this.storage[this.count] = value;
        this.count++;
    }
    
    // Removes and returns the value at the end of the stack
    pop() {
        if (this.count === 0) {
            return undefined;
        }
        this.count--;
        var result = this.storage[this.count];
        delete this.storage[this.count];
        return result;
    }
    
    size() {
        return this.count;
    }
    
    // Returns the value at the end of the stack
    peek() {
        return this.storage[this.count-1];
    }

    print(){
        for(var i=0; i<this.size(); i++) console.log(this.storage[i]);
    }
}

var myStack = new Stack();

myStack.push(1);
myStack.push(2);
myStack.push(3);
myStack.push(4);
myStack.push(5);
myStack.push(6);

myStack.pop();
myStack.print();

console.log(myStack.peek());