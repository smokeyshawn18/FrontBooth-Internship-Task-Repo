import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  useGetProductsQuery,
  useDeleteProductMutation,
} from "../../../api/productsApi";
import {
  selectSearchTerm,
  setSearchTerm,
} from "../../../redux/slices/productsSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { ProductTableSkeleton } from "../components/ProductSkeleton";

export function ProductListPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const searchTerm = useAppSelector(selectSearchTerm);

  // Local input updates instantly; the Redux searchTerm (and the actual
  // network request) only updates 300ms after typing stops.
  const [inputValue, setInputValue] = useState(searchTerm);

  useEffect(() => {
    const handle = setTimeout(
      () => dispatch(setSearchTerm(inputValue.trim())),
      300,
    );
    return () => clearTimeout(handle);
  }, [inputValue, dispatch]);

  const {
    data: products,
    isLoading,
    isFetching,
    isError,
  } = useGetProductsQuery(searchTerm || undefined);
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  return (
    <div className="product-list">
      <div className="toolbar">
        <input
          type="search"
          className="search-input"
          placeholder="Search by name or category…"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          aria-label="Search products"
        />
        <button type="button" onClick={() => navigate("/products/new")}>
          Add product
        </button>
      </div>

      {isLoading ? (
    
        <ProductTableSkeleton rows={5} />
      ) : isError ? (
        <p className="status-message error">
          Couldn't load products.
        </p>
      ) : !products || products.length === 0 ? (
        <p className="status-message">
          {searchTerm
            ? `No products match "${searchTerm}".`
            : "No products yet — add your first one."}
        </p>
      ) : (
        <table className="product-table" aria-busy={isFetching}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>In stock</th>
              <th aria-label="Actions" />
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>{product.category}</td>
                <td>
                  <span
                    className={`badge ${product.inStock ? "badge-in" : "badge-out"}`}
                  >
                    {product.inStock ? "In stock" : "Out of stock"}
                  </span>
                </td>
                <td className="row-actions">
                  <button
                    type="button"
                    onClick={() => navigate(`/products/${product.id}/edit`)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="danger"
                    disabled={isDeleting}
                    onClick={() => deleteProduct(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
