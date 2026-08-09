import { Button } from '@mf/ui';
import type { Product } from '@mf/types';

const product: Product = {
  id: 'p1',
  name: 'Wireless Headphones',
  price: 4500,
};

export default function ProductCard() {
  return (
    <div style={{ border: '1px solid #ddd', padding: 16, borderRadius: 8 }}>
      <h3>{product.name}</h3>
      <p>Rs. {product.price}</p>
      <Button>Add to </Button>
    </div>
  );
}
