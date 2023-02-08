import Typography from "@mui/material/Typography";
import useSWR from "swr";
import { search } from "../../../lib/api/product";
import { ProductCard } from "../../product/ProductCard/ProductCard";

export default function ProductList({ query }: { query?: string }) {
  const { data: data, error } = useSWR(
    `products-${query}`,
    () =>
      search(
        { pagination: { page: 0, pageSize: 10 }, filters: { active: true } },
        query
      ),
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnMount: true,
    }
  );
  return (
    <div className="bg-white rounded-xl">
      {query && (
        <Typography variant="h6">
          Search results for : <b>{query}</b>
        </Typography>
      )}
      <div className="mx-auto max-w-2xl py-8 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {data?.data?.data.map((product, i) => (
            <ProductCard product={product} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
