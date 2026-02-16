# create-canton-app

Scaffold a Canton Network Daml project in one command.

## Usage

```sh
npx create-canton-app my-project
```

This creates a complete Daml project with a starter contract, tests, CI pipeline, and development configuration.

## Options

```
Usage: create-canton-app [options] <project-name>

Arguments:
  project-name          Name of the project to create

Options:
  --template <type>     Project template: minimal or full (default: "minimal")
  --no-git              Skip git initialization
  -h, --help            Display help
```

## Templates

### minimal (default)

A starter project with a simple Asset contract demonstrating core Daml patterns:

- `src/Main.daml` — Asset template with Transfer and Split choices
- `src/TestMain.daml` — Daml Script tests
- CI pipeline for build, test, and DAR artifact upload

### full

Everything in minimal, plus all 6 reusable contract patterns from [canton-patterns](https://github.com/JohnLilic/canton-patterns):

- Access Control — role-based permissions with grant/revoke
- Escrow — two-party escrow with deposit, release, dispute, refund
- Multisig — M-of-N signature collection and execution
- Vesting — token vesting with cliff and linear unlock
- Timelock — time-locked actions with cancel and execute
- Voting — proposal, vote, and tally with deadline enforcement

## Generated Project Structure

```
my-project/
├── daml.yaml
├── src/
│   ├── Main.daml
│   ├── TestMain.daml
│   └── Patterns/          # full template only
│       ├── AccessControl.daml
│       ├── Escrow.daml
│       ├── Multisig.daml
│       ├── Vesting.daml
│       ├── Timelock.daml
│       └── Voting.daml
├── .github/
│   └── workflows/
│       └── ci.yml
├── CLAUDE.md
├── README.md
├── LICENSE
└── .gitignore
```

## Publishing

```sh
npm run build
npm publish
```

## License

BSD-0-Clause
