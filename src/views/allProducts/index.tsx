"use client";
import Loader from "@/components/ui/loader";
import {
  Product,
  ProductSearchFields,
  Sorting,
  useGetAllProductsQuery,
} from "@/graphql/generated/graphql";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import ProductItem from "./product-item";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Pagination from "@/components/ui/pagination";

type Props = {};

function Index({}: Props) {
  const params = useSearchParams();
  const router = useRouter();

  // Get and parse query parameters
  const pageParam = params.get("page");
  const limitParam = params.get("limit");

  const currentPage = pageParam ? parseInt(pageParam, 10) : 1;
  const limit = limitParam ? parseInt(limitParam, 10) : 30;

  const handlePageChange = useCallback(
    (newPage: number) => {
      router.push(`/all-contacts?page=${newPage}&limit=${limit}`);
    },
    [limit, router]
  );

  const { data, loading, error } = useGetAllProductsQuery({
    variables: {
      page: currentPage,
      limit: limit,
      searchFields: {
        fields: [ProductSearchFields.Title],
        q: "",
      },
      sort: {
        field: ProductSearchFields.Title,
        order: Sorting.Asc,
      },
    },
  });

  // Memoize derived data
  const { allProducts, allProductsLength, totalPages } = useMemo(() => {
    const totalItems = data?.getAllProduct?.length ?? 0;
    return {
      allProducts: data?.getAllProduct?.items || [],
      allProductsLength: totalItems,
      totalPages: Math.ceil(totalItems / limit),
    };
  }, [data?.getAllProduct, limit]);

  if (loading) {
    return (
      <div className="h-screen">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center">
        <h1>Error Getting Products</h1>
      </div>
    );
  }

  if (allProductsLength === 0) {
    return (
      <div className="h-screen flex items-center justify-center">
        <h1>No Products Found</h1>
      </div>
    );
  }

  return (
    <div>
      <div className="text-2xl font-bold my-4">
        <Button asChild>
          <Link href={"/"}>Go Back</Link>
        </Button>
      </div>
      <div className="py-4 px-2 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[...allProducts, ...allProducts].map((item, index) => (
          <ProductItem key={index} product={item as Product} />
        ))}
      </div>
      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        totalItems={allProductsLength}
      />
    </div>
  );
}

export default Index;
