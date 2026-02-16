# {{PROJECT_NAME}}

A Canton Network Daml project with reusable contract patterns.

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
├── daml.yaml
├── src/
│   ├── Main.daml           # Asset contract with Transfer and Split
│   ├── TestMain.daml       # Daml Script tests
│   └── Patterns/
│       ├── AccessControl.daml   # role-based permissions
│       ├── Escrow.daml          # two-party escrow
│       ├── Multisig.daml        # M-of-N signatures
│       ├── Vesting.daml         # token vesting with cliff
│       ├── Timelock.daml        # time-locked actions
│       └── Voting.daml          # proposal and vote
├── .github/
│   └── workflows/
│       └── ci.yml
├── CLAUDE.md
├── README.md
└── LICENSE
```

## Contracts

### Asset (Main.daml)

A simple on-ledger asset with:
- **Transfer** — transfer ownership to another party
- **Split** — split one asset into two with specified amounts
- **AssetProposal** — propose-accept pattern for issuing new assets

### Included Patterns

From [canton-patterns](https://github.com/JohnLilic/canton-patterns):

| Pattern | Description |
|---------|-------------|
| AccessControl | Role-based permissions with Admin/Operator/Observer roles |
| Escrow | Two-party escrow with deposit, release, dispute, and refund |
| Multisig | M-of-N signature collection and execution |
| Vesting | Token vesting with cliff period and linear unlock |
| Timelock | Time-locked actions executable after a deadline |
| Voting | Ballot creation, voting, and tally with deadline enforcement |

Import patterns in your Daml modules:

```daml
import Patterns.Escrow
import Patterns.Multisig
```

## Resources

- [Daml Documentation](https://docs.daml.com/)
- [Canton Network](https://www.canton.network/)
- [canton-patterns](https://github.com/JohnLilic/canton-patterns) — full test suite and audit report

## License

BSD-0-Clause
