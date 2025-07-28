import * as readline from "readline";
import { DiceParser } from "./dice-parser";
import { ProbabilityCalculator } from "./probability-calculator";
import { TableRenderer } from "./table-renderer";
import { CryptoRandom } from "./crypto-random";
import { FairRandomProtocol } from "./fair-random-protocol";
import { selectDice } from "./select-dice";
import chalk from "chalk";

async function main() {
    const args = process.argv.slice(2);
    const diceParser = new DiceParser();
    const { dice, error } = diceParser.parse(args);
    if (error) {
        console.error(chalk.red(error.toString()));
        process.exit(1);
    }

    const probabilityCalculator = new ProbabilityCalculator();
    const tableRenderer = new TableRenderer();
    const rng = new CryptoRandom();
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    const fairRandom = new FairRandomProtocol(rng, rl);

    try {
        console.log(chalk.green("Let's see who goes first: 0 = you, 1 = me."));
        const moveResult = await fairRandom.generateValue(0, 1, chalk.cyan("Try to guess my selection."));
        const userFirst = moveResult.value === 0;
        let userDiceIndex: number = -1, computerDiceIndex: number = -1;

        if (userFirst) {
            userDiceIndex = await selectDice(chalk.cyan("Choose your dice:"), dice, rl, tableRenderer, probabilityCalculator);
            computerDiceIndex = [0,1,2].find(i => i !== userDiceIndex)!;
            console.log(chalk.magenta(`I choose the ${chalk.yellow("[" + dice[computerDiceIndex] + "]")} dice.`));
        } else {
            computerDiceIndex = rng.generateInt(0, dice.length - 1);
            console.log(chalk.magenta(`I make the first move and choose the ${chalk.yellow("[" + dice[computerDiceIndex] + "]")} dice.`));
            userDiceIndex = await selectDice(chalk.cyan("Choose your dice:"), dice.filter((_,i)=>i!==computerDiceIndex), rl, tableRenderer, probabilityCalculator);
            userDiceIndex = [0,1,2].filter(i => i !== computerDiceIndex)[userDiceIndex];
            console.log(chalk.green(`You choose the ${chalk.yellow("[" + dice[userDiceIndex] + "]")} dice.`));
        }

        console.log(chalk.cyan("It's time for my roll."));
        const myRollResult = await fairRandom.generateValue(0, 5, chalk.cyan("Add your number modulo 6."));
        const myRoll = dice[computerDiceIndex].faces[myRollResult.value];
        console.log(chalk.magenta(`My roll result is ${chalk.yellow(myRoll.toString())}.`));

        console.log(chalk.cyan("It's time for your roll."));
        const userRollResult = await fairRandom.generateValue(0, 5, chalk.cyan("Add your number modulo 6."));
        const userRoll = dice[userDiceIndex].faces[userRollResult.value];
        console.log(chalk.green(`Your roll result is ${chalk.yellow(userRoll.toString())}.`));

        if (userRoll > myRoll) {
            console.log(chalk.green(`You win (${userRoll} > ${myRoll})!`));
        } else if (myRoll > userRoll) {
            console.log(chalk.magenta(`I win (${myRoll} > ${userRoll})!`));
        } else {
            console.log(chalk.blue(`It's a tie (${userRoll} = ${myRoll})!`));
        }
        rl.close();
    } catch (e) {
        if (e === "help") {
            const probabilityCalculator = new ProbabilityCalculator();
            const tableRenderer = new TableRenderer();
            console.log(tableRenderer.render(dice, probabilityCalculator));
            rl.close();
        } else {
            console.error(chalk.red("Unexpected error: "), e);
            throw e;
        }
    }
}

main();
