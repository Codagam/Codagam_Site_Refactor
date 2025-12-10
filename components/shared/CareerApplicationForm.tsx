"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { User, Mail, FileText } from "lucide-react";
// CareerFormData and FormSubmitEvent are defined in interfaces but not used here

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  resume: z
    .any()
    .refine((file) => file instanceof File, "Resume is required")
    .refine(
      (file) => !file || file.size <= 10 * 1024 * 1024,
      "File size must be less than 10MB"
    )
    .refine(
      (file) =>
        !file ||
        [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ].includes(file.type),
      "Only PDF, DOC, or DOCX files are allowed"
    ),
});

interface CareerApplicationFormProps {
  className?: string;
  onSuccess?: () => void;
  asDialog?: boolean;
  triggerText?: string;
  triggerVariant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "black";
  triggerSize?: "default" | "sm" | "lg" | "icon";
}

export function CareerApplicationForm({
  className = "",
  onSuccess,
  asDialog = false,
  triggerText = "Apply Now",
  triggerVariant = "black",
  triggerSize = "default",
}: CareerApplicationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      resume: undefined,
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", data.name);
      formDataToSend.append("email", data.email);
      if (data.resume) formDataToSend.append("resume", data.resume);

      const response = await fetch("/api/careers", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        setSubmitMessage(
          "Thank you for your application! We'll review your resume and get back to you soon."
        );
        form.reset();
        if (asDialog) {
          setTimeout(() => setIsDialogOpen(false), 2000);
        }
        if (onSuccess) onSuccess();
      } else {
        setSubmitMessage(
          "There was an error submitting your application. Please try again."
        );
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      setSubmitMessage(
        "There was an error submitting your application. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Form content component
  const formContent = (
    <div className={`${className} w-full max-w-full`}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-3 sm:space-y-3.5 md:space-y-4 w-full max-w-full">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel className="text-xs sm:text-sm font-semibold text-black flex items-center gap-1.5">
                  <User className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-600" />
                  <span>Full Name</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your full name"
                    className="h-9 sm:h-10 text-xs sm:text-sm text-black border-0! ring-0! outline-none! focus-visible:ring-0! focus-visible:outline-none! rounded-lg bg-slate-100 hover:bg-slate-200 focus:bg-white transition-colors shadow-sm"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-600 mt-0.5" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel className="text-xs sm:text-sm font-semibold text-black flex items-center gap-1.5">
                  <Mail className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-600" />
                  <span>Email Address</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    className="h-9 sm:h-10 text-xs sm:text-sm text-black border-0! ring-0! outline-none! focus-visible:ring-0! focus-visible:outline-none! rounded-lg bg-slate-100 hover:bg-slate-200 focus:bg-white transition-colors shadow-sm"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-600 mt-0.5" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="resume"
            render={({ field: { onChange, ...fieldProps } }) => (
              <FormItem className="space-y-1.5">
                <FormLabel className="text-xs sm:text-sm font-semibold text-black flex items-center gap-1.5">
                  <FileText className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-600" />
                  <span>Resume</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="h-9 sm:h-10 text-xs sm:text-sm text-black border-0! ring-0! outline-none! focus-visible:ring-0! focus-visible:outline-none! rounded-lg bg-slate-100 hover:bg-slate-200 focus:bg-white transition-colors shadow-sm file:mr-2 sm:file:mr-3 file:py-1.5 sm:file:py-2 file:px-2 sm:file:px-3 file:border-0 file:text-xs file:font-medium file:bg-white file:text-black hover:file:bg-slate-50 file:rounded-md file:cursor-pointer"
                    {...fieldProps}
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      onChange(file);
                    }}
                  />
                </FormControl>
                <FormDescription className="text-xs text-slate-500 mt-0.5">
                  PDF, DOC, or DOCX files up to 10MB
                </FormDescription>
                <FormMessage className="text-xs text-red-600 mt-0.5" />
              </FormItem>
            )}
          />

          <div className="pt-1">
            <Button
              className="w-full h-9 sm:h-10 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-300 hover:scale-[1.01] shadow-md hover:shadow-lg bg-blue-900 hover:bg-blue-800 text-white"
              type="submit"
              disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          </div>

          {submitMessage && (
            <div
              className={`p-3 rounded-lg text-xs sm:text-sm mt-3 ${
                submitMessage.includes("error")
                  ? "bg-red-50 text-red-700 border border-red-200"
                  : "bg-green-50 text-green-700 border border-green-200"
              }`}>
              {submitMessage}
            </div>
          )}
        </form>
      </Form>
    </div>
  );

  // If asDialog is true, return dialog version
  if (asDialog) {
    return (
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant={triggerVariant} size={triggerSize}>
            {triggerText}
          </Button>
        </DialogTrigger>
        <DialogContent className="career-application-dialog max-w-[90vw] sm:max-w-sm md:max-w-md lg:max-w-lg p-3 sm:p-4 md:p-4 lg:p-5 rounded-xl sm:rounded-2xl max-h-[95vh] overflow-y-auto w-full">
          <DialogHeader className="space-y-1.5 sm:space-y-2">
            <DialogTitle className="text-sm sm:text-base md:text-lg lg:text-xl font-bold leading-tight text-black wrap-break-word px-1 sm:px-0">
              Apply for a Position
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-xs md:text-sm text-slate-600 wrap-break-word px-1 sm:px-0">
              Fill out the form below to submit your application. We&apos;ll
              review your resume and get back to you soon.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-2 sm:mt-3 md:mt-3 w-full max-w-full">
            {formContent}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Return inline version
  return formContent;
}
