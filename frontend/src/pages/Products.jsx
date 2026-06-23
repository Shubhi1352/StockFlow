import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const emptyForm = { name: '', sku: '', description: '', price: '', category: '', currentStock: '' };

export default function Products() {
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const load = () => api.get('/products').then(r => setProducts(r.data.data.products));

    useEffect(() => { load(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (editId) {
                await api.put(`/products/${editId}`, form);
            } else {
                await api.post('/products', form);
            }
            setForm(emptyForm);
            setEditId(null);
            load();
        } catch (err) {
            setError(err.response?.data?.message || 'Error saving product');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this product?')) return;
        await api.delete(`/products/${id}`);
        load();
    };

    const handleEdit = (p) => {
        setEditId(p.id);
        setForm({ name: p.name, sku: p.sku, description: p.description || '', price: p.price, category: p.category || '', currentStock: p.currentStock });
    };

    return (
        <div style={styles.page}>
            <h2>Products</h2>
            {error && <p style={styles.error}>{error}</p>}
            <form onSubmit={handleSubmit} style={styles.form}>
                {['name', 'sku', 'description', 'price', 'category', 'currentStock'].map(field => (
                    <input key={field} style={styles.input} placeholder={field}
                        value={form[field]} onChange={e => setForm({ ...form, [field]: e.target.value })}
                        required={['name', 'sku', 'price', 'currentStock'].includes(field)} />
                ))}
                <button style={styles.button} type="submit">{editId ? 'Update' : 'Add Product'}</button>
                {editId && <button style={styles.cancel} type="button" onClick={() => { setEditId(null); setForm(emptyForm); }}>Cancel</button>}
            </form>
            <table style={styles.table}>
                <thead>
                    <tr><th>Name</th><th>SKU</th><th>Price</th><th>Stock</th><th>Category</th><th>Actions</th></tr>
                </thead>
                <tbody>
                    {products.map(p => (
                        <tr key={p.id}>
                            <td>{p.name}</td><td>{p.sku}</td><td>₹{p.price}</td><td>{p.currentStock}</td><td>{p.category}</td>
                            <td>
                                <button onClick={() => handleEdit(p)} style={styles.editBtn}>Edit</button>
                                <button onClick={() => handleDelete(p.id)} style={styles.deleteBtn}>Delete</button>
                                <button onClick={() => navigate(`/stock/${p.id}`)} style={styles.stockBtn}>Stock</button>
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
    form: { display: 'flex', flexWrap: 'wrap', gap: 8, margin: '16px 0' },
    input: { padding: 8, border: '1px solid #ccc', borderRadius: 4, minWidth: 140 },
    button: { padding: '8px 16px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' },
    cancel: { padding: '8px 16px', background: '#6b7280', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' },
    table: { width: '100%', borderCollapse: 'collapse', background: '#fff' },
    editBtn: { marginRight: 4, padding: '4px 8px', background: '#f59e0b', border: 'none', borderRadius: 4, cursor: 'pointer' },
    deleteBtn: { marginRight: 4, padding: '4px 8px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' },
    stockBtn: { padding: '4px 8px', background: '#10b981', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' },
    error: { color: 'red' },
};