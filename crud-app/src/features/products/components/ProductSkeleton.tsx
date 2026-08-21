interface ProductTableSkeletonProps {
  rows?: number;
}

export function ProductTableSkeleton({ rows = 5 }: ProductTableSkeletonProps) {
  return (
    <table className="product-table skeleton-table" aria-hidden="true">
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
        {Array.from({ length: rows }).map((_, i) => (
          <tr key={i}>
            <td>
              <span className="skeleton-block" style={{ width: "70%" }} />
            </td>
            <td>
              <span className="skeleton-block" style={{ width: "40%" }} />
            </td>
            <td>
              <span className="skeleton-block" style={{ width: "60%" }} />
            </td>
            <td>
              <span className="skeleton-block" style={{ width: "50%" }} />
            </td>
            <td>
              <span className="skeleton-block" style={{ width: "80px" }} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
