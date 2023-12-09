import Container from "@/components/ui/container";
import Billboard from "@/components/billboard";
import getBillboards from "@/actions/get-billboards";
import getProducts from "@/actions/get-products";
import ProductList from "@/components/product-list";

const HomePage = async () => {
    const billboards = await getBillboards("b900359f-b32f-4bda-bc11-e55769148c15");
    const products = await getProducts({isFeatured: true});
    return (
        <div>
            <Container>
                <div className={"space-y-10 pb-10"}>
                    <Billboard data={billboards} />
                    <div className={"flex-flex-col gap-y-8 px-4 sm:px-6 lg:px-8"}>
                        <ProductList title={"Featured Products"} products={products} />
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default HomePage