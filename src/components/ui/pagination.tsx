"use client";

import { Button } from "@/components/ui/button";
import { JSX, useCallback } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  onPageChange,
}: PaginationProps) {
  const maxVisiblePages = 5;

  // Helper to render dynamic page number buttons
  const renderPageNumbers = useCallback(() => {
    const pageNumbers: JSX.Element[] = [];
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust if the range is smaller than maxVisiblePages
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <Button
          key={i}
          onClick={() => onPageChange(i)}
          variant={i === currentPage ? "secondary" : "outline"}
          className="mx-1"
        >
          {i}
        </Button>
      );
    }

    return pageNumbers;
  }, [currentPage, totalPages, onPageChange]);

  return (
    <div className="flex flex-col items-center mt-4 space-y-2 sticky bottom-0 bg-white dark:bg-gray-800 p-4">
      <div className="flex items-center space-x-2">
        {/* Previous Page Button */}
        {currentPage > 1 && (
          <Button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
        )}

        {/* Page Number Buttons */}
        {renderPageNumbers()}

        {/* Next Page Button */}
        {currentPage < totalPages && (
          <Button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        )}
      </div>

      {/* Pagination Info */}
      <div className="text-sm text-gray-500">
        Page {currentPage} of {totalPages} | Total items: {totalItems}
      </div>
    </div>
  );
}
