"use client";
import Loader from "@/components/ui/loader";
import { useGetSingleProductQuery } from "@/graphql/generated/graphql";
import { useParams, useRouter } from "next/navigation";
import ViewProduct from "./view-product";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";

type Props = {};

function Index({}: Props) {
  const { id } = useParams();
  const router = useRouter();

  const { data, error, loading } = useGetSingleProductQuery({
    variables: {
      id: id,
    },
  });

  const { product } = useMemo(() => {
    return {
      product: data?.getProduct?.item,
    };
  }, [data?.getProduct]);

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
  if (!product) {
    return (
      <div className="h-screen flex items-center justify-center">
        <h1>No product found</h1>
      </div>
    );
  }

  return (
    <div>
      <div className="text-2xl font-bold my-4">
        <Button
          onClick={() => {
            router.back();
          }}
        >
          Go Back
        </Button>
      </div>
      <ViewProduct product={product} />
    </div>
  );
}

export default Index;
