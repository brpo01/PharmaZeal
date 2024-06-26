"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import html2pdf from "html2pdf.js";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { formatter, formatDate } from "@/lib/utils";

import { SaleColumn, columns } from "./components/columns";
import { DataTable } from "@/components/ui/data-table";
import useUserStore from "@/hooks/user-store";

export default function SalesPage() {
  const { userData } = useUserStore();
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [sales, setSales] = useState<SaleColumn[]>([]);
  const salesRef = useRef<HTMLInputElement>(null);

  const filteredSales = sales.filter((sale) => {
    return sale.name === userData?.store?.name;
  });

  const formattedSales: SaleColumn[] = filteredSales.map((item) => ({
    id: item.id,
    date_of_sale: formatDate(item.date_of_sale),
    quantity: item.quantity,
    drugName: item.drugName,
    firstname: item.firstname,
    full_name: item.full_name,
    name: item.name,
    total_price: formatter.format(item.total_price),
    status: "Paid",
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
        setSales(res.data.data);
      })
      .catch((error: any) => {
        const unknownError = "Something went wrong, please try again.";
        throw new Error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleExportPdf = () => {
    const element = salesRef.current;
    html2pdf().from(element).save();
  };

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6 pb-32'>
        <div className='flex items-center justify-between'>
          <Heading title={`Sales`} description='' />
          <Button onClick={() => router.push(`/employee/sales/new`)}>
            <Plus className='mr-2 h-4 w-4' /> Add New
          </Button>
        </div>

        <Separator />

        <div ref={salesRef}>
          <DataTable
            searchKey='full_name'
            columns={columns}
            data={formattedSales}
          />
        </div>

        {filteredSales.length ? (
          <div className='flex'>
            <Button onClick={handleExportPdf}>Download Sales</Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
