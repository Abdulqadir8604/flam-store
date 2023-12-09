"use client"

import {Product} from "@/types";
import Image from "next/image";
import IconButton from "@/components/ui/icon-button";
import {Expand, ShoppingCart} from "lucide-react";
import Currency from "@/components/ui/currency";
import {useRouter} from "next/navigation";
import {MouseEventHandler} from "react";
import usePreviewModal from "@/hooks/use-preview-modal";
import UseCart from "@/hooks/use-cart";

interface ProductCardProps {
    data: Product
}

const ProductCard: React.FC<ProductCardProps> = (
    {
        data
    }
) => {
    const previewModal = usePreviewModal()
    const cart = UseCart()
    const router = useRouter()
    const handleClick = () => {
        router.push(`/product/${data?.id}`)
    }

    const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation()
        previewModal.onOpen(data)
    }

    const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation()
        cart.addItem(data)
    }

    return (
        <div onClick={handleClick} className={"bg-white group cursor-pointer rounded-xl border p-3 space-y-4"}>
            <div className={"aspect-square rounded-xl bg-gray-100 relative"}>
                <Image
                    src={data?.images?.[0]?.url}
                    alt={"Image of " + data?.name}
                    fill
                    className={"aspect-square object-cover rounded-md"}
                />
                <div className={"opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5"}>
                    <div className={"flex gap-x-6 justify-center"}>
                        <IconButton icon={<Expand size={20} className={"text-gray-600"} />} onClick={onPreview} />
                        <IconButton icon={<ShoppingCart size={20} className={"text-gray-600"} />}
                                    onClick={onAddToCart} />
                    </div>
                </div>
            </div>
            <div className={"flex flex-col gap-y-2"}>
                <p className={"font-semibold text-lg"}>{data?.name}</p>
                <p className={"text-gray-600 text-sm"}>{data?.category?.name}</p>
            </div>
            <div className={"flex items-center justify-between"}>
                <Currency value={data?.price} />
            </div>

        </div>
    )
}
export default ProductCard
