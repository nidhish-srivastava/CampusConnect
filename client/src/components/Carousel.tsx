"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Autoplay from "embla-carousel-autoplay" 
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"

export function CarouselComponent() {
    const imagesArr = ['college1.jpg','college2.jpg','college3.jpg','college4.jpg']
    return (
      <Carousel
      plugins={[
        Autoplay({
          delay: 4000,
        }),
      ]}
      // className="w-4/5 mx-auto"
      >
        <CarouselContent className="h-[460px]">
          {imagesArr.map((image, index) => (
            <CarouselItem key={index}>
              <div className="p-1 h-full">
                <Card className="h-full rounded-3xl overflow-hidden">
                  <CardContent className="flex flex-col items-center relative h-full justify-end p-6">
                    <img loading="lazy" src={`/${image}`} className="absolute inset-0 w-full h-full object-cover z-0" alt=""/>
                    {/* <div className="z-10 text-white justify-end w-full h-[150px] flex flex-col gap-3"> */}
                      {/* <div className="text-5xl font-lilita">LELEKART WINTER COLLECTION</div> */}
                      {/* <div className="flex justify-between w-full items-end"> */}
                        {/* <div className="w-[60%] font-urbanist">Find out our best winter collection. Offering quality products at an affordable price</div> */}
                        {/* <Button className="bg-white px-10 hover:bg-black hover:text-white text-black rounded-full">Buy Now</Button> */}
                      {/* </div> */}
                    {/* </div> */}
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    )
}
