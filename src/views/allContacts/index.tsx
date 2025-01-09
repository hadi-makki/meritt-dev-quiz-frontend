"use client";
import {
  ContactUs,
  ContactUsSearchFields,
  Sorting,
  useGetAllContactusQuery,
} from "@/graphql/generated/graphql";
import { useSearchParams } from "next/navigation";
import React, { useMemo } from "react";
import { ContactTable } from "./table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Index = () => {
  const params = useSearchParams();

  const page = params.get("page");
  const limit = params.get("limit");

  const { data, loading } = useGetAllContactusQuery({
    variables: {
      limit: limit ? limit : 30,
      page: page ? page : 1,
      sort: {
        field: ContactUsSearchFields.FullName,
        order: Sorting.Asc,
      },
      searchFields: {
        fields: [ContactUsSearchFields.FullName],
        q: "",
      },
    },
  });

  const { allContacts, allContactsLength, totalPages } = useMemo(() => {
    return {
      allContacts: data?.getAllContactus.items,
      allContactsLength: data?.getAllContactus.length,
      totalPages: Math.ceil(+data?.getAllContactus?.length! / +limit!),
    };
  }, [data?.getAllContactus.items, data?.getAllContactus.length, limit]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-4xl font-bold">
        loading...
      </div>
    );
  }

  return (
    <div className="py-4 px-2">
      <div className="text-2xl font-bold mb-4">
        <Button asChild>
          <Link href={"/"}>Go Back</Link>
        </Button>
      </div>
      <h1 className="text-2xl font-bold mb-4">All Contacts</h1>

      {allContacts && (
        <ContactTable
          contacts={allContacts as ContactUs[]}
          currentPage={+page!}
          totalPages={totalPages}
          totalItems={+allContactsLength!}
          limit={+limit!}
        />
      )}
    </div>
  );
};

export default Index;
