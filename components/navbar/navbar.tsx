import { UserButton, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import prisma_db from "@/lib/prismadb";

import { MainNav } from "@/components/navbar/main-nav";
import { StoreSwitcher } from "@/components/navbar/store-switcher";

const Navbar = async () => {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const stores = await prisma_db.store.findMany({
    where: {
      userId,
    },
  });
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={stores} />
        <MainNav />
        <div className="ml-auto flex items-center space-x-4">
          <UserButton afterSignOutUrl="/"></UserButton>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
