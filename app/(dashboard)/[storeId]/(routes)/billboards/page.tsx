import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import prisma_db from "@/lib/prismadb";
import { BillboardClient } from "./components/client";

interface BillboardsPageProps {
  params: {
    storeId: string;
  };
}

const BillboardsPage: React.FC<BillboardsPageProps> = async ({ params }) => {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const billboards = await prisma_db.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={billboards} />
      </div>
    </div>
  );
};

export default BillboardsPage;
