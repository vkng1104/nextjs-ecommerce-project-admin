import prisma_db from "@/lib/prismadb";

export const getSalesCount = async (storeId: string) => {
  const salesCount = await prisma_db.order.count({
    where: {
      storeId,
    },
  });

  return salesCount;
};
