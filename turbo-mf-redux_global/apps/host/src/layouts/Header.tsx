import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  useAppSelector,
  useAppDispatch,
  selectNotifications,
  dismissNotification,
} from '@mf/store';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/product', label: 'Product' },
  { to: '/cart', label: 'Cart' },
];

export function Header() {
  const notifications = useAppSelector(selectNotifications);
  const dispatch = useAppDispatch();
  const shown = useRef(new Set<string>());

  useEffect(() => {
    notifications.forEach((n) => {
      if (shown.current.has(n.id)) return;
      shown.current.add(n.id);
      toast[n.type === 'error' ? 'error' : 'success'](n.message);
      dispatch(dismissNotification(n.id));
    });
  }, [notifications, dispatch]);

  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 24px',
        borderBottom: '1px solid #eee',
      }}
    >
      <strong style={{ fontSize: 20 }}>MF Store</strong>
      <nav style={{ display: 'flex', gap: 20 }}>
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            style={{ textDecoration: 'none', color: '#111' }}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
