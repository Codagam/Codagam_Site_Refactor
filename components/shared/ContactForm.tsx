"use client";

import React, { useState } from "react";
import validateEmail from "@/lib/validateEmail";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ContactFormProps {
  className?: string;
  showTitle?: boolean;
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

export function ContactForm({
  className = "",
  showTitle = true,
  onSuccess,
  asDialog = false,
  triggerText = "Get in Touch",
  triggerVariant = "black",
  triggerSize = "default",
}: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    // Handle phone number validation - only allow numbers
    if (name === "phone") {
      const numericValue = value.replace(/\D/g, "").slice(0, 10);
      setFormData((prev) => ({ ...prev, [name]: numericValue }));
    } else {
      // For all other fields, allow any input
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    // Clear email error when user starts typing
    if (name === "email") {
      setEmailError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitMessage("Message sent successfully!");
        setFormData({ name: "", email: "", phone: "", message: "" });
        if (asDialog) {
          setIsDialogOpen(false);
        }
        if (onSuccess) onSuccess();
      } else {
        setSubmitMessage("Failed to send message. Please try again.");
      }
    } catch {
      setSubmitMessage("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Form content component - moved outside to prevent re-creation
  const formContent = (
    <div className={`${className} w-full max-w-full`}>
      {showTitle && (
        <h4 className="font-semibold mb-2 sm:mb-3 text-foreground flex items-center text-sm sm:text-base wrap-break-word">
          📩 Get in Touch
        </h4>
      )}
      <form
        key="contact-form"
        className="flex flex-col space-y-3 w-full max-w-full"
        onSubmit={handleSubmit}
        autoComplete="on">
        <div className="space-y-1.5">
          <Label htmlFor="name" className="text-sm font-medium text-white">
            Name
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="h-12 text-black placeholder:text-slate-500"
            autoComplete="name"
            required
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-sm font-medium text-white">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className={`h-12 text-black placeholder:text-slate-500 ${
              emailError ? "border-red-500" : ""
            }`}
            autoComplete="email"
            required
          />
          {emailError && (
            <p className="text-red-400 text-xs sm:text-sm">{emailError}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="phone" className="text-sm font-medium text-white">
            Phone
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="Your Phone (10 digits)"
            value={formData.phone}
            onChange={handleChange}
            className="h-12 text-black placeholder:text-slate-500"
            maxLength={10}
            pattern="[0-9]{10}"
            autoComplete="tel"
            required
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="message" className="text-sm font-medium text-white">
            Message
          </Label>
          <Textarea
            id="message"
            name="message"
            placeholder="Your Message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className="resize-none text-black placeholder:text-slate-500"
            required
          />
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          variant="default"
          className="w-full h-12  font-bold  bg-white text-blue-900 hover:bg-blue-50">
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
        {submitMessage && (
          <p className="text-green-400 text-sm mt-2 text-center">
            {submitMessage}
          </p>
        )}
      </form>
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
              Get in Touch
            </DialogTitle>
            <DialogDescription className="text-sm sm:text-base wrap-break-word">
              We&apos;d love to hear from you. Send us a message and we&apos;ll
              respond as soon as possible.
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
