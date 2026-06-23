import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav style={styles.nav}>
            <span style={styles.brand}>StockFlow</span>
            <div style={styles.links}>
                <Link style={styles.link} to="/">Dashboard</Link>
                <Link style={styles.link} to="/products">Products</Link>
                <Link style={styles.link} to="/orders">Orders</Link>
                <button style={styles.logout} onClick={logout}>Logout</button>
            </div>
        </nav>
    );
}

const styles = {
    nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#1e3a8a', padding: '12px 24px' },
    brand: { color: '#fff', fontWeight: 'bold', fontSize: 20 },
    links: { display: 'flex', gap: 16, alignItems: 'center' },
    link: { color: '#fff', textDecoration: 'none' },
    logout: { background: '#ef4444', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: 4, cursor: 'pointer' },
};