"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import axios from "axios";
import useStoreSwitcher from "@/hooks/use-store-switcher";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import { Plus } from "lucide-react";

import { formatter } from "@/lib/utils";

import { StockColumn, columns } from "./components/columns";
import { DataTable } from "@/components/ui/data-table";

export default function StocksPage() {
  const { storeData } = useStoreSwitcher();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [stocks, setStocks] = useState<StockColumn[]>([]);

  useEffect(() => {
    getStocks();
  }, []);

  const getStocks = () => {
    setLoading(true);
    const accessToken = localStorage.getItem("apiToken");

    axios
      .get("http://localhost:8080/drug", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setStocks(res.data.data);
      })
      .catch((error: any) => {
        const unknownError = "Something went wrong, please try again.";
        throw new Error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const filterDataByStore = () => {
    if (storeData?.name === "All Stores") {
      return stocks;
    }
    return stocks.filter((item) => item.store === storeData?.name);
  };

  const formattedStocks: StockColumn[] = filterDataByStore().map((item) => ({
    id: item.id,
    drugName: item.drugName,
    expiry_date: item.expiry_date,
    price: formatter.format(item.price),
    availability: item.availability,
    available_stock: item.available_stock,
    customer_condition: item.customer_condition,
    drug_code: item.drug_code,
    id_check: item.id_check,
    postcode: item.postcode,
    sales: item.sales,
    store: item.store,
  }));

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6 pb-32'>
        <div className='flex items-center justify-between'>
          <Heading title={`Stocks`} description='' />

          <Button onClick={() => router.push(`/admin/stock/new`)}>
            <Plus className='mr-2 h-4 w-4' /> Add New
          </Button>
        </div>

        <Separator />

        <DataTable
          searchKey='drugName'
          columns={columns}
          data={formattedStocks}
        />
      </div>
    </div>
  );
}
