import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';

export default function Stock() {
    const { id } = useParams();
    const [history, setHistory] = useState([]);
    const [form, setForm] = useState({ type: 'IN', quantity: '', reason: '' });
    const [error, setError] = useState('');

    const load = () => api.get(`/products/${id}/stock/history`).then(r => setHistory(r.data.data.history));

    useEffect(() => { load(); }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await api.post(`/products/${id}/stock/adjust`, form);
            setForm({ type: 'IN', quantity: '', reason: '' });
            load();
        } catch (err) {
            setError(err.response?.data?.message || 'Adjustment failed');
        }
    };

    return (
        <div style={styles.page}>
            <h2>Stock Adjustment — Product #{id}</h2>
            {error && <p style={styles.error}>{error}</p>}
            <form onSubmit={handleSubmit} style={styles.form}>
                <select style={styles.input} value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                    <option value="IN">IN</option>
                    <option value="OUT">OUT</option>
                </select>
                <input style={styles.input} placeholder="Quantity" type="number" value={form.quantity}
                    onChange={e => setForm({ ...form, quantity: e.target.value })} required />
                <input style={styles.input} placeholder="Reason (optional)" value={form.reason}
                    onChange={e => setForm({ ...form, reason: e.target.value })} />
                <button style={styles.button} type="submit">Adjust Stock</button>
            </form>
            <h3 style={{ marginTop: 24 }}>History</h3>
            <table style={styles.table}>
                <thead>
                    <tr><th>Type</th><th>Quantity</th><th>Reason</th><th>Date</th></tr>
                </thead>
                <tbody>
                    {history.map(h => (
                        <tr key={h.id}>
                            <td>{h.type}</td><td>{h.quantity}</td><td>{h.reason || '—'}</td>
                            <td>{new Date(h.createdAt).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

const styles = {
    page: { padding: 24 },
    form: { display: 'flex', gap: 8, margin: '16px 0' },
    input: { padding: 8, border: '1px solid #ccc', borderRadius: 4 },
    button: { padding: '8px 16px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' },
    table: { width: '100%', borderCollapse: 'collapse', background: '#fff', marginTop: 12 },
    error: { color: 'red' },
};