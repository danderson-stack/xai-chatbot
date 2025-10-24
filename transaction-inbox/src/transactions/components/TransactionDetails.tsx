import { type Transaction } from "../types"

export default function TransactionDetails({id, source}: {id: string | null, source: Transaction[]}) {
    if (!id) return <aside role="complementary">Select a transaction</aside>;
    const txn = source.find(t => t.id === id);
    if(!txn) return <aside>No data found</aside>
    console.log('found and matched and should render')
    return (
        <aside aria-label="transaction-details" style={{border: "1px solid black", padding:12, borderRadius: 8}}>
            <h1>{txn.id}</h1>
            <p><b>Merchant:</b> {txn.merchant}</p>
            <p><b>Amount:</b> {txn.amount}</p>
            <p><b>Status:</b> {txn.status}</p>
            <p><b>Currency:</b> {txn.currency}</p>
            <p><b>Created:</b> {new Date(txn.createdAt).toLocaleString()}</p>
        </aside>
    )
}