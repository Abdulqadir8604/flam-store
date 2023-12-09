"use client"

import {Color, Size} from "@/types";
import {useState} from "react";
import Button from "@/components/ui/button";
import {Plus, X} from "lucide-react";
import {Dialog} from "@headlessui/react";
import IconButton from "@/components/ui/icon-button";
import Filter from "@/app/(routes)/category/[categoryId]/components/filter";

interface MobileFiltersProps {
    sizes: Size[],
    colors: Color[]
}

const MobileFilters: React.FC<MobileFiltersProps> = (
    {
        sizes,
        colors
    }
) => {
    const [open, setOpen] = useState(false)

    const onOpen = () => setOpen(true)
    const onClose = () => setOpen(false)

    return (
        <>
            <Button onClick={onOpen} className={"flex items-center gap-x-2 lg:hidden"}>
                Filters
                <Plus size={20} />
            </Button>

            <Dialog open={open} as={"div"} onClose={onClose} className={"relative z-40 lg:hidden"}>
                <div className={"fixed inset-0 bg-black bg-opacity-25"} />
                <div className={"fixed inset-0 z-40 flex"}>
                    <Dialog.Panel className={"relative bg-gray-900 flex flex-col w-full max-w-sm p-4"}>
                        <div className={"flex items-center justify-end px-4"}>
                            <IconButton icon={<X size={15} />} onClick={onClose} />
                        </div>
                        <Dialog.Title className={"font-bold text-white text-4xl"}>
                            Filters
                        </Dialog.Title>
                        <hr className={"my-4"} />
                        <Filter
                            valueKey={"sizeId"}
                            name={"Sizes"}
                            data={sizes}
                        />
                        <Filter
                            valueKey={"colorId"}
                            name={"Colors"}
                            data={colors}
                        />
                    </Dialog.Panel>
                </div>
            </Dialog>
        </>
    );
}

export default MobileFilters