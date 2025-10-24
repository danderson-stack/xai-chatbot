import {useState, useEffect, useMemo} from 'react'
import { fetchTransactions } from "../services/api";
import type { Transaction, TxnStatus } from "../types";


export function useTransaction(){
    const [data, setData] = useState<Transaction[] | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log('running useEffect')
        let alive = true;
        setLoading(true);
        fetchTransactions()
          .then((txns) => alive && setData(txns))
          .catch((e) => alive && setError(e as Error))
          .finally(() => alive && setLoading(false));
        return () => { alive = false; };
      }, []);
    
      return { data, error, loading };
}

export function useTxnFilter(source: readonly Transaction[] | null) {
    const [q, setQ] = useState("");
    const [status, setStatus] = useState<TxnStatus | "all">("all");

    const filtered = useMemo(()=>{
        if(!source) return null;
        const t = q.trim().toLowerCase();
        return source.filter((x)=>{
            const matchQ = !t || [x.id, x.merchant, x.counterparty].some(s=>s.toLowerCase().includes(t))
            const matchS = status === "all" || x.status === status;
            return matchQ && matchS
        });

    }, [source, q, status])

    return {q, setQ, status, setStatus, filtered}
}