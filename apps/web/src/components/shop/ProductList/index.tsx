import { Pagination, Skeleton } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import useSWR from "swr";
import { search } from "../../../lib/api/product";
import { ProductCard } from "../../product/ProductCard/ProductCard";

const DEFAULT_PAGESIZE = 8;
export default function ProductList({
  query,
  filter,
}: {
  query?: string;
  filter?: Record<string, string>;
}) {
  const router = useRouter();

  function fetcher() {
    return router.query ? `products-${JSON.stringify(router.query)}` : null;
  }

  const handlePageChange = useCallback(
    function handlePageChange(e: any, value: number) {
      router.push({
        pathname: router.pathname,
        query: { ...router.query, page: value },
      });
    },
    [router]
  );

  const { data: data } = useSWR(
    fetcher,
    () =>
      search(
        {
          pagination: {
            page: Number(router.query.page) - 1 || 0,
            pageSize: Number(router.query.pagesize) || DEFAULT_PAGESIZE,
          },
          filters: { active: true, ...filter },
        },
        query
      ),
    {}
  );

  // useEffect(() => {
  //   if (router.isReady && (!router.query.page || !router.query.pagesize)) {
  //     router.replace({
  //       pathname: router.pathname,
  //       query: { ...router.query, page: 0, pagesize: 8 },
  //     });
  //   }
  // }, [router]);

  return (
    <div className="bg-white rounded-xl">
      {query && (
        <Typography variant="h6" sx={{paddingTop:3}}>
          Search results for : <b id="search-query">{query}</b>
        </Typography>
      )}
      {filter &&
        Object.entries(filter).map(([k, v]) => (
          <Typography variant="h6" className="capitalize" sx={{paddingTop:3}}>
            {k}{" "}
            <Typography variant="body1" component="span" className="ml-3">
              <b>{v}</b>
            </Typography>
          </Typography>
        ))}
      <div className="mx-auto max-w-2xl py-8 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {!data
            ? Array.apply(null, Array(8)).map((_, i) => (
                <ProductCardSkelton key={i} />
              ))
            : data?.data?.data.map((product, i) => (
                <ProductCard product={product} key={i} />
              ))}
        </div>
      </div>
      <div className="mx-auto max-w-5xl my-4">
        <Pagination
          onChange={handlePageChange}
          page={Number(data?.data?.pagination?.page) + 1}
          count={
            data && data?.data?.pagination
              ? Math.ceil(
                  data?.data?.pagination?.count /
                    data?.data?.pagination?.pageSize
                )
              : 0
          }
        />
      </div>
    </div>
  );
}

function ProductCardSkelton(){
  return (
    <div className="w-full">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
        <Skeleton variant="rectangular" className="h-full" />
      </div>
      <Skeleton variant="rectangular" className="mt-4 w-8/12" height={20} />
      <Skeleton variant="rounded" className="mt-2" height={40} />
    </div>
  );
}