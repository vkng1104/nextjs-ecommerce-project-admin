import { UserButton, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import prisma_db from "@/lib/prismadb";

import { MainNav } from "@/components/navbar/main-nav";
import { StoreSwitcher } from "@/components/navbar/store-switcher";
import { ModeToggle } from "../mode-toggle";

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
        <StoreSwitcher items={stores} className="me-4" />
        <MainNav />
        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />
          <UserButton afterSignOutUrl="/"></UserButton>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
