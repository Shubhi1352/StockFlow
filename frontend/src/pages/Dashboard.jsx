import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function Dashboard() {
    const [summary, setSummary] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        api.get('/dashboard/summary')
            .then(res => setSummary(res.data.data))
            .catch(() => setError('Failed to load dashboard'));
    }, []);

    if (error) return <p style={{ padding: 24, color: 'red' }}>{error}</p>;
    if (!summary) return <p style={{ padding: 24 }}>Loading...</p>;

    return (
        <div style={styles.page}>
            <h2>Dashboard</h2>
            <div style={styles.cards}>
                <StatCard label="Total Products" value={summary.totalProducts} />
                <StatCard label="Low Stock Items" value={summary.lowStockCount} />
                <StatCard label="My Orders" value={summary.totalOrders} />
            </div>
            <h3 style={{ marginTop: 32 }}>Recent Stock Activity</h3>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th>Product</th><th>Type</th><th>Quantity</th><th>Reason</th><th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {summary.recentActivity.map(a => (
                        <tr key={a.id}>
                            <td>{a.Product?.name || '—'}</td>
                            <td>{a.type}</td>
                            <td>{a.quantity}</td>
                            <td>{a.reason || '—'}</td>
                            <td>{new Date(a.createdAt).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function StatCard({ label, value }) {
    return (
        <div style={styles.card}>
            <p style={styles.cardLabel}>{label}</p>
            <p style={styles.cardValue}>{value}</p>
        </div>
    );
}

const styles = {
    page: { padding: 24 },
    cards: { display: 'flex', gap: 16, marginTop: 16 },
    card: { background: '#fff', padding: 20, borderRadius: 8, flex: 1, boxShadow: '0 1px 4px rgba(0,0,0,0.1)' },
    cardLabel: { color: '#666', fontSize: 14 },
    cardValue: { fontSize: 28, fontWeight: 'bold', marginTop: 4 },
    table: { width: '100%', borderCollapse: 'collapse', marginTop: 12, background: '#fff' },
};