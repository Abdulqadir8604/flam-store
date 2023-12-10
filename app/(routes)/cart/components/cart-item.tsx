// in CartItem component
import React from "react";
import {Product} from "@/types";
import Image from "next/image";
import IconButton from "@/components/ui/icon-button";
import {X} from "lucide-react";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";

interface CartItemProps {
    data: Product
}

const CartItem: React.FC<CartItemProps> = ({data}) => {
    const cart = useCart()

    const onRemove = () => {
        cart.removeItem(data.id)
    }

    const onQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newQuantity = Number(event.target.value);
        cart.updateQuantity(data.id, newQuantity < 1 ? 1 : newQuantity);
    };

    return (
        <li className={"flex py-6 border-b"}>
            <div className={"relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48"}>
                <Image
                    fill
                    src={data.images[0].url}
                    alt={data.name}
                    className={"object-cover object-center"}
                />
            </div>
            <div className={"relative ml-4 flex flex-1 flex-col justify-between sm:ml-6"}>
                <div className={"absolute z-10 right-0 top-0"}>
                    <IconButton
                        icon={<X size={15} />}
                        className={"absolute top-0 right-0 rounded-full bg-white p-2"}
                        onClick={onRemove}
                    />
                </div>
                <div className={"relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0"}>
                    <div className={"flex justify-between"}>
                        <p className={"text-lg font-semibold text-black"}>
                            {data.name}
                        </p>
                    </div>
                    <div className={"mt-1 flex text-sm"}>
                        <p className={"text-gray-500"}>{data.color.name}</p>
                        <p className={"text-gray-500 ml-4 border-l border-gray-200 pl-4"}>{data.size.name}</p>
                    </div>
                    <Currency value={data.price} />
                </div>
                <div className="flex items-center justify-between w-24">
                    <button
                        className="bg-gray-200 text-gray-600 h-6 w-6 rounded-full"
                        onClick={() => cart.updateQuantity(data.id, Math.max(1, Number(data.quantity) - 1))}
                    >
                        -
                    </button>
                    <input
                        min="1"
                        defaultValue={1}
                        pattern={"[1-9]*"}
                        disabled={true}
                        value={data.quantity}
                        onChange={onQuantityChange}
                        className="gap-4 m-2 rounded-lg border text-center w-8 text-lg appearance-none focus:decoration-0 focus:outline-none focus:ring-0"
                    />
                    <button
                        className="bg-gray-200 text-gray-600 h-6 w-6 rounded-full"
                        onClick={() => cart.updateQuantity(data.id, Number(data.quantity) + 1)}
                    >
                        +
                    </button>
                </div>
            </div>
        </li>
    )
}

export default CartItem