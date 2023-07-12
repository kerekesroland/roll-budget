import DataTable, { Status, columns } from "@/components/CustomDataTable";
import React from "react";

type Props = {};

async function getData(): Promise<Status[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ];
}

const Invites = async (props: Props) => {
  const data = await getData();

  return (
    <div className="min-h-screen overflow-hidden p-[1.5rem] xs:p-12 md:py-8 lg:py-12 w-full md:w-[calc(100%-300px)]">
      <DataTable />
    </div>
  );
};

export default Invites;
