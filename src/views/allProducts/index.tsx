"use client";
import {
  ProductSearchFields,
  Sorting,
  useGetAllProductsQuery,
} from "@/graphql/generated/graphql";
import React from "react";

type Props = {};

function Index({}: Props) {
  const { data, loading, error } = useGetAllProductsQuery({
    variables: {
      limit: 30,
      page: 1,
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

  return <div className="py-4 px-2">index</div>;
}

export default Index;
