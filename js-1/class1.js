class Dog{
    constructor(){
      this.f = 'i am f'
      let b = "i am b"
    }

    geti(){
        console.log(this.f)
    }
}
let dog = new Dog();
console.log(dog.f);
console.log(dog.b);
dog.geti();

abc = 'bhdbh jnjd njdnjdn [hjhjh] jhjhd [llllll]';
d = abc.split('[');
console.log(d);
