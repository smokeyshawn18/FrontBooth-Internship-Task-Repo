import { Button } from '@mf/ui';
import {
  useAppSelector,
  useAppDispatch,
  selectCartItems,
  selectCartTotal,
  removeItem,
} from '@mf/cart-store';

export default function CartPage() {
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);
  const dispatch = useAppDispatch();

  return (
    <div>
      <h1>Cart</h1>
      {items.length === 0 ? (
        <p>Your cart is empty. Add something from the Product page.</p>
      ) : (
        <>
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '8px 0',
                borderBottom: '1px solid #eee',
              }}
            >
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>
                Rs. {item.price * item.quantity}{' '}
                <button onClick={() => dispatch(removeItem(item.id))}>✕</button>
              </span>
            </div>
          ))}
          <p style={{ fontWeight: 'bold', marginTop: 12 }}>
            Total: Rs. {total}
          </p>
          <Button>Checkout</Button>
        </>
      )}
    </div>
  );
}
