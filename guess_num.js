const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');

const rl = readline.createInterface({ input, output });


let myMin=1;
let myMax=10; 
let randomNumber = Math.floor(Math.random() * (myMax - myMin + 1) + myMin);

let counter = 0;

const fs = require('fs');
function log(pathToFile) {
    if(pathToFile) {
        fs.writeFileSync(pathToFile, ""); 
    }

    return function add(line) {
        if(pathToFile) {
            fs.appendFile(pathToFile, line, 'utf8', (err) => {
                if(err) {
                    console.log("Ошибка");
                } 
            });
        }
        console.log(line);
    };
}

function play(response) {
    rl.question('Введите число от 1 до 10: ', (input) => {
        let userNumber = +input;

        if(isNaN(userNumber) || userNumber < myMin || userNumber > myMax) {
            response(`Неправильный ввод. `);
            play(response);
        }

        counter++;
    
        if(userNumber === randomNumber) {
            response(`Вы угадали! Это число равно: ${randomNumber}. Использованные попытки: ${+counter}\n`);
            rl.close();
            return;
        }
    
        if(userNumber > randomNumber) {
            response(`Слишком много! Вы ввели: ${userNumber}. Попытки #${counter}\n`);
        } else {
            response(`Слишком мало! Вы ввели: ${userNumber}. Попытки #${counter}\n`);
        }
    
        rl.pause();
        play(response);
    });
}

let response = log("./log");
play(response);