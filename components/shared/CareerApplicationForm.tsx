"use client";

import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Upload, Loader2 } from "lucide-react";
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
                <FormLabel className="text-xs sm:text-sm font-bold">
                  Full Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your Full Name"
                    className="h-9 sm:h-10 text-xs sm:text-sm text-foreground dark:text-foreground placeholder:text-muted-foreground dark:placeholder:text-muted-foreground border-border dark:border-border focus:border-primary dark:focus:border-primary"
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
                <FormLabel className="text-xs sm:text-sm font-bold">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Your Email"
                    className="h-9 sm:h-10 text-xs sm:text-sm text-foreground dark:text-foreground placeholder:text-muted-foreground dark:placeholder:text-muted-foreground border-border dark:border-border focus:border-primary dark:focus:border-primary"
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
                  <FormLabel className="text-xs sm:text-sm font-bold">
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
                        variant="black"
                        className="h-9 sm:h-10 px-3 sm:px-4 text-xs sm:text-sm font-semibold whitespace-nowrap shrink-0">
                        Choose file
                      </Button>
                      {/* File display area */}
                      <div className="flex-1 min-w-0 border border-border dark:border-border rounded-md bg-background dark:bg-muted px-2 sm:px-3 py-2 sm:py-2.5 flex items-center">
                        <span
                          className={`text-xs sm:text-sm truncate ${
                            fileName
                              ? "text-foreground dark:text-foreground font-medium"
                              : "text-muted-foreground dark:text-muted-foreground"
                          }`}>
                          {fileName || "No file chosen"}
                        </span>
                      </div>
                    </div>
                  </FormControl>
                  <FormDescription className="text-xs text-muted-foreground dark:text-muted-foreground flex items-center gap-1 mt-1.5">
                    <Upload className="h-3 w-3 text-muted-foreground dark:text-muted-foreground" />
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
              variant="black"
              className="w-full h-10 sm:h-11 text-xs sm:text-sm font-semibold">
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
          <Button variant={triggerVariant} size={triggerSize} className="bg-primary hover:bg-primary-hover text-primary-foreground">
            {triggerText}
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[95vw] sm:max-w-md md:max-w-lg lg:max-w-xl p-4 sm:p-5 md:p-6 w-full max-h-[90vh] overflow-y-auto">
          <DialogHeader className="space-y-1.5 sm:space-y-2 text-left">
            <DialogTitle className="text-lg sm:text-xl md:text-2xl font-bold leading-tight">
              Apply for a Position
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-sm leading-relaxed text-foreground">
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
