"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import axios from "axios";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { formatter } from "@/lib/utils";
import useUserStore from "@/hooks/user-store";

import { DrugColumn, columns } from "./components/columns";
import { DataTable } from "@/components/ui/data-table";

export default function SalesPage() {
  const { userData } = useUserStore();
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [drugs, setDrugs] = useState<DrugColumn[]>([]);

  const filteredDrugs = drugs.filter((drug) => {
    return drug.store === userData?.store?.name;
  });

  const formattedDrugs: DrugColumn[] = filteredDrugs.map((item) => ({
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

  useEffect(() => {
    getDrugs();
  }, []);

  const getDrugs = () => {
    setLoading(true);
    const accessToken = localStorage.getItem("apiToken");

    axios
      .get("http://localhost:8080/drug", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setDrugs(res.data.data);
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
      <div className='flex-1 space-y-4 p-8 pt-6 pb-24'>
        <div className='flex items-center justify-between'>
          <Heading title={`Drugs`} description='' />
        </div>

        <Separator />

        <DataTable
          searchKey='drugName'
          columns={columns}
          data={formattedDrugs}
        />
      </div>
    </div>
  );
}
