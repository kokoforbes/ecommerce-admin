"use client";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ApiList } from "@/components/ui/api-list";
import MessageCard from "./message-card";

const messages = [
  {
    id: 1,
    from: "customer@example.com",
    subject: "Return Request",
    content: "I would like to return my recent purchase.",
    date: "2023-05-15",
    status: "Unread",
  },

  {
    id: 2,
    from: "customer@example.com",
    subject: "Return Request",
    content: "I would like to return my recent purchase.",
    date: "2023-05-15",
    status: "Unread",
  },
  {
    id: 3,
    from: "customer@example.com",
    subject: "Return Request",
    content: "I would like to return my recent purchase.",
    date: "2023-05-15",
    status: "Unread",
  },
  {
    id: 4,
    from: "customer@example.com",
    subject: "Return Request",
    content: "I would like to return my recent purchase.",
    date: "2023-05-15",
    status: "Unread",
  },
  {
    id: 5,
    from: "customer@example.com",
    subject: "Return Request",
    content: "I would like to return my recent purchase.",
    date: "2023-05-15",
    status: "Unread",
  },
];

interface SizeClientProps {
  data: [];
}

export const SizeClient: React.FC<SizeClientProps> = ({ data }) => {
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
        {messages.map((message) => (
          <MessageCard key={message.id} data={message} />
        ))}
      </div>
      <Heading title='API' description='API calls for Messages' />
      <Separator />
      <ApiList entityName='messages' entityIdName='messageId' />
    </>
  );
};
