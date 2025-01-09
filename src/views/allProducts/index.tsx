"use client";
import Loader from "@/components/ui/loader";
import {
  Product,
  ProductSearchFields,
  Sorting,
  useGetAllProductsQuery,
} from "@/graphql/generated/graphql";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import ProductItem from "./product-item";

type Props = {};

function Index({}: Props) {
  const params = useSearchParams();

  const page = params.get("page");
  const limit = params.get("limit");

  const { data, loading, error } = useGetAllProductsQuery({
    variables: {
      limit: limit ? limit : 30,
      page: page ? page : 1,
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

  const { allProducts, allProductsLength, totalPages } = useMemo(() => {
    return {
      allProducts: data?.getAllProduct.items,
      allProductsLength: data?.getAllProduct.length,
      totalPages: Math.ceil(+data?.getAllProduct?.length! / +limit!),
    };
  }, [data?.getAllProduct.items, data?.getAllProduct.length, limit]);

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
    <div className="py-4 px-2 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {allProducts?.map((item, index) => {
        return <ProductItem key={index} product={item as Product} />;
      })}
    </div>
  );
}

export default Index;
