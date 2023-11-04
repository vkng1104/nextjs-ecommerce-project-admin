import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { format } from "date-fns";

import prisma_db from "@/lib/prismadb";
import { ProductClient } from "./components/client";
import { ProductColumn } from "./components/columns";
import { formatter } from "@/lib/utils";

interface ProductsPageProps {
  params: {
    storeId: string;
  };
}

const ProductsPage: React.FC<ProductsPageProps> = async ({ params }) => {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const products = await prisma_db.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      category: true,
      size: true,
      color: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    price: formatter.format(item.price.toNumber()),
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    category: item.category.name,
    size: item.size.name,
    color: item.color.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient data={formattedProducts} />
      </div>
    </div>
  );
};

export default ProductsPage;
