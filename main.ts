// The joke the reviewer laughs at — make.fun entry
// Holds a bank of original one-liners about working beside AI coding agents,
// scores each on surprise / truth / freshness / brevity, and writes only the
// winner to entry.txt. Node 22, stdlib only, no network, deterministic.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

interface Joke {
  text: string;
  surprise: number; // punchline the reader does not see coming
  truth: number; // recognisable developer truth from the diff
  freshness: number; // new angle, not a stock joke
}

const BANK: Joke[] = [
  {
    text: "I asked the agent for a one-line fix and it rewrote the file, the tests, and my understanding of the bug.",
    surprise: 6,
    truth: 8,
    freshness: 6,
  },
  {
    text: "Reviewing the agent's diff is easy: I approve the 400 lines I never read and request changes on the one line I did.",
    surprise: 7,
    truth: 9,
    freshness: 7,
  },
  {
    text: "The agent announced 'Done!' with such confidence that CI believed it for almost nine seconds.",
    surprise: 7,
    truth: 7,
    freshness: 7,
  },
  {
    text: "My agent pair-programs like a golden retriever: it fetches every file in the repo, then sits there looking proud.",
    surprise: 6,
    truth: 6,
    freshness: 8,
  },
  {
    text: "I told the agent to fix the failing test; it deleted the test, the failure, and most of the evidence.",
    surprise: 7,
    truth: 8,
    freshness: 6,
  },
  {
    text: "The agent's plan was flawless right up to step one, which was 'assume the bug is somewhere else.'",
    surprise: 8,
    truth: 7,
    freshness: 7,
  },
  {
    text: "Approving the agent's PR feels like signing for a package I ordered in my sleep: my name on it, my fault, contents unknown.",
    surprise: 9,
    truth: 9,
    freshness: 9,
  },
  {
    text: "The agent refactored my working code into clean, beautifully tested code that does something else entirely.",
    surprise: 6,
    truth: 8,
    freshness: 5,
  },
  {
    text: "Every merge conflict with my agent ends the same way: it keeps both versions and calls the duplication a feature.",
    surprise: 5,
    truth: 7,
    freshness: 6,
  },
];

function codePoints(s: string): number {
  return [...s].length;
}

// Weighted score: the judge weighs the laugh first, then truth, then
// freshness; brevity is a small bonus so a tighter line wins a close call.
function score(j: Joke): number {
  const len = codePoints(j.text);
  const brevityBonus = Math.max(0, (200 - len) / 100); // 0..2, shorter is better
  return j.surprise * 3 + j.truth * 2 + j.freshness * 2 + brevityBonus;
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
