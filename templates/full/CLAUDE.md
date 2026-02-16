# Canton/Daml Development

Project-specific instructions for Claude Code users.

## Language: Daml 2.9

This is a Daml smart contract project for the Canton Network.

- **SDK version:** 2.9.7 (see daml.yaml)
- **Source directory:** src/
- **Build:** `daml build`
- **Test:** `daml test`

## Daml Conventions

- Templates define on-ledger contracts with signatory, observer, and ensure clauses
- Choices are the only way to modify ledger state
- `controller` determines who can exercise a choice
- `signatory` determines who must authorize contract creation
- `observer` determines who can see the contract
- Use `getTime` for ledger time — never trust caller-supplied time values
- Tests use `Daml.Script` with `script do` blocks
- Use `submitMustFail` to test that invalid operations are rejected

## Common Mistakes

- Never use caller-supplied time in security-critical choices — always use `getTime`
- Always add `ensure` clauses to validate template invariants
- Check state preconditions in choices (e.g., escrow must be Funded before Release)
- The `source` field in daml.yaml must be a single string, not an array
- `DA.Time.time` takes 4 args: `Date -> Int -> Int -> Int -> Time` (date, hours, minutes, seconds)
- `setTime` is from `Daml.Script`, not `DA.Time`

## Project Structure

- `src/Main.daml` — Asset contract with Transfer and Split choices
- `src/TestMain.daml` — Daml Script tests
- `src/Patterns/` — Reusable contract patterns from canton-patterns
  - `AccessControl.daml` — role-based access with grant/revoke
  - `Escrow.daml` — two-party escrow with state machine
  - `Multisig.daml` — M-of-N multisig approval
  - `Vesting.daml` — token vesting with cliff and linear unlock
  - `Timelock.daml` — time-locked actions
  - `Voting.daml` — ballot, vote, and tally
- `daml.yaml` — project configuration

## Pattern Usage

Import patterns in your Daml modules:

```daml
import Patterns.Escrow
import Patterns.Multisig
```

See https://github.com/JohnLilic/canton-patterns for full documentation,
test coverage, and security audit report.
