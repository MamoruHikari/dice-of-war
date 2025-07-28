import { IDice, IProbabilityCalculator, ITableRenderer } from "./types";
import Table from "cli-table3";

export class TableRenderer implements ITableRenderer {
    render(dice: IDice[], calculator: IProbabilityCalculator): string {
        const n = dice.length;
        const table = new Table({
            head: ["User dice v", ...dice.map(d => d.toString())],
            colAligns: Array(n+1).fill("center"),
            style: { head: ["cyan"], border: ["grey"] }
        });
        for (let i = 0; i < n; ++i) {
            const row = [dice[i].toString()];
            for (let j = 0; j < n; ++j) {
                row.push(i === j ? ".3333" : calculator.winProbability(dice[i], dice[j]).toFixed(4));
            }
            table.push(row);
        }
        return table.toString();
    }
}