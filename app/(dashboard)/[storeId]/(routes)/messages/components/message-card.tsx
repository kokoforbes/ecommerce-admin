import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

interface MessageProps {
  id: number;
  from: string;
  subject: string;
  content: string;
  date: string;
  status: string;
}

interface MessageCard {
  data: MessageProps;
}

const MessageCard: React.FC<MessageCard> = ({ data }) => {
  return (
    <div onClick={() => {}} className='p-3 space-y-4'>
      <Card>
        <CardHeader></CardHeader>
        <CardContent className='grid gap-4'>
          <div className='flex justify-between items-center mb-2'>
            <h3 className='font-bold'>{data.subject}</h3>
            <span
              className={`px-2 py-1 rounded text-sm ${
                data.status === "Unread"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {data.status}
            </span>
          </div>
          <p className='text-sm text-gray-600 mb-2'>From: {data.from}</p>
          <p className='text-sm text-gray-600 mb-2'>Date: {data.date}</p>
          <p className='mt-2'>{data.content}</p>
        </CardContent>
        <CardFooter>
          <div className='mt-4 space-x-2'>
            <Button variant='outline' size='sm'>
              Reply
            </Button>
            <Button variant='outline' size='sm'>
              Mark as {data.status === "Unread" ? "Read" : "Unread"}
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
