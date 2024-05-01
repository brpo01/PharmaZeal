"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { formatter } from "@/lib/utils";

import { SaleColumn, columns } from "./components/columns";
import { DataTable } from "@/components/ui/data-table";

export default function SalesPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  // const [sales, setSales] = useState<DrugColumn[]>([]);

  const sales = [
    {
      id: "tututiti",
      name: "praise bola",
      drug: "paracetamol",
      quantity: 2,
      price: 5,
      date_of_sale: "12/06/2024",
    },
    {
      id: "tututitierr",
      name: "gourav",
      drug: "paracetamol",
      quantity: 1,
      price: 5,
      date_of_sale: "12/06/2024",
    },
    {
      id: "tututiti45",
      name: "sayyed",
      drug: "panadol",
      quantity: 5,
      price: 56,
      date_of_sale: "12/07/2024",
    },
  ];

  const formattedSales: SaleColumn[] = sales.map((item) => ({
    id: item.id,
    name: item.name,
    drug: item.drug,
    quantity: item.quantity,
    date_of_sale: item.date_of_sale,
    price: formatter.format(item.price),
    // createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  useEffect(() => {
    getSales();
  }, []);

  const getSales = () => {
    setLoading(true);
    const accessToken = localStorage.getItem("apiToken");

    axios
      .get("http://localhost:8080/sale", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log(res.data.data);
      })
      .catch((error: any) => {
        const unknownError = "Something went wrong, please try again.";
        throw new Error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <div className='flex items-center justify-between'>
          <Heading title={`Sales`} description='' />
          <Button onClick={() => router.push(`/employee/sales/new`)}>
            <Plus className='mr-2 h-4 w-4' /> Add New
          </Button>
        </div>

        <Separator />

        <DataTable searchKey='name' columns={columns} data={formattedSales} />
      </div>
    </div>
  );
}
