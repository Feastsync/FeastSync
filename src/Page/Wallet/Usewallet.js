import { useState, useEffect } from "react";
import api from "../../Redux/app/axios";

export function useWalletSummary() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSummary() {
      try {
        setLoading(true);
        const res = await api.get("/wallet/wallet-summary");
        setSummary(res.data.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchSummary();
  }, []);

  return { summary, loading, error };
}

export function useWalletTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        setLoading(true);
        const res = await api.get("/wallet/wallet-transactions");
        setTransactions(res.data.data);
        setPagination(res.data.pagination);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchTransactions();
  }, []);

  return { transactions, pagination, loading, error };
}