import {useState} from 'react';
import { type Transaction } from '../types';
import TxnList from '../components/TxnList'
import { useTransaction, useTxnFilter } from '../hooks/useTransactions';
import TransactionDetails from './TransactionDetails';
// interface SearchContainerProps {
//     value: string;
//     onChange: (value:string)=>void;
// }
// function SearchContainer({value, onChange}: SearchContainerProps) {
//     const handleOnChange = (event: any)=>{
//         onChange(event.target.value)
//     }
//     return (
//         <div>
//             <label htmlFor="query">
//                 Search:
//             </label>
//             <input name="query" onChange={handleOnChange} value={value} placeholder="Add search term here"></input>
//         </div>
//     )
// }


export default function TransactionInbox(){
    // const [query, setQuery] = useState("");
   const { data, error, loading} = useTransaction();
   const [selectedId, setSelectedId] = useState<string | null>(null);
    const {q, setQ, status, setStatus, filtered} = useTxnFilter(data);

    if(loading) return <p>Show spinner</p>
    if(error) return <p>There was an error</p>
    return (
        <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
            <div >
                <div style={{display: "flex", flexDirection: "row", gap: "10px"}}>
                    <input
                        aria-label="search"
                        onChange={(event)=>setQ(event.target.value)}
                        value={q}
                        placeholder='Search...'
                    />
                    <select
                        aria-label="status"
                        value={status}
                        onChange={(e)=>setStatus(e.target.value as any)}
                    >
                        <option value="all">All</option>
                        <option value="succeeded">Succeeded</option>
                        <option value="pending">Pending</option>
                        <option value="failed">Failed</option>
                    </select>
                </div>
                <TxnList items={filtered ?? []} onSelect={setSelectedId}/>
            </div>
            <TransactionDetails id={selectedId} source={filtered ?? []} />
        </div>
    )
}