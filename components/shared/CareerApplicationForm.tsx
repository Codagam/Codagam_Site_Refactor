"use client";

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { User, Mail, FileText } from "lucide-react";
import {
  CareerFormData,
  FormSubmitEvent,
  FormChangeEvent,
} from "@/models/interfaces";

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
  const [formData, setFormData] = useState<CareerFormData>({
    name: "",
    email: "",
    resume: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleChange: FormChangeEvent = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, files } = e.target;
    if (name === "resume" && files) {
      setFormData((prev: CareerFormData) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev: CareerFormData) => ({ ...prev, [name]: value }));
      if (name === "email") setEmailError("");
    }
  };

  const handleSubmit: FormSubmitEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");
    setEmailError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setEmailError("Please enter a valid email address");
      setIsSubmitting(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      if (formData.resume) formDataToSend.append("resume", formData.resume);

      const response = await fetch("/api/careers", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        setSubmitMessage(
          "Thank you for your application! We'll review your resume and get back to you soon."
        );
        setFormData({ name: "", email: "", resume: null });
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
      <div className="bg-linear-to-br from-background to-muted border border-border rounded-2xl p-4 sm:p-6 shadow-lg w-full max-w-full">
        <form
          onSubmit={handleSubmit}
          className="space-y-3 sm:space-y-4 w-full max-w-full">
          <div className="space-y-2 sm:space-y-3">
            <Label
              htmlFor="name"
              className="text-xs sm:text-sm font-semibold text-foreground flex items-center space-x-2">
              <User className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />
              <span>Full Name</span>
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="h-10 sm:h-12 text-xs sm:text-sm border-border focus:border-ring focus:ring-ring transition-all duration-300 hover:border-ring/50 rounded-xl bg-background shadow-sm"
              required
            />
          </div>

          <div className="space-y-2 sm:space-y-3">
            <Label
              htmlFor="email"
              className="text-xs sm:text-sm font-semibold text-foreground flex items-center space-x-2">
              <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />
              <span>Email Address</span>
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              className={`h-10 sm:h-12 text-xs sm:text-sm border-border focus:border-ring focus:ring-ring transition-all duration-300 hover:border-ring/50 rounded-xl bg-background shadow-sm ${
                emailError ? "border-red-500" : ""
              }`}
              required
            />
            {emailError && (
              <p className="text-destructive text-xs">{emailError}</p>
            )}
          </div>

          <div className="space-y-2 sm:space-y-3">
            <Label
              htmlFor="resume"
              className="text-xs sm:text-sm font-semibold text-foreground flex items-center space-x-2">
              <FileText className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />
              <span>Resume</span>
            </Label>
            <Input
              id="resume"
              name="resume"
              type="file"
              onChange={handleChange}
              accept=".pdf,.doc,.docx"
              className="h-10 sm:h-12 text-xs sm:text-sm border-border focus:border-ring focus:ring-ring transition-all duration-300 hover:border-ring/50 rounded-xl bg-background shadow-sm file:mr-2 sm:file:mr-4 file:py-1 sm:file:py-2 file:px-2 sm:file:px-4 file:border-0 file:text-xs sm:file:text-sm file:font-semibold file:bg-accent file:text-foreground hover:file:bg-accent/80"
              required
            />
            <p className="text-xs sm:text-sm text-muted-foreground">
              PDF, DOC, or DOCX files up to 10MB
            </p>
          </div>

          <Button
            className="w-full h-10 sm:h-12 text-sm sm:text-base font-semibold rounded-xl transition-all duration-500 hover:scale-105 shadow-lg hover:shadow-xl group relative overflow-hidden"
            type="submit"
            variant="black"
            size="lg"
            disabled={isSubmitting}
            aria-label={
              isSubmitting ? "Submitting application" : "Submit application"
            }>
            <div className="hover-bg-career bg-green-600"></div>
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </span>
          </Button>

          {submitMessage && (
            <div
              className={`p-3 sm:p-4 rounded-xl text-sm sm:text-base ${
                submitMessage.includes("error")
                  ? "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800"
                  : "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800"
              }`}>
              {submitMessage}
            </div>
          )}
        </form>
      </div>
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
        <DialogContent className="max-w-[95vw] sm:max-w-md md:max-w-lg p-4 sm:p-6 w-full">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl text-foreground wrap-break-word">
              Apply for a Position
            </DialogTitle>
            <DialogDescription className="text-sm sm:text-base wrap-break-word">
              Fill out the form below to submit your application. We&apos;ll
              review your resume and get back to you soon.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 sm:mt-6 w-full max-w-full">{formContent}</div>
        </DialogContent>
      </Dialog>
    );
  }

  // Return inline version
  return formContent;
}
