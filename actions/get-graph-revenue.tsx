import prisma_db from "@/lib/prismadb";

interface GraphData {
  name: string;
  total: number;
}

export const getGraphRevenue = async (storeId: string) => {
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

  const monthlyRevenue: { [key: number]: number } = {};
  for (const order of orders) {
    const month = order.createdAt.getMonth();
    let revenue = 0;

    for (const item of order.orderedItems) {
      revenue += item.product.price.toNumber();
    }

    monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenue;
  }

  const graphData: GraphData[] = [
    {
      name: "Jan",
      total: 0,
    },
    {
      name: "Feb",
      total: 0,
    },
    {
      name: "Mar",
      total: 0,
    },
    {
      name: "Apr",
      total: 0,
    },
    {
      name: "May",
      total: 0,
    },
    {
      name: "Jun",
      total: 0,
    },
    {
      name: "Jul",
      total: 0,
    },
    {
      name: "Aug",
      total: 0,
    },
    {
      name: "Sep",
      total: 0,
    },
    {
      name: "Oct",
      total: 0,
    },
    {
      name: "Nov",
      total: 0,
    },
    {
      name: "Dec",
      total: 0,
    },
  ];

  for (const month in monthlyRevenue) {
    graphData[parseInt(month)].total = monthlyRevenue[parseInt(month)];
  }

  return graphData;
};
