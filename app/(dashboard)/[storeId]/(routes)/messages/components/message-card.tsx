import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import axios from "axios";

import { useParams, useRouter } from "next/navigation";

interface MessageProps {
  id: string;
  name: string;
  subject: string;
  content: string;
  email: string;
  createdAt: string;
  isRead: boolean;
}

interface MessageCard {
  data: MessageProps;
}

const MessageCard: React.FC<MessageCard> = ({ data }) => {
  const params = useParams();
  const router = useRouter();

  const updateStatus = async () => {
    const status = {
      ...data,
      isRead: !data.isRead,
    };

    // Update message status
    await axios
      .patch(`/api/${params.storeId}/messages/${data.id}`, status)
      .then((res) => {
        if (res.status === 200) router.refresh();
      });
  };

  return (
    <div className='p-3 space-y-4'>
      <Card>
        <CardHeader></CardHeader>
        <CardContent className='grid gap-4'>
          <div className='flex justify-between items-center mb-2'>
            <h3 className='font-bold capitalize'>{data.subject}</h3>
            <span
              className={`px-2 py-1 rounded text-sm ${
                data.isRead
                  ? "bg-gray-100 text-gray-800"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              {data.isRead ? "Read" : "Unread"}
            </span>
          </div>
          <p className='text-sm text-gray-600 mb-2'>From: {data.name}</p>
          <p className='text-sm text-gray-600 mb-2'>Email: {data.email}</p>
          <p className='text-sm text-gray-600 mb-2'>Date: {data.createdAt}</p>
          <p className='mt-2'>{data.content}</p>
        </CardContent>
        <CardFooter>
          <div className='mt-4 space-x-2'>
            <Button variant='outline' size='sm'>
              Reply
            </Button>
            <Button variant='outline' size='sm' onClick={updateStatus}>
              Mark as {data.isRead ? "Unread" : "Read"}
            </Button>
            <Button variant='outline' size='sm'>
              Delete
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MessageCard;
