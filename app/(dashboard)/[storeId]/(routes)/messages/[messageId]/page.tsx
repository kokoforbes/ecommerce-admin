import prismadb from "@/lib/prismadb";
import { MessageForm } from "./components/message-form";

const MessagePage = async ({
  params,
}: {
  params: Promise<{ messageId: string }>;
}) => {
  const { messageId } = await params;
  const message = await prismadb.message.findUnique({
    where: {
      id: messageId,
    },
  });

  return (
    <div className='flex-col'>
      <div className='flex-1 p-8 pt-6 space-y-4'>
        <MessageForm initialData={message} />
      </div>
    </div>
  );
};

export default MessagePage;
