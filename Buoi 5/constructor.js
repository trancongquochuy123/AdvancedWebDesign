class Person{
    constructor(name, address, phoneNum, cmnd) {
        this.name = name;
        this.address = address;
        this.phoneNum = phoneNum;
        this.cmnd = cmnd;
    }

    khaibao(){
        return `I'm ${this.name}, live in ${this.address}, phone number is ${this.phoneNum}, ID card is ${this.cmnd}`
    }
}

const person1 = new Person("Huy", "Da Nang", "132848654", "54184780870");
console.log(person1.khaibao());
