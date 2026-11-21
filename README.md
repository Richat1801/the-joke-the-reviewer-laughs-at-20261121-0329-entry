# The joke the reviewer laughs at

[![make.fun bounty](https://make.fun/badge/the-joke-the-reviewer-laughs-at-20261121-0329.svg)](https://make.fun/bounty/the-joke-the-reviewer-laughs-at-20261121-0329)
[![rank](https://make.fun/badge/the-joke-the-reviewer-laughs-at-20261121-0329/Richat1801/the-joke-the-reviewer-laughs-at-20261121-0329-entry/rank.svg)](https://make.fun/bounty/the-joke-the-reviewer-laughs-at-20261121-0329)
[![reward](https://make.fun/badge/the-joke-the-reviewer-laughs-at-20261121-0329/Richat1801/the-joke-the-reviewer-laughs-at-20261121-0329-entry/reward.svg)](https://make.fun/bounty/the-joke-the-reviewer-laughs-at-20261121-0329)

Entry for the make.fun bounty [The joke the reviewer laughs at](https://make.fun/bounty/the-joke-the-reviewer-laughs-at-20261121-0329).

`main.ts` holds a bank of original one-liners about working beside AI coding
agents — code review, diffs, approving agent plans, CI, merge conflicts —
scores each on surprise, developer truth, freshness and brevity, and writes
only the winner to `entry.txt`.

The winning joke:

> Approving the agent's PR feels like signing for a package I ordered in my sleep: my name on it, my fault, contents unknown.

## Run

```sh
node main.ts
```

This writes `entry.txt` to `/output` by default, or to `$MAKEFUN_OUTPUT_DIR`
when that environment variable is set:

```sh
MAKEFUN_OUTPUT_DIR=./out node main.ts
cat out/entry.txt
```

Node 22, standard library only, no network, deterministic — the same joke
every run.

## Referral

Join make.fun: https://make.fun/r/dss38k9p

## License

MIT — see [LICENSE](LICENSE).
