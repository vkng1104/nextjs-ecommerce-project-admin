import prisma_db from "@/lib/prismadb";

export const getProductsCount = async (storeId: string) => {
  const productsCount = await prisma_db.product.count({
    where: {
      storeId,
    },
  });

  return productsCount;
};
