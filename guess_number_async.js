const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');

const rl = readline.createInterface({ input, output });


let myMin=1;
let myMax=10; 
let randomNumber = Math.floor(Math.random() * (myMax - myMin + 1) + myMin);

const fs = require('fs');

async function writeToFile(text) {
  await fs.promises.appendFile("./log", text, {
    encoding: 'utf8'
  });

}

async function getUserInput() {
    let promise = new Promise(function(resolve, reject) {
        rl.question('Введите число от 1 до 10: ', (input) => {
            let number = input;
            rl.pause();
            return resolve(number); 
            
        });  
    });
    return await promise;
}

async function play() {
    let counter = 0;
    while(true) {
        let input = await getUserInput();
        let userNumber = +input;
    
        if(isNaN(userNumber) || userNumber < myMin || userNumber > myMax) {
            let text = 'Ошибка ввода\n';
            writeToFile(text);
            console.log(text);
            continue;
        }

        counter++;
    
        if(userNumber === randomNumber) {
            let text = `Вы угадали! Это число равно: ${randomNumber}. Попытки: ${+counter}\n`;
            writeToFile(text);
            console.log(text);
            break;
        }
    
        if(userNumber > randomNumber) {
            let text = `Много! Вы ввели: ${userNumber}. Попытки #${counter}\n`;
            writeToFile(text);
            console.log(text);
        } else {
            let text = `Мало! Вы ввели: ${userNumber}. Попытки #${counter}\n`;
            writeToFile(text);
            console.log(text);
        }
    }
    rl.close();
}

play();