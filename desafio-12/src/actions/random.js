const cantidad =  Number(process.argv[2]) || 100000000;
const min = 1;
const max = 1000;

const numbers = {};
for (let i = 0; i < cantidad; i++) {
    const random = Math.floor(Math.random() * (max - min + 1)) + min;
    if( numbers[random] === undefined ) {
        numbers[random] = 1;
    } else {
        numbers[random] += 1;
    }
}

process.send(numbers);
process.exit();