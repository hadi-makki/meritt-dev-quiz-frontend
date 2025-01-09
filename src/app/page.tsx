import Link from "next/link";

export default function Home() {
  return (
    <div className="py-4  font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-start sm:items-start">
        <div className="flex items-center gap-4 max-sm:flex-col max-sm:gap-2 max-sm:w-full">
          {" "}
          <div className="flex gap-4 items-center flex-col sm:flex-row max-sm:w-full">
            <Link
              className="rounded-full border border-solid border-transparent max-sm:w-full transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
              href="/all-contacts?page=1&limit=4"
            >
              All Contacts
            </Link>
          </div>
          <div className="flex gap-4 items-center flex-col sm:flex-row max-sm:w-full">
            <Link
              className="rounded-full border border-solid border-transparent max-sm:w-full transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
              href="/all-products?page=1&limit=4"
            >
              All Products
            </Link>
          </div>
          <div className="flex gap-4 items-center flex-col sm:flex-row max-sm:w-full">
            <Link
              className="rounded-full border border-solid border-transparent max-sm:w-full transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
              href="/create-contact"
            >
              Create Contact
            </Link>
          </div>
        </div>

        <h1 className="text-3xl font-semibold">
          Refer to Readme to know more about project structure and requirements
        </h1>

        <iframe
          src="https://app.tango.us/app/embed/e60fe546-32aa-446d-ba7e-df9af9ffaddd"
          className="min-h-[640px]"
          sandbox="allow-scripts allow-top-navigation-by-user-activation allow-popups allow-same-origin"
          security="restricted"
          title="Apollo Server: Querying Products with Pagination and Search"
          width="100%"
          height="100%"
          referrerPolicy="strict-origin-when-cross-origin"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </main>
    </div>
  );
}
