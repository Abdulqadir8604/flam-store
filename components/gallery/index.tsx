"use client";

import {Image as ImageType} from "@/types";
import Image from "next/image";
import {Tab} from "@headlessui/react";
import React, {useEffect, useState} from "react";
import GalleryTab from "@/components/gallery/gallery-tab";

interface GalleryProps {
    images: ImageType[]
}

const Gallery: React.FC<GalleryProps> = ({images}) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [images]);

    return (
        <Tab.Group as={"div"} className={"flex flex-col-reverse"}>
            <div className={"mx-auto mt-6 w-full max-w-2xl lg:max-w-none"}>
                <Tab.List className={"grid grid-cols-4 gap-6"}>
                    {images.map((image, index) => (
                        <GalleryTab key={image.id} image={image} active={index === currentImageIndex}
                                    onClick={() => setCurrentImageIndex(index)} />
                    ))}
                </Tab.List>
            </div>
            <div className={"aspect-square w-full"}>
                {images.map((image, index) => (
                    <div key={image.id}
                         className={`aspect-square transition duration-500 ${index !== currentImageIndex ? 'hidden' : 'block'}`}>
                        <div className={"aspect-square relative h-full w-full sm:rounded-lg overflow-hidden"}>
                            <Image
                                src={image.url}
                                alt={""}
                                fill
                                className={"aspect-square rounded-xl object-center"}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </Tab.Group>
    );
};

export default Gallery;