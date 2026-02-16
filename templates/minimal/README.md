# {{PROJECT_NAME}}

A Canton Network Daml project.

## Prerequisites

- [Daml SDK](https://docs.daml.com/getting-started/installation.html) 2.9.7+
- Java 21+

## Getting Started

```sh
daml build     # compile the project
daml test      # run Daml Script tests
daml studio    # open in Daml Studio (VS Code)
```

## Project Structure

```
{{PROJECT_NAME}}/
├── daml.yaml           # project configuration
├── src/
│   ├── Main.daml       # Asset contract with Transfer and Split
│   └── TestMain.daml   # Daml Script tests
├── .github/
│   └── workflows/
│       └── ci.yml      # CI pipeline
├── CLAUDE.md           # Claude Code instructions
├── README.md
└── LICENSE
```

## Contracts

### Asset

A simple on-ledger asset with:
- **Transfer** — transfer ownership to another party
- **Split** — split one asset into two with specified amounts
- **AssetProposal** — propose-accept pattern for issuing new assets

## Resources

- [Daml Documentation](https://docs.daml.com/)
- [Canton Network](https://www.canton.network/)
- [canton-patterns](https://github.com/JohnLilic/canton-patterns) — reusable contract patterns

## License

BSD-0-Clause
