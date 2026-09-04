import { describe, expect, it } from "vitest";
import { computeScore } from "./scoring";
import { MAX_SCORE } from "./game.config";

describe("computeScore", () => {
  it("gives 0 points for no matches or mismatches", () => {
    expect(computeScore(0, 0)).toBe(0);
  });

  it("awards +10 per match", () => {
    expect(computeScore(3, 0)).toBe(30);
  });

  it("deducts -5 per mismatch", () => {
    expect(computeScore(3, 2)).toBe(20);
  });

  it("clamps at 0, never goes negative", () => {
    expect(computeScore(0, 10)).toBe(0);
  });

  it("clamps at MAX_SCORE", () => {
    expect(computeScore(50, 0)).toBe(MAX_SCORE);
  });
});
