# create-canton-app

Scaffold a Canton Network Daml project in one command.

## Quick Start

```
$ npx create-canton-app my-defi-app

  create-canton-app

  Scaffolding minimal Canton project: my-defi-app

  + .github/workflows/ci.yml
  + .gitignore
  + CLAUDE.md
  + LICENSE
  + README.md
  + daml.yaml
  + src/Main.daml
  + src/TestMain.daml

  Done! Created my-defi-app

  Next steps:

    cd my-defi-app
    daml build    — compile the project
    daml test     — run Daml Script tests
```

Use `--template full` to include all 6 audited contract patterns:

```
$ npx create-canton-app my-defi-app --template full
```

Use `--no-git` to skip git initialization:

```
$ npx create-canton-app my-defi-app --no-git
```

## Templates

### minimal (default)

A starter project with a simple Asset contract demonstrating core Daml patterns:

- **Asset** template with `Transfer` and `Split` choices
- **AssetProposal** template for propose-accept issuance
- 5 Daml Script tests covering issue, transfer, split, rejection
- CI pipeline for build, test, and DAR artifact upload
- `CLAUDE.md` with Canton/Daml conventions for Claude Code users

### full

Everything in minimal, plus all 6 reusable contract patterns from [canton-patterns](https://github.com/JohnLilic/canton-patterns):

| Pattern | Description |
|---------|-------------|
| AccessControl | Role-based permissions with Admin/Operator/Observer grant and revoke |
| Escrow | Two-party escrow with deposit, release, dispute, and refund |
| Multisig | M-of-N signature collection and threshold execution |
| Vesting | Token vesting with cliff period and linear unlock schedule |
| Timelock | Time-locked actions executable after a specified deadline |
| Voting | Ballot creation, voting, and tally with deadline enforcement |

## What You Get

### minimal

```
my-defi-app/
├── daml.yaml               # project config (SDK 2.9.7)
├── src/
│   ├── Main.daml            # Asset contract: Transfer, Split
│   └── TestMain.daml        # 5 Daml Script tests
├── .github/
│   └── workflows/
│       └── ci.yml           # build, test, upload DAR
├── CLAUDE.md                # Claude Code instructions
├── README.md                # project docs
├── LICENSE                  # BSD-0-Clause
└── .gitignore
```

### full

```
my-defi-app/
├── daml.yaml
├── src/
│   ├── Main.daml
│   ├── TestMain.daml
│   └── Patterns/
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

## Security

All included Daml patterns (AccessControl, Escrow, Multisig, Vesting, Timelock, Voting) have been security audited. The audit found and fixed 3 bugs including a high-severity time manipulation vulnerability in the Vesting contract that allowed beneficiaries to claim unvested tokens.

See the full audit report: [canton-patterns/AUDIT.md](https://github.com/JohnLilic/canton-patterns/blob/main/AUDIT.md)

## Related Repos

| Repo | Description |
|------|-------------|
| [canton-patterns](https://github.com/JohnLilic/canton-patterns) | Audited Daml contract patterns with 45 tests and security audit report |
| [canton-ci-templates](https://github.com/JohnLilic/canton-ci-templates) | CI/CD pipeline templates for Canton Daml projects |

## Contributing

Contributions welcome. To work on the CLI:

```sh
git clone https://github.com/JohnLilic/create-canton-app.git
cd create-canton-app
npm install
npm run build
npm test
```

To test the CLI locally:

```sh
node dist/index.js test-project --no-git
```

## License

BSD-0-Clause
