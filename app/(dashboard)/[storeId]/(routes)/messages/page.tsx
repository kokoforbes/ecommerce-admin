import { format } from "date-fns";
import prismadb from "@/lib/prismadb";
import { MessageClient } from "./components/client";

const MessagePage = async ({
  params,
}: {
  params: Promise<{ storeId: string }>;
}) => {
  const { storeId } = await params;

  const messages = await prismadb.message.findMany({
    where: {
      storeId: storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedMessages = messages.map((item) => ({
    id: item.id,
    name: item.name,
    content: item.content,
    isRead: item.isRead,
    email: item.email,
    subject: item.subject,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className='flex-col'>
      <div className='flex-1 p-8 pt-6 space-y-4'>
        <MessageClient data={formattedMessages} />
      </div>
    </div>
  );
};

export default MessagePage;
