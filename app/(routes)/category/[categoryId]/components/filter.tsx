"use client"

import {Color, Size} from "@/types";
import {useRouter, useSearchParams} from "next/navigation";
import qs from "query-string";
import Button from "@/components/ui/button";
import {cn} from "@/lib/utils";

interface FilterProps {
    data: (Size | Color)[],
    name: string,
    valueKey: string
}

const Filter: React.FC<FilterProps> = (
    {
        data,
        name,
        valueKey
    }
) => {

    const searchParams = useSearchParams()
    const router = useRouter()

    const selectedValue = searchParams.get(valueKey)

    const onClick = (id: string) => {
        const current = qs.parse(searchParams.toString())

        const query = {
            ...current,
            [valueKey]: id
        }

        if (current[valueKey] === id) {
            query[valueKey] = null
        }

        const url = qs.stringifyUrl({
            url: window.location.href,
            query
        }, {skipNull: true})

        router.push(url)
    }

    return (
        <div className={"mb-8"}>
            <h3 className={"text-lg font-semibold text-white"}>
                {name}
            </h3>
            <br />
            <div className={"flex flex-wrap gap-2"}>
                {
                    data.map((item) => (
                        <Button
                            key={item.id}
                            onClick={() => onClick(item.id)}
                            className={cn(
                                "rounded-md text-sm p-2 bg-gray-900 border border-gray-300 gap-x-2 text-black",
                                selectedValue === item.id && "bg-gray-700 border-gray-400 text-white"
                            )}
                        >
                            {item.name}
                            {
                                valueKey === "colorId" && (
                                    <div className={"h-4 w-4 rounded-full border border-gray-600"}
                                         style={{backgroundColor: item.value}}>
                                    </div>
                                )
                            }
                        </Button>
                    ))
                }
            </div>
        </div>
    )
}

export default Filter