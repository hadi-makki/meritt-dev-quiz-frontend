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

  // Render pagination page numbers
  const renderPageNumbers = useCallback(() => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust if we don't have enough pages visible
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <Button
          key={i}
          onClick={() => handlePageChange(i)}
          variant={i === currentPage ? "secondary" : "outline"}
          className="mx-1"
        >
          {i}
        </Button>
      );
    }

    return pageNumbers;
  }, [currentPage, handlePageChange, totalPages]);

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
        {allProducts.map((item, index) => (
          <ProductItem key={index} product={item as Product} />
        ))}
      </div>
      {/* Pagination */}
      <div className="flex flex-col items-center mt-4 space-y-2">
        <div className="flex items-center space-x-2">
          {currentPage > 1 && (
            <Button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
          )}
          {renderPageNumbers()}
          {currentPage < totalPages && (
            <Button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          )}
        </div>
        <div className="text-sm text-gray-500">
          Page {currentPage} of {totalPages} | Total items: {allProductsLength}
        </div>
      </div>
    </div>
  );
}

export default Index;
