import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";
import { Menu } from "lucide-react";
import { MainNav } from "@/components/main-nav";
import StoreSwitcher from "@/components/store-switcher";

const Navbar = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const stores = await prismadb.store.findMany({
    where: {
      userId,
    },
  });

  return (
    <div className='border-b h-[64px] dark:border-neutral-800 bg-white sticky top-0 z-30'>
      <div className='flex h-16 items-center px-4'>
        <Menu className='w-4 h-4 cursor-pointer mr-4' />
        <MainNav className='mx-6' />
        <StoreSwitcher items={stores} />
        <div className='ml-auto flex items-center space-x-4'>
          <UserButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
