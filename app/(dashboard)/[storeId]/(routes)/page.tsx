import { CreditCard, Landmark, Package } from "lucide-react";

interface DashboardPageProps {
  params: {
    storeId: string;
  };
}

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>This is Dashboard Page</div>
    </div>
  );
};

export default DashboardPage;
