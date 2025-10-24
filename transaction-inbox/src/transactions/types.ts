export type TxnStatus = "succeeded" | "pending" | "failed";


export interface Transaction {
    id: string;
    amount: number;            // minor units (e.g., cents)
    currency: "USD" | "EUR" | "AUD";
    status: TxnStatus;
    merchant: string;
    counterparty: string;
    createdAt: string;  
}

export interface CreatePayoutInput {
    amount: number;            // minor units
    currency: "USD" | "EUR" | "AUD";
    destination: string;       // email or id
}
