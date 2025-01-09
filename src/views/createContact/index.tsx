import { Button } from "@/components/ui/button";
import CreateContactForm from "./create-contact-form";
import Link from "next/link";

type Props = {};

function Index({}: Props) {
  return (
    <div>
      <div className="text-2xl font-bold my-4 ">
        <Button asChild>
          <Link href={"/"}>Go Back</Link>
        </Button>
      </div>
      <div className="flex items-center justify-center mt-12 md:mt-32 flex-col max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold">Create Contact Form</h1>
        <CreateContactForm />
      </div>
    </div>
  );
}

export default Index;
