import { useNavigate, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../../../api/productsApi";
import { ProductForm } from "../components/ProductForm";

export function ProductFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditRoute = Boolean(id);

  // Unfiltered on purpose — editing works even if the row wouldn't match
  // whatever search term is currently active on the list page.
  const { data: products } = useGetProductsQuery();
  const editingProduct = isEditRoute
    ? (products?.find((p) => p.id === id) ?? null)
    : null;

  return (
    <ProductForm editingProduct={editingProduct} onDone={() => navigate("/")} />
  );
}
