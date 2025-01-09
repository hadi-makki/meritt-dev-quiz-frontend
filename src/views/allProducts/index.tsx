"use client";
import Loader from "@/components/ui/loader";
import {
  ProductSearchFields,
  Sorting,
  useGetAllProductsQuery,
} from "@/graphql/generated/graphql";
import Image from "next/image";
import React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";

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

  if (data?.getAllProduct.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center">
        <h1>No Products Found</h1>
      </div>
    );
  }
  return (
    <div className="py-4 px-2 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {data?.getAllProduct.items?.map((item, index) => {
        return (
          <div
            key={index}
            className=" p-4 rounded-lg bg-zinc-100 w-full space-y-4"
          >
            <div>
              <Carousel className="w-full ">
                <CarouselContent>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem key={index}>
                      <Image
                        src={"/error-loading-image.png"}
                        alt={item.title}
                        width={500}
                        height={500}
                        className="w-full"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {/* <CarouselPrevious /> */}
                {/* <CarouselNext /> */}
              </Carousel>
            </div>
            <Link
              href={`/product/${item._id}`}
              className="text-xl text-neutral-600 font-semibold hover:text-sky-500 hover:underline transition-all duration-100"
            >
              {item.title}
            </Link>
            <div className="">{item.description}</div>
          </div>
        );
      })}
    </div>
  );
}

export default Index;
