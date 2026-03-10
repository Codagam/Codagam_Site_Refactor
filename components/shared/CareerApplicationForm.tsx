"use client";

import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Upload, Loader2, ArrowRight } from "lucide-react";
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
  triggerShowArrow?: boolean;
  triggerVariant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "black";
  triggerSize?: "default" | "sm" | "lg" | "icon";
  /** Optional class for the trigger button (e.g. bg-blue-100 in career CTA) */
  triggerClassName?: string;
}

export function CareerApplicationForm({
  className = "",
  onSuccess,
  asDialog = false,
  triggerText = "Apply Now",
  triggerShowArrow = false,
  triggerVariant = "black",
  triggerSize = "default",
  triggerClassName,
}: CareerApplicationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  // Get file name for display
  const fileName = form.watch("resume")?.name;

  // Form content component
  const formContent = (
    <div className={`${className} w-full max-w-full`}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-3 sm:space-y-4 w-full max-w-full"
          autoComplete="on">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs sm:text-sm font-semibold text-slate-700">
                  Full Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your Full Name"
                    className="h-9 sm:h-10 text-sm bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-(--acc2) focus-visible:ring-offset-2 focus-visible:border-(--acc2)"
                    autoComplete="name"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-600 dark:text-red-400 font-medium" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs sm:text-sm font-semibold text-slate-700">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Your Email"
                    className="h-9 sm:h-10 text-sm bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-(--acc2) focus-visible:ring-offset-2 focus-visible:border-(--acc2)"
                    autoComplete="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-600 dark:text-red-400 font-medium" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="resume"
            render={({ field: { onChange, value, ...fieldProps } }) => {
              const { ref, ...restFieldProps } = fieldProps;
              return (
                <FormItem>
                  <FormLabel className="text-xs sm:text-sm font-semibold text-slate-700">
                    Resume / CV
                  </FormLabel>
                  <FormControl>
                    <div className="flex flex-col sm:flex-row gap-1.5 sm:gap-2">
                      {/* Hidden file input */}
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                        {...restFieldProps}
                        onChange={(event) => {
                          const file = event.target.files?.[0];
                          onChange(file);
                        }}
                      />
                      {/* Choose file button */}
                      <Button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        variant="outline"
                        className="h-9 sm:h-10 px-3 sm:px-4 text-sm font-semibold whitespace-nowrap shrink-0 border-slate-300 bg-white text-slate-800 hover:bg-slate-50 hover:border-slate-400"
                      >
                        Choose file
                      </Button>
                      {/* File display area */}
                      <div className="flex-1 min-w-0 border border-slate-200 rounded-md bg-slate-50 px-2 sm:px-3 py-2 sm:py-2.5 flex items-center">
                        <span
                          className={`text-sm truncate ${
                            fileName
                              ? "text-slate-900 font-medium"
                              : "text-slate-500"
                          }`}>
                          {fileName || "No file chosen"}
                        </span>
                      </div>
                    </div>
                  </FormControl>
                  <FormDescription className="text-xs text-slate-500 flex items-center gap-1 mt-1.5">
                    <Upload className="h-3.5 w-3.5 text-slate-400" />
                    <span>PDF, DOC, or DOCX files up to 10MB</span>
                  </FormDescription>
                  <FormMessage className="text-xs text-red-600 dark:text-red-400 font-medium" />
                </FormItem>
              );
            }}
          />

          <div className="pt-1">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-10 sm:h-11 text-sm font-semibold bg-(--acc2) text-white border-0 hover:opacity-90 focus-visible:ring-2 focus-visible:ring-(--acc2) focus-visible:ring-offset-2">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </Button>
          </div>

          {submitMessage && (
            <p className={`text-xs sm:text-sm font-semibold leading-relaxed ${
              submitMessage.includes("error")
                ? "text-red-600"
                : "text-green-600"
            }`}>
              {submitMessage}
            </p>
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
          <Button
            variant={triggerVariant}
            size={triggerSize}
            className={
              triggerClassName ??
              "group bg-white text-(--bg-deep) border border-slate-200 hover:border-(--acc2) hover:text-(--acc2) font-medium"
            }>
            {typeof triggerText === "string" && triggerText.endsWith(" →")
              ? (
                  <>
                    {triggerText.slice(0, -2)}
                    <span className="ml-1.5 inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </>
                )
              : (
                  triggerText
                )}
            {triggerShowArrow && (
              <ArrowRight className="ml-2 h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" aria-hidden />
            )}
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[95vw] sm:max-w-md md:max-w-lg lg:max-w-xl p-4 sm:p-5 md:p-6 w-full max-h-[90vh] overflow-y-auto bg-white border border-slate-200 shadow-xl text-slate-900 [&>button]:text-slate-400 [&>button]:hover:text-slate-900 [&>button]:right-4 [&>button]:top-4">
          <DialogHeader className="space-y-1.5 sm:space-y-2 text-left">
            <DialogTitle className="text-lg sm:text-xl md:text-2xl font-bold leading-tight text-slate-900">
              Apply for a Position
            </DialogTitle>
            <DialogDescription className="text-sm leading-relaxed text-slate-600">
              Fill out the form below to submit your application. We&apos;ll
              review your resume and get back to you soon.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-3 sm:mt-4 md:mt-5 w-full max-w-full">
            {formContent}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Return inline version
  return formContent;
}
