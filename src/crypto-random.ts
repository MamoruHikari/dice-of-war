import * as crypto from "crypto";
import { ICryptoRandom } from "./types";

export class CryptoRandom implements ICryptoRandom {
    generateKey(length: number): Buffer {
        return crypto.randomBytes(length);
    }
    generateInt(min: number, max: number): number {
        return crypto.randomInt(min, max + 1);
    }
    hmacSha3(key: Buffer, msg: string): string {
        return crypto.createHmac("sha3-256", key).update(msg).digest("hex").toUpperCase();
    }
}