import { Button } from '@mf/ui';
import type { Product } from '@mf/types';
import { useAppDispatch, addItem, notify } from '@mf/store';

const product: Product = {
  id: 'p1',
  name: 'Wireless Headphones',
  price: 4500,
};

export default function ProductPage() {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(addItem(product));
    dispatch(notify(`Added ${product.name}`, 'success'));
  };

  return (
    <div>
      <h1>Product</h1>
      <div
        style={{
          border: '1px solid #ddd',
          padding: 16,
          borderRadius: 8,
          maxWidth: 320,
        }}
      >
        <h3>{product.name}</h3>
        <p>Rs. {product.price}</p>
        <Button onClick={handleAddToCart}>Add to Cart</Button>
      </div>
    </div>
  );
}
