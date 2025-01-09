import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Product } from "@/graphql/generated/graphql";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import React from "react";

type Props = {
  product: Product;
};

function ViewProduct({ product }: Props) {
  const plugin = React.useRef(Autoplay({ delay: 2000 }));
  return (
    <div>
      <Carousel
        className=""
        opts={{
          loop: true,
        }}
        plugins={[plugin.current]}
      >
        <CarouselContent>
          {product.images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="w-full flex justify-center">
                <Image
                  src={image}
                  alt={product.title}
                  width={500}
                  height={500}
                  className="w-96 object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="p-4 rounded-lg  w-full space-y-4">
        <div className="flex items-center gap-8">
          <p>
            created at:{" "}
            <span className="text-neutral-600">
              {new Date(product.createdAt).toLocaleString()}
            </span>
          </p>
          <p>
            updated at:{" "}
            <span className="text-neutral-600">
              {new Date(product.updatedAt).toLocaleString()}
            </span>
          </p>
        </div>
        <div>
          <h1 className="text-5xl text-neutral-700 font-semibold mb-4">
            {product.title}
          </h1>
          <p className="text-lg mb-8">{product.description}</p>
          <p className="text-lg">
            stock: <span className="text-neutral-600">{product.quantity}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ViewProduct;
