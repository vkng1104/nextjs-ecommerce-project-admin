import prisma_db from "@/lib/prismadb";

export const getTotalRevenue = async (storeId: string) => {
  const orders = await prisma_db.order.findMany({
    where: {
      storeId,
    },
    include: {
      orderedItems: {
        include: {
          product: true,
        },
      },
    },
  });

  const totalRevenue = orders.reduce((total, order) => {
    const orderTotal = order.orderedItems.reduce(
      (orderSum, item) => orderSum + item.product.price.toNumber(),
      0
    );
    return total + orderTotal;
  }, 0);

  return totalRevenue;
};
