import { IDice, IProbabilityCalculator } from "./types";

export class ProbabilityCalculator implements IProbabilityCalculator {
    winProbability(a: IDice, b: IDice): number {
        let win = 0, total = 0;
        for (const f1 of a.faces) {
            for (const f2 of b.faces) {
                if (f1 > f2) win++;
                total++;
            }
        }
        return win / total;
    }
}