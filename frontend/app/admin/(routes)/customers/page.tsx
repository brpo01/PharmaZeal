"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { CustomerColumn, columns } from "./components/columns";
import { DataTable } from "@/components/ui/data-table";

export default async function CustomersPage() {
  const params = useParams();
  const router = useRouter();

  const data = [
    {
      name: "abdullahi",
      address: "86 seaford street",
      age: 28,
      dob: "12/12/2020",
    },
    {
      name: "koko",
      address: "86 seaford street",
      age: 28,
      dob: "12/12/2020",
    },
    {
      name: "forbes",
      address: "86 seaford street",
      age: 28,
      dob: "12/12/2020",
    },
  ];

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6 pb-24'>
        <div className='flex items-center justify-between'>
          <Heading
            title={`Customers`}
            description='Manage customers for your store'
          />
          <Button onClick={() => router.push(`/medicine/new`)}>
            <Plus className='mr-2 h-4 w-4' /> Add New
          </Button>
        </div>

        <Separator />

        <DataTable searchKey='name' columns={columns} data={data} />
      </div>
    </div>
  );
}