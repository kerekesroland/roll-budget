import DataTable, { Status, columns } from "@/components/CustomDataTable";
import InviteForm from "@/components/InviteForm";
import Image from "next/image";

async function getData(): Promise<Status[]> {
  // Fetch data from your API here.
  return [
    {
      email: "valaki@gmail.com",
      id: "32123asdadsads",
      status: "accepted",
    },
    {
      email: "rolca@gmail.com",
      id: "32sds123asdadsads",
      status: "pending",
    },
    {
      email: "sthsdd@gmail.com",
      id: "zzxxx",
      status: "accepted",
    },
    {
      email: "martino@gmail.com",
      id: "22212zzz",
      status: "pending",
    },
    {
      email: "hollokutya@gmail.com",
      id: "321xxxzx23asdadsads",
      status: "accepted",
    },
    {
      email: "menomano@gmail.com",
      id: "32123asdadsads",
      status: "accepted",
    },
  ];
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
