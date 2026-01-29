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
        <h4 className="font-bold mb-1.5 sm:mb-2 text-foreground flex items-center text-xs sm:text-sm break-words">
          📩 Get in Touch
        </h4>
      )}
      <form
        key="contact-form"
        className="flex flex-col space-y-2 w-full max-w-full"
        onSubmit={handleSubmit}
        autoComplete="on">
        <div className="space-y-1">
          <Label
            htmlFor="name"
            className="text-xs sm:text-sm font-normal text-white"
            style={{ fontWeight: 400 }}>
            Name
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="h-8 sm:h-9 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground"
            style={{ fontWeight: 400 }}
            autoComplete="name"
            required
          />
        </div>
        <div className="space-y-1">
          <Label
            htmlFor="email"
            className="text-xs sm:text-sm font-normal text-white"
            style={{ fontWeight: 400 }}>
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className={`h-8 sm:h-9 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground ${
              emailError ? "border-red-500" : ""
            }`}
            style={{ fontWeight: 400 }}
            autoComplete="email"
            required
          />
          {emailError && (
            <p className="text-red-400 text-xs" style={{ fontWeight: 400 }}>
              {emailError}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <Label
            htmlFor="phone"
            className="text-xs sm:text-sm font-normal text-white"
            style={{ fontWeight: 400 }}>
            Phone
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="Your Phone (10 digits)"
            value={formData.phone}
            onChange={handleChange}
            className="h-8 sm:h-9 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground"
            style={{ fontWeight: 400 }}
            maxLength={10}
            pattern="[0-9]{10}"
            autoComplete="tel"
            required
          />
        </div>
        <div className="space-y-1">
          <Label
            htmlFor="message"
            className="text-xs sm:text-sm font-normal text-white"
            style={{ fontWeight: 400 }}>
            Message
          </Label>
          <Textarea
            id="message"
            name="message"
            placeholder="Your Message"
            rows={3}
            value={formData.message}
            onChange={handleChange}
            className="resize-none text-xs sm:text-sm text-foreground placeholder:text-muted-foreground"
            style={{ fontWeight: 400 }}
            required
          />
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          variant="default"
          className="w-full h-8 sm:h-9 text-xs sm:text-sm font-bold bg-background text-primary hover:bg-muted"
          style={{ fontWeight: 700 }}>
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
        {submitMessage && (
          <p
            className="text-green-400 text-xs sm:text-sm mt-1.5 text-center "
            style={{ fontWeight: 400 }}>
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
        <DialogContent className="max-w-[95vw] sm:max-w-md md:max-w-lg p-3 sm:p-4 w-full">
          <DialogHeader>
            <DialogTitle className="text-base sm:text-lg font-bold text-foreground break-words">
              Get in Touch
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-sm break-words">
              We&apos;d love to hear from you. Send us a message and we&apos;ll
              respond as soon as possible.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-3 sm:mt-4 w-full max-w-full">{formContent}</div>
        </DialogContent>
      </Dialog>
    );
  }

  // Return inline version
  return formContent;
}
