import { Dice, ValidationError, IDice, IDiceParser } from "./types";

export class DiceParser implements IDiceParser {
    parse(args: string[]): { dice: IDice[]; error?: ValidationError } {
        if (!args || args.length < 3) {
            return { dice: [], error: new ValidationError("Please specify at least 3 dice.\nExample: 2,2,4,4,9,9 6,8,1,1,8,6 7,5,3,7,5,3") };
        }
        const dice: IDice[] = [];
        for (const arg of args) {
            const faces = arg.split(",").map(s => Number(s.trim()));
            if (faces.some(isNaN)) {
                return { dice: [], error: new ValidationError(`Invalid face value in "${arg}". All values must be integers.\nExample: 2,2,4,4,9,9`) };
            }
            if (faces.length !== 6) {
                return { dice: [], error: new ValidationError(`Each dice must have 6 faces. Dice "${arg}" has ${faces.length} faces.\nExample: 2,2,4,4,9,9`) };
            }
            dice.push(new Dice(faces));
        }
        return { dice };
    }
}