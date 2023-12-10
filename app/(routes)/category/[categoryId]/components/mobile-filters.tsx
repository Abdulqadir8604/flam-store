"use client";

import {useState} from "react";
import {Plus} from "lucide-react";
import Button from "@/components/ui/button";
import {Color, Size} from "@/types";
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger,} from "@/components/ui/sheet"

import Filter from "./filter";

interface MobileFiltersProps {
  sizes: Size[],
  colors: Color[],
}

const MobileFilters: React.FC<MobileFiltersProps> = ({
                                                       sizes,
                                                       colors
                                                     }) => {
  const [open, setOpen] = useState(false);

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  return (
      <>
        <Sheet>
          <SheetTrigger>
            <Button
                onClick={onOpen}
                className="flex items-center gap-x-2 lg:hidden hover:text-white"
            >
              Filters
              <Plus size={20} />
            </Button>
          </SheetTrigger>
          <SheetContent className={"bg-gray-900"}>
            <SheetHeader>
              <SheetTitle className={"text-white"}>Filters</SheetTitle>
              <SheetDescription>
                <div className="p-4 text-white">
                  <Filter
                      valueKey="sizeId"
                      name="Sizes"
                      data={sizes}
                  />
                  <Filter
                      valueKey="colorId"
                      name="Colors"
                      data={colors}
                  />
                </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>

      </>
  );
};

export default MobileFilters;