"use client"

import {formatter} from "@/lib/utils";
import React from "react";

const Currency = (
    {
        value
    }: {
        value: string | number
    }
) => {
    const [isMounted, setIsMounted] = React.useState(false)
    React.useEffect(() => {
        setIsMounted(true)
    }, [])
    return (
        <div className={"text-xl font-semibold"}>
            {formatter.format(Number(value))}
        </div>
    )
}

export default Currency