import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';

export default function Register() {
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await api.post('/auth/register', form);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2>Create Account</h2>
                {error && <p style={styles.error}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input style={styles.input} placeholder="Name" value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })} required />
                    <input style={styles.input} placeholder="Email" type="email" value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })} required />
                    <input style={styles.input} placeholder="Password" type="password" value={form.password}
                        onChange={e => setForm({ ...form, password: e.target.value })} required />
                    <button style={styles.button} type="submit">Register</button>
                </form>
                <p style={{ marginTop: 12 }}>Have an account? <Link to="/login">Login</Link></p>
            </div>
        </div>
    );
}

const styles = {
    container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' },
    card: { background: '#fff', padding: 32, borderRadius: 8, width: 360, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
    input: { display: 'block', width: '100%', padding: 10, margin: '12px 0', border: '1px solid #ccc', borderRadius: 4 },
    button: { width: '100%', padding: 10, background: '#2563eb', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' },
    error: { color: 'red', marginBottom: 8 },
};