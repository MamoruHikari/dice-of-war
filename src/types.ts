export interface IDice {
    readonly faces: number[];
    toString(): string;
}

export interface IDiceParser {
    parse(args: string[]): { dice: IDice[]; error?: ValidationError };
}

export class Dice implements IDice {
    readonly faces: number[];
    constructor(faces: number[]) {
        this.faces = faces;
    }
    toString(): string {
        return this.faces.join(",");
    }
}

export class ValidationError {
    readonly message: string;
    constructor(message: string) {
        this.message = message;
    }
    toString() {
        return this.message;
    }
}

export interface IProbabilityCalculator {
    winProbability(a: IDice, b: IDice): number;
}

export interface ITableRenderer {
    render(dice: IDice[], calculator: IProbabilityCalculator): string;
}

export interface IFairRandomProtocol {
    generateValue(
        min: number,
        max: number,
        prompt: string
    ): Promise<{ value: number; key: Buffer; hmac: string; computerValue: number }>;
}

export interface ICryptoRandom {
    generateKey(length: number): Buffer;
    generateInt(min: number, max: number): number;
    hmacSha3(key: Buffer, msg: string): string;
}