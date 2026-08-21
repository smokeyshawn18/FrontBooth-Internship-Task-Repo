import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  productSchema,
  type Product,
  type ProductFormValues,
} from "../schema/product.schema";
import {
  useAddProductMutation,
  useUpdateProductMutation,
} from "../../../api/productsApi";

interface ProductFormProps {
  editingProduct: Product | null;
  onDone: () => void;
}

const defaultValues: ProductFormValues = {
  name: "",
  price: 0,
  category: "",
  inStock: true,
};

export function ProductForm({ editingProduct, onDone }: ProductFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues,
  });

  const [addProduct] = useAddProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  // Repopulate the form whenever the row being edited changes
  useEffect(() => {
    if (editingProduct) {
      const { id: _id, ...rest } = editingProduct;
      reset(rest);
    } else {
      reset(defaultValues);
    }
  }, [editingProduct, reset]);

  const onSubmit = async (values: ProductFormValues) => {
    try {
      if (editingProduct) {
        await updateProduct({ id: editingProduct.id, ...values }).unwrap();
      } else {
        await addProduct(values).unwrap();
      }
      reset(defaultValues);
      onDone();
    } catch (err) {
      console.error("Failed to save product", err);
    }
  };

  const handleCancel = () => {
    reset(defaultValues);
    onDone();
  };

  return (
    <form className="product-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <h2>{editingProduct ? "Edit product" : "Add product"}</h2>

      <div className="field">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          aria-invalid={errors.name ? "true" : "false"}
          {...register("name")}
        />
        {errors.name && <p className="field-error">{errors.name.message}</p>}
      </div>

      <div className="field">
        <label htmlFor="price">Price</label>
        <input
          id="price"
          type="number"
          step="0.01"
          aria-invalid={errors.price ? "true" : "false"}
          {...register("price", { valueAsNumber: true })}
        />
        {errors.price && <p className="field-error">{errors.price.message}</p>}
      </div>

      <div className="field">
        <label htmlFor="category">Category</label>
        <input
          id="category"
          type="text"
          aria-invalid={errors.category ? "true" : "false"}
          {...register("category")}
        />
        {errors.category && (
          <p className="field-error">{errors.category.message}</p>
        )}
      </div>

      <div className="field field-checkbox">
        <label htmlFor="inStock">
          <input id="inStock" type="checkbox" {...register("inStock")} />
          In stock
        </label>
      </div>

      <div className="form-actions">
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? "Saving…"
            : editingProduct
              ? "Update product"
              : "Add product"}
        </button>
        <button type="button" className="secondary" onClick={handleCancel}>
          Back to list
        </button>
      </div>
    </form>
  );
}
