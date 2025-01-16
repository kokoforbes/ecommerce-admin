import prismadb from "@/lib/prismadb";
import { MessageForm } from "./components/message-form";

const SizePage = async ({
  params,
}: {
  params: Promise<{ sizeId: string }>;
}) => {
  const { sizeId } = await params;
  const size = await prismadb.size.findUnique({
    where: {
      id: sizeId,
    },
  });

  return (
    <div className='flex-col'>
      <div className='flex-1 p-8 pt-6 space-y-4'>
        <MessageForm initialData={size} />
      </div>
    </div>
  );
};

export default SizePage;
