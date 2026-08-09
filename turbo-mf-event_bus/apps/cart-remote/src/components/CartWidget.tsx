import { useState } from 'react';
import { Button } from '@mf/ui';
import type { CartItem } from '@mf/types';

export default function CartWidget() {
  const [items] = useState<CartItem[]>([
    { id: 'p1', name: 'Wireless Headphones', price: 4500, quantity: 1 },
  ]);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div style={{ border: '1px solid #ddd', padding: 16, borderRadius: 8 }}>
      <h3>Cart ({items.length})</h3>
      <p>Total: Rs. {total}</p>
      <Button variant="secondary">Checkout</Button>
    </div>
  );
}
