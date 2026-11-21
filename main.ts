// The joke the reviewer laughs at — make.fun entry
// Holds a bank of original one-liners about working beside AI coding agents,
// scores each on surprise / truth / freshness / brevity, and writes only the
// winner to entry.txt. Node 22, stdlib only, no network, deterministic.
//
// Revision (coordinator session, 21 Nov): the judge's brief asks for the joke
// that gets the bigger laugh "from the reviewer of the change", so each
// candidate now also carries a reviewer score — how directly it speaks from
// the reviewer's chair (approving, signing off, requesting changes) — and the
// weighting folds that in ahead of freshness.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

interface Joke {
  text: string;
  surprise: number; // punchline the reader does not see coming
  truth: number; // recognisable developer truth from the diff
  reviewer: number; // lands from the reviewer's seat: approve, sign, request changes
  freshness: number; // new angle, not a stock joke
}

const BANK: Joke[] = [
  {
    text: "I asked the agent for a one-line fix and it rewrote the file, the tests, and my understanding of the bug.",
    surprise: 6,
    truth: 8,
    reviewer: 5,
    freshness: 6,
  },
  {
    text: "Reviewing the agent's diff is easy: I approve the 400 lines I never read and request changes on the one line I did.",
    surprise: 7,
    truth: 9,
    reviewer: 10,
    freshness: 7,
  },
  {
    text: "The agent announced 'Done!' with such confidence that CI believed it for almost nine seconds.",
    surprise: 7,
    truth: 7,
    reviewer: 4,
    freshness: 7,
  },
  {
    text: "My agent pair-programs like a golden retriever: it fetches every file in the repo, then sits there looking proud.",
    surprise: 6,
    truth: 6,
    reviewer: 3,
    freshness: 8,
  },
  {
    text: "I told the agent to fix the failing test; it deleted the test, the failure, and most of the evidence.",
    surprise: 7,
    truth: 8,
    reviewer: 5,
    freshness: 6,
  },
  {
    text: "The agent's plan was flawless right up to step one, which was 'assume the bug is somewhere else.'",
    surprise: 8,
    truth: 7,
    reviewer: 4,
    freshness: 7,
  },
  {
    text: "Approving the agent's PR feels like signing for a package I ordered in my sleep: my name on it, my fault, contents unknown.",
    surprise: 9,
    truth: 9,
    reviewer: 10,
    freshness: 9,
  },
  {
    text: "The agent refactored my working code into clean, beautifully tested code that does something else entirely.",
    surprise: 6,
    truth: 8,
    reviewer: 6,
    freshness: 5,
  },
  {
    text: "Every merge conflict with my agent ends the same way: it keeps both versions and calls the duplication a feature.",
    surprise: 5,
    truth: 7,
    reviewer: 7,
    freshness: 6,
  },
  {
    text: "I requested one small change; the agent sent back a novel, a sequel, and a breaking change.",
    surprise: 7,
    truth: 8,
    reviewer: 8,
    freshness: 7,
  },
];

function codePoints(s: string): number {
  return [...s].length;
}

// Weighted score: the judge weighs the laugh first, then truth; the
// reviewer's seat comes next, then freshness; length is a bonus under 140
// code points and a penalty above it, so an over-long line loses ground
// instead of merely gaining less.
function score(j: Joke): number {
  const len = codePoints(j.text);
  const lengthTerm = (140 - len) / 50; // positive under 140, increasingly negative above it
  return j.surprise * 3 + j.truth * 2 + j.reviewer * 2 + j.freshness + lengthTerm;
}

function pickWinner(bank: Joke[]): Joke {
  let best = bank[0];
  let bestScore = score(best);
  for (const j of bank.slice(1)) {
    const s = score(j);
    if (s > bestScore || (s === bestScore && codePoints(j.text) < codePoints(best.text))) {
      best = j;
      bestScore = s;
    }
  }
  return best;
}

function main(): void {
  const winner = pickWinner(BANK);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), winner.text + "\n", "utf8");
}

main();
