import { Link } from 'react-router-dom';
import { Button } from '@mf/ui';

export default function HomePage() {
  return (
    <div>
      <h1>Welcome to MF Store</h1>
      <p>
        This storefront is composed at runtime from three independently deployed
        apps.
      </p>
      <Link to="/product">
        <Button>Shop Now</Button>
      </Link>
    </div>
  );
}
