import { IDice, ITableRenderer, IProbabilityCalculator } from "./types";
import * as readline from "readline";

export async function selectDice(
    prompt: string,
    dice: IDice[],
    rl: readline.Interface,
    tableRenderer: ITableRenderer,
    calculator: IProbabilityCalculator
): Promise<number> {
    while (true) {
        console.log(prompt);
        dice.forEach((d, i) => console.log(`${i} - ${d}`));
        console.log("X - exit\n? - help");
        const answer = await new Promise<string>(resolve => rl.question("Your selection: ", resolve));
        if (answer.toLowerCase() === "x") process.exit(0);
        if (answer === "?") {
            console.log(tableRenderer.render(dice, calculator));
            continue;
        }
        const idx = Number(answer);
        if (isNaN(idx) || idx < 0 || idx >= dice.length) {
            console.log("Please select a valid dice number.");
            continue;
        }
        return idx;
    }
}