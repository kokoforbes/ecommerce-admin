"use client";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ApiList } from "@/components/ui/api-list";
import MessageCard from "./message-card";

interface MessageProps {
  id: string;
  name: string;
  subject: string;
  content: string;
  email: string;
  createdAt: string;
  isRead: boolean;
}
interface MessageClientProps {
  data: MessageProps[];
}

export const MessageClient: React.FC<MessageClientProps> = ({ data }) => {
  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={`Messages (${data?.length})`}
          description='Manage messages for your store'
        />
      </div>
      <Separator />
      <div className='flex gap-4 flex-wrap'>
        {data.map((message) => (
          <MessageCard key={message.id} data={message} />
        ))}
      </div>
      <Heading title='API' description='API calls for Messages' />
      <Separator />
      <ApiList entityName='messages' entityIdName='messageId' />
    </>
  );
};
