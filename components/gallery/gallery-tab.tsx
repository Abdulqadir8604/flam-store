import Image from "next/image"
import {Tab} from "@headlessui/react"
import {Image as ImageType} from "@/types"
import {cn} from "@/lib/utils";

interface GalleryTabProps {
    image: ImageType,
    active: boolean,
    onClick: () => void
}

const GalleryTab: React.FC<GalleryTabProps> = (
    {
        image,
        active,
        onClick
    }
) => {
    return (
        <Tab as={"div"}
             className={"relative flex aspect-square cursor-pointer items-center justify-center rounded-md bg-white"}
             onClick={onClick}>
            <div>
                <span className={"absolute h-full w-full aspect-square inset-0 overflow-hidden rounded-md"}>
                    <Image
                        src={image.url}
                        alt={""}
                        layout={"fill"}
                        objectFit={"cover"}
                        className={"aspect-square object-cover object-center"}
                    />
                </span>
                <span className={cn(
                    "absolute inset-0 rounded-md ring-2 ring-offset-2",
                    active ? "ring-gray-900" : "ring-transparent"
                )} />
            </div>
        </Tab>
    )
}

export default GalleryTab