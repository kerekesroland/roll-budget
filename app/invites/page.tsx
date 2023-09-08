import DataTable, { Status } from '@/components/CustomDataTable';
import InviteForm from '@/components/InviteForm';
import { prisma } from '@/lib/prisma';

async function getData(): Promise<Status[]> {
  // Fetch data from your API here.
  "use server";
  const tokens = await prisma.activateToken.findMany();

  return tokens?.map((token) => {
    return {
      id: token?.id,
      email: token?.email,
      status: token?.userId ? "accepted" : "pending",
    };
  });
}

const Invites = async () => {
  const data = await getData();

  return (
    <div className="min-h-screen overflow-hidden p-[1.5rem] xs:p-12 md:py-8 lg:py-12 w-full md:w-[calc(100%-300px)]">
      <InviteForm />
      <DataTable data={data} />
    </div>
  );
};

export default Invites;
