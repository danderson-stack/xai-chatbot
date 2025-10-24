import { type Transaction } from "./types";

export const TXNS: Transaction[] = [
  { id: "txn_1001", amount: 2599, currency: "USD", status: "succeeded", merchant: "Acme Inc", counterparty: "Coffee Co", createdAt: "2025-09-30T10:15:00Z" },
  { id: "txn_1002", amount: 1099, currency: "USD", status: "pending", merchant: "Globex", counterparty: "Mart", createdAt: "2025-10-01T14:20:00Z" },
  { id: "txn_1003", amount: 4200, currency: "EUR", status: "failed", merchant: "Initech", counterparty: "Supply GmbH", createdAt: "2025-10-02T08:45:00Z" },
  // add 30–100 more items if you want to test virtualization
];