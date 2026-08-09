import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { on } from '@mf/event-bus';
import { selectCartItems, useAppSelector } from '@mf/cart-store';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/product', label: 'Product' },
  { to: '/cart', label: 'Cart' },
];

export function Header() {
  const items = useAppSelector(selectCartItems);

  // Total unique items in cart
  const itemTypesCount = items.length;

  // Total sum of quantities across all items
  const totalQuantity = items.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0,
  );

  useEffect(() => {
    return on('cart:add', (product) => {
      toast.success(`Added ${product.name}`);
    });
  }, []);

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
        {navItems.map((item) => {
          const isCart = item.to === '/cart';

          return (
            <Link
              key={item.to}
              to={item.to}
              style={{ textDecoration: 'none', color: '#111' }}
            >
              {item.label}
              {isCart && totalQuantity > 0 && (
                <span
                  style={{
                    marginLeft: 6,
                    backgroundColor: '#111',
                    color: '#fff',
                    borderRadius: 12,
                    padding: '2px 8px',
                    fontSize: 12,
                    fontWeight: 'bold',
                  }}
                >
                  {totalQuantity} ({itemTypesCount}{' '}
                  {itemTypesCount === 1 ? 'item' : 'items'})
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
