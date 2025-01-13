import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import prismadb from "@/lib/prismadb";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <div className='relative'>
      <div className='flex'>
        <div className='w-full ml-[240px] px-6 py-8 bg-neutral-50 min-h-[calc(100vh-64px)]'>
          {children}
        </div>
      </div>
    </div>
  );
}
