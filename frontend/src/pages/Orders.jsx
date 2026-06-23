import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [productId, setProductId] = useState('');
    const [quantity, setQuantity] = useState('');
    const [error, setError] = useState('');

    const load = () => api.get('/orders').then(r => setOrders(r.data.data.orders));

    useEffect(() => { load(); }, []);

    const handlePlace = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await api.post('/orders', { items: [{ productId: Number(productId), quantity: Number(quantity) }] });
            setProductId(''); setQuantity('');
            load();
        } catch (err) {
            setError(err.response?.data?.message || 'Order failed');
        }
    };

    const handleCancel = async (id) => {
        if (!window.confirm('Cancel this order?')) return;
        await api.post(`/orders/${id}/cancel`);
        load();
    };

    return (
        <div style={styles.page}>
            <h2>Orders</h2>
            {error && <p style={styles.error}>{error}</p>}
            <form onSubmit={handlePlace} style={styles.form}>
                <input style={styles.input} placeholder="Product ID" value={productId}
                    onChange={e => setProductId(e.target.value)} required />
                <input style={styles.input} placeholder="Quantity" type="number" value={quantity}
                    onChange={e => setQuantity(e.target.value)} required />
                <button style={styles.button} type="submit">Place Order</button>
            </form>
            <table style={styles.table}>
                <thead>
                    <tr><th>ID</th><th>Status</th><th>Total</th><th>Date</th><th>Action</th></tr>
                </thead>
                <tbody>
                    {orders.map(o => (
                        <tr key={o.id}>
                            <td>{o.id}</td><td>{o.status}</td><td>₹{o.totalAmount}</td>
                            <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                            <td>
                                {o.status === 'PENDING' &&
                                    <button onClick={() => handleCancel(o.id)} style={styles.cancelBtn}>Cancel</button>}
                            </td>
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
    cancelBtn: { padding: '4px 8px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' },
    table: { width: '100%', borderCollapse: 'collapse', background: '#fff' },
    error: { color: 'red' },
};