import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Product } from "@/graphql/generated/graphql";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Autoplay from "embla-carousel-autoplay";

type Props = {
  product: Product;
};

function ProductItem({ product }: Props) {
  const plugin = React.useRef(Autoplay({ delay: 2000 }));
  return (
    <div className=" p-4 rounded-lg bg-zinc-100 w-full space-y-4">
      <div>
        <Carousel
          className="w-full "
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
                    className="w-52 object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* <CarouselPrevious /> */}
          {/* <CarouselNext /> */}
        </Carousel>
      </div>
      <div>
        <Link
          href={`/all-products/${product._id}`}
          className="text-xl text-neutral-600 font-semibold hover:text-sky-500 hover:underline transition-all duration-100 hover:cursor-pointer"
        >
          {product.title}
        </Link>
        <div className="">{product.description}</div>
        <p>
          stock: <span className="text-neutral-600">{product.quantity}</span>
        </p>
      </div>
    </div>
  );
}

export default ProductItem;
