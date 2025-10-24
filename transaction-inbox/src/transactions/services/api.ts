import {type Transaction } from "../types";
import { TXNS } from "../mockData";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function fetchTransactions(): Promise<Transaction[]> {
  await sleep(300);
  // simulate flake: randomly fail 1/10
  if (Math.random() < 0.1) throw new Error("Network error");
  return TXNS;
}

// export async function createPayout(input: CreatePayoutInput): Promise<{ id: string }> {
//   await sleep(250);
//   if (input.amount <= 0) throw new Error("Invalid amount");
//   return { id: "po_" + Math.random().toString(36).slice(2, 8) };
// }
