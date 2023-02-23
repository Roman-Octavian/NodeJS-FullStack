const rocks = [
    {name: "0", age: 2},
    {name: "1", age: 50},
    {name: "2", age: 47},
    {name: "3", age: 100_000_000_000}
];

/*loop methods: 
map, 
filter (does not guarantee one to one), 
find, 
reduce, 
sort, 
forEach (front end mostly) */

// assignment make all the rocks one year older and save the value to rocksAgedOneYear
/*const rocksAgedOneYear = rocks.map(rock => {
    rock.age++
    return rock;
}) <-- this mutates the rocks array so don't do it */

const rocksAgedOneYear = rocks.map(rock => ({...rock, age: age + 1}));
/* const rocksAgedOneYear = rocks.map(rock => {
    return { ...rock, age: rock.age + 1 }
}) */
console.log(rocksAgedOneYear);

// assignment give me the rocks that have even age
const evenAgedRocks = rocks.filter(rock => rock.age % 2 === 0);
console.log(evenAgedRocks);