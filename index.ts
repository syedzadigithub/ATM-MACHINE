#! /usr/bin/env node

//==== ATM Machine Project  ====//

import inquirer from "inquirer";
import chalk from "chalk";

// Initialize user balance and pin code

let myBalance = 10000;
let mypin = 786786;

//Print welcome message
console.log(chalk.blue("\n \tWelcome to Syeda - ATM Machine\n \t"));

let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        type: "number",
        message: (chalk.yellow("Enter your pin code:")),
    }

]);
if (pinAnswer.pin === mypin) {
    console.log(chalk.green("\nPin is Correct, Login Successfully!;\n"));
    //console.log(`Current Account Balance is ${myBalance}`);

    let operationAns = await inquirer.prompt([
        {
            name: "operation",
            type: "list",
            message:chalk.yellow ("Select an operation:"),
            choices:["Withdraw Ammount","Check Balance"],
        },
    ]);
    if(operationAns.operation ==="Withdraw Ammount"){
        let withdrawAns = await inquirer.prompt([

            {
                name: "withdrawMethod",
                type: "list",
                message:chalk.yellow("Select a withdrawal method"),
                choices: ["Fast Cash", "Enter Amount"]

            },
        ]);

        
        if(withdrawAns.withdrawMethod === "Fast Cash"){
            let fastcashAns = await inquirer.prompt([
                {
                    name: "fastcash",
                    type: "list",
                    message:chalk.yellow( "Select Amount:"),
                    choices: [1000, 2000, 4000, 7000, 8000, 10000, 20000, 50000],

                }
            ]);
            if(fastcashAns.fastcash > myBalance){
                console.log(chalk.red.bold("Insufficient Balance"));

            }
            else {
                myBalance -= fastcashAns.fastcash
                console.log(`${fastcashAns.fastcash} withdraw Successfully`);
                console.log(`Your Remaing Balance is: ${myBalance}`);
            }
        }
        else if(withdrawAns.withdrawMethod === "Enter Amount") {
            let amountAns = await inquirer.prompt([
                {
                    name: "amount",
                    type: "number",
                    message:chalk.yellow("Enter the amount of withdraw:"),
                },

            ]);

            if (amountAns.amount > myBalance){
                console.log(chalk.red.bold(`Insufficient Balance`));
            }
        
        else{
            myBalance -= amountAns.amount;
            console.log(`${amountAns.amount} Withdraw Successfully`);
            console.log(chalk.blue.bold(`Your Remaining Balance is: ${myBalance}`));
        }

    }

        }
        
    else if (operationAns.operation === "check Balance"){
        console.log(chalk.red(`Your Account Balance is: ${myBalance}`));
    }
    }
    else{
        console.log(chalk.red("Pin is Incorrect, Try Again"));
    }


