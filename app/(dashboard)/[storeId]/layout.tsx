import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

import prisma_db from "@/lib/prismadb";
import Navbar from "@/components/navbar/navbar";

export default async function DashBoardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prisma_db.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  if (!store) {
    return redirect("/");
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
