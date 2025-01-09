"use client";
import { Button } from "@/components/ui/button";
import { ValidatedInput } from "@/components/ui/validated-input";
import { useCreateContactUsMutation } from "@/graphql/generated/graphql";
import { useToast } from "@/hooks/use-toast";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";

type Props = {};
// Define TypeScript types for form values
interface ContactUsFormValues {
  full_name: string;
  phone_number: string;
  subject: string;
  body: string;
}
function CreateContactForm({}: Props) {
  const [createContactUs] = useCreateContactUsMutation();
  const { toast } = useToast();

  // Initial form values
  const initialValues: ContactUsFormValues = {
    full_name: "",
    phone_number: "",
    subject: "",
    body: "",
  };

  // Validation schema using Yup
  const validationSchema = Yup.object({
    full_name: Yup.string()
      .required("Full name is required")
      .min(3, "Full name must be at least 3 characters"),
    phone_number: Yup.string()
      .required("Phone number is required")
      .matches(/^\d+$/, "Phone number must contain only digits")
      .min(10, "Phone number must be at least 10 digits"),
    subject: Yup.string().required("Subject is required"),
    body: Yup.string().required("Message body is required"),
  });

  // useFormik for form handling
  const formik = useFormik<ContactUsFormValues>({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      toast({
        title: "Submitting form...",
        description: "Please wait...",
      });
      try {
        await createContactUs({ variables: { input: values } });
        toast({
          title: "Form submitted successfully",
          description: "We will get back to you soon",
        });
        resetForm();
      } catch {
        toast({
          title: "Error submitting form",
          variant: "destructive",
        });
      } finally {
        setSubmitting(false);
      }
    },
  });
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="space-y-6 p-6   bg-white rounded-lg shadow-md w-full"
    >
      {/* Full Name */}
      <ValidatedInput
        id="full_name"
        name="full_name"
        label="Full Name"
        placeholder="Enter your full name"
        value={formik.values.full_name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.full_name ? formik.errors.full_name : undefined}
      />

      {/* Phone Number */}
      <ValidatedInput
        id="phone_number"
        name="phone_number"
        label="Phone Number"
        placeholder="Enter your phone number"
        value={formik.values.phone_number}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.phone_number ? formik.errors.phone_number : undefined
        }
      />

      {/* Subject */}
      <ValidatedInput
        id="subject"
        name="subject"
        label="Subject"
        placeholder="Enter the subject"
        value={formik.values.subject}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.subject ? formik.errors.subject : undefined}
      />

      {/* Body (textarea) */}
      <ValidatedInput
        id="body"
        name="body"
        label="Message"
        placeholder="Enter your message"
        as="textarea"
        rows={4}
        value={formik.values.body}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.body ? formik.errors.body : undefined}
      />

      {/* Submit Button */}
      <div>
        <Button type="submit" disabled={formik.isSubmitting} className="w-full">
          {formik.isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default CreateContactForm;
