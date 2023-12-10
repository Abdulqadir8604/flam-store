"use client"

import axios from "axios";
import Currency from "@/components/ui/currency";
import Button from "@/components/ui/button";
import useCart from "@/hooks/use-cart";
import {useSearchParams} from "next/navigation";
import {useEffect} from "react";
import {toast} from "react-hot-toast";

const Summary = () => {

    const items = useCart((state) => state.items)
    const removeAll = useCart((state) => state.removeAll)
    const searchParams = useSearchParams()

    useEffect(() => {
        if (searchParams.has("success")) {
            toast.success("Your order has been placed successfully")
            removeAll()
        }

        if (searchParams.has("canceled")) {
            toast.error("Something went wrong. Please try again later.")
        }

    }, [removeAll, searchParams])

    const totalPrice = items.reduce((total, item) => {
        return total + Number(item.price) * Number(item.quantity);
    }, 0);

    const onCheckout = async () => {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
            productIds: items.map((item) => item.id)
        })

        window.location = response.data.url
    }


    return (
        <div className="
        mt-16
        rounded-lg
        bg-gray-50
        px-4
        py-6
        sm:p-6
        lg:col-span-5
        lg:mt-0
        lg-p-0
        ">
            <h2 className={"text-lg font-medium text-gray-900"}>
                Order Summary
            </h2>
            <div className={"mt-6 space-y-4"}>
                <div className={"flex items-center justify-between border-t border-gray-200 pt-4"}>
                    <div className={"text-base font-medium text-gray-900"}>
                        Order Total
                    </div>
                    <Currency value={totalPrice} />
                </div>
            </div>
            <Button
                className={"mt-6 w-full"}
                onClick={() => onCheckout}
            >
                Checkout
            </Button>
        </div>
    )
}

export default Summary