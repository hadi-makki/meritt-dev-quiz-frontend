"use client";

import Pagination from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ContactUs } from "@/graphql/generated/graphql";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

interface ContactTableProps {
  contacts: ContactUs[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  limit: number;
}

export function ContactTable({
  contacts,
  currentPage,
  totalPages,
  totalItems,
  limit,
}: ContactTableProps) {
  const router = useRouter();

  const handlePageChange = useCallback(
    (newPage: number) => {
      router.push(`/all-contacts?page=${newPage}&limit=${limit}`);
    },
    [limit, router]
  );

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Created At</TableHead>
            <TableHead>Full Name</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Body</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contacts?.map((contact) => (
            <TableRow key={contact._id}>
              <TableCell>
                {moment(contact.createdAt).format("MMM/DD/YYYY")}
              </TableCell>
              <TableCell>{contact.full_name}</TableCell>
              <TableCell>{contact.phone_number}</TableCell>
              <TableCell>{contact.subject}</TableCell>
              <TableCell>{contact.body}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        totalItems={totalItems}
      />
    </div>
  );
}
