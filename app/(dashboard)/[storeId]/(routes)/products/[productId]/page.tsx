import prisma_db from "@/lib/prismadb";

import { ProductForm } from "./components/product-form";

const ProductPage = async ({
  params,
}: {
  params: { storeId: string; productId: string };
}) => {
  const product = await prisma_db.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      images: true,
    },
  });

  const categories = await prisma_db.category.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const sizes = await prisma_db.size.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  const colors = await prisma_db.color.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm
          initialData={product}
          categories={categories}
          sizes={sizes}
          colors={colors}
        />
      </div>
    </div>
  );
};

export default ProductPage;
