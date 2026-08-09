import { Button } from '@mf/ui';
import type { Product } from '@mf/types';
import { useAppDispatch, addItem } from '@mf/cart-store';
import { emit } from '@mf/event-bus';

const product: Product = {
  id: 'p1',
  name: 'Wireless ',
  price: 4500,
};

export default function ProductPage() {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(addItem(product)); // business truth → Redux
    emit('cart:add', product); // non-critical signal → event bus (e.g. host shows a toast)
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
