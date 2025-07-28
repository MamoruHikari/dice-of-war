import { IFairRandomProtocol, ICryptoRandom } from "./types";
import * as readline from "readline";

export class FairRandomProtocol implements IFairRandomProtocol {
    private rng: ICryptoRandom;
    private rl: readline.Interface;
    constructor(rng: ICryptoRandom, rl: readline.Interface) {
        this.rng = rng;
        this.rl = rl;
    }
    async generateValue(
        min: number,
        max: number,
        prompt: string
    ): Promise<{ value: number; key: Buffer; hmac: string; computerValue: number }> {
        const rangeStr = `${min}..${max}`;
        const key = this.rng.generateKey(32);
        const computerValue = this.rng.generateInt(min, max);
        const hmac = this.rng.hmacSha3(key, computerValue.toString());
        console.log(`I selected a random value in the range ${rangeStr} (HMAC=${hmac}).`);
        let userValue: number | undefined = undefined;
        while (userValue === undefined) {
            const answer = await this.question(`${prompt}\n${Array.from({ length: max - min + 1 }, (_, i) => `${i} - ${i}`).join("\n")}\nX - exit\n? - help\nYour selection: `);
            if (answer.toLowerCase() === "x") process.exit(0);
            if (answer === "?") {
                return Promise.reject("help");
            }
            const val = Number(answer);
            if (isNaN(val) || val < min || val > max) {
                console.log(`Please enter a number between ${min} and ${max}, or X to exit.`);
                continue;
            }
            userValue = val;
        }
        const result = (computerValue + userValue) % (max - min + 1);
        console.log(`My number is ${computerValue} (KEY=${key.toString("hex").toUpperCase()}).`);
        console.log(`The fair number generation result is ${computerValue} + ${userValue} = ${result} (mod ${max - min + 1}).`);
        return { value: result, key, hmac, computerValue };
    }
    private question(query: string): Promise<string> {
        return new Promise(resolve => this.rl.question(query, resolve));
    }
}