# Dice of War: Non-Transitive Dice Game (Console, TypeScript)

This project is a console-based implementation of a **non-transitive dice game** using TypeScript. It fully satisfies all requirements of the internship task specification, ensuring provable fairness, robust input validation, modular code organization, and clear, user-friendly CLI interaction.

---

## Features

- **Generalized Dice:** Supports any number of dice (minimum 3), each with arbitrary integer face values.
- **Command-line Interface:** Dice configurations are provided as command-line arguments, e.g.  
  ```
  ts-node src/index.ts 2,2,4,4,9,9 6,8,1,1,8,6 7,5,3,7,5,3
  ```
- **Provably Fair Play:** All random choices (such as who moves first, dice rolls) are made using a cryptographically secure protocol with HMAC proofs, allowing users to verify fairness.
- **Rich, Colorful Console Output:** Uses the [`chalk`](https://www.npmjs.com/package/chalk) NPM package for enhanced terminal readability.
- **Help & Probability Table:** At any prompt, enter `?` to display a clear, well-formatted ASCII table (using `cli-table3`) showing winning probabilities for each pair of dice.
- **Robust Validation & Friendly Errors:** Input validation is strict and user-friendly, with clear error messages and usage examples.
- **Modular, Well-Structured Code:** All responsibilities separated into individual files; all types are defined in a single `types.ts`.
- **Thoroughly Tested:** The code has passed all validation/error scenarios specified below.

---

## Code Structure

- `src/types.ts` — All TypeScript interfaces and type definitions.
- `src/dice-parser.ts` — Parsing and validation of dice input.
- `src/probability-calculator.ts` — Calculation of win probabilities for dice pairs.
- `src/table-renderer.ts` — Renders the help/probability table using `cli-table3`.
- `src/crypto-random.ts` — Cryptographically secure random number and HMAC generation.
- `src/fair-random-protocol.ts` — Implements the collaborative fair random number protocol.
- `src/select-dice.ts` — Handles user dice selection via CLI menu.
- `src/index.ts` — Main entry point; orchestrates the game, CLI, and all modules.

---

## Requirements & Compliance

- **Dice configuration is read from command line arguments only.**
- **At least 3 dice required; each dice must have exactly 6 integer faces.**
- **All error cases produce clear, English, non-stacktrace messages with examples.**
- **Collaborative fair random protocol implemented using cryptographically secure random numbers, 256-bit keys, and HMAC-SHA3 proofs.**
- **All random outcomes are verifiable by the user.**
- **Classes are organized by responsibility (at least 6-9 classes).**
- **Help table uses a 3rd-party library (`cli-table3`).**
- **All types are collected in `types.ts`.**
- **Enhanced console output using `chalk` for better readability.**
- **Passed all specified error scenario tests (see below).**

---

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Build the project:**

   ```bash
   npm run build
   ```
   
3. **Run the game:**
   ```bash
   ts-node src/index.ts <dice1> <dice2> <dice3> [<dice4> ...]
   ```
   Example:
   ```bash
   ts-node src/index.ts 2,2,4,4,9,9 6,8,1,1,8,6 7,5,3,7,5,3
   ```

---

## Error Handling — Tested Cases

### 1. Too few dice
**Command:**
```
ts-node src/index.ts 2,2,4,4,9,9 6,8,1,1,8,6
```
**Expected Output:**
```
Error: Please specify at least 3 dice.
Example: 2,2,4,4,9,9 6,8,1,1,8,6 7,5,3,7,5,3
```

---

### 2. Non-integer value
**Command:**
```
ts-node src/index.ts 2,2,4,4,X,9 6,8,1,1,8,6 7,5,3,7,5,3
```
**Expected Output:**
```
Error: Invalid face value in "2,2,4,4,X,9". All values must be integers.
Example: 2,2,4,4,9,9
```

---

### 3. Wrong number of faces
**Command:**
```
ts-node src/index.ts 2,2,4,4,9 6,8,1,1,8,6 7,5,3,7,5,3
```
**Expected Output:**
```
Error: Each dice must have 6 faces. Dice "2,2,4,4,9" has 5 faces.
Example: 2,2,4,4,9,9
```

---

## Additional Notes

- To exit at any prompt, enter `X` or `x`.
- Enter `?` at any prompt to display the help/probability table.
- All random outcomes (who goes first, dice rolls) are performed using a cryptographically fair protocol; HMACs and keys are displayed for user verification.

---

## Dependencies

- [`cli-table3`](https://www.npmjs.com/package/cli-table3) — For ASCII table rendering.
- [`chalk`](https://www.npmjs.com/package/chalk) — For colored terminal output.
- Node.js built-in [`crypto`](https://nodejs.org/api/crypto.html) — For secure randomness and HMAC.

---

## License

MIT
