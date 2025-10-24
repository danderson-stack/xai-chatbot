import { type Transaction } from "../types";

interface TransactionProps {
    items: Transaction[];
    onSelect: (id: string)=>void;
}

export default function TxnList({items, onSelect}:TransactionProps){
    if(!items.length) return <p>No Transactions</p>
    return (
        <table aria-label="transactions">
            <thead>
                <tr><th>Id</th><th>Merchant</th><th>Amount</th><th>Status</th></tr>
            </thead>
            <tbody>
                {items.map((item)=>{
                    return (
                        <tr key={item.id} onClick={()=>onSelect(item.id)} style={{cursor: "pointer"}}>
                            <td>{item.id}</td>
                            <td>{item.merchant}</td>
                            <td>{item.amount}</td>
                            <td>{item.status}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}