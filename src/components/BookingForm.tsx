import { useState } from "react";
import { Phone } from "lucide-react";
import { motion } from "framer-motion";
import { User, Mail as MailIcon, MessageSquare, Send, Check, Briefcase, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";

const serviceOptions = [
  "Digital Marketing",
  "Creative Direction",
  "Production & Direction",
  "Post-Production",
  "Content Creation",
  "Web & Digital Design",
];

const businessTypes = [
  "Startup",
  "Small Business",
  "E-Commerce",
  "Restaurant / Food",
  "Fashion & Lifestyle",
  "Real Estate",
  "Healthcare",
  "Education",
  "Entertainment",
  "Other",
];

const bookingSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().trim().min(1, "Phone number is required").max(20).regex(/^[+\d\s\-()]+$/, "Invalid phone number"),
  service: z.string().min(1, "Please select a service"),
  businessType: z.string().min(1, "Please select your business type"),
  message: z.string().trim().max(1000).optional(),
});

type BookingData = z.infer<typeof bookingSchema>;

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzsUM7bJO8_DFyDPegTOVkWNJmF1adRwluIq8qv68fruBDFKsbrSwmE1t7uyfCH1zOPSw/exec";

const BookingForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Partial<Record<keyof BookingData, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = bookingSchema.safeParse({ name, email, phone, service, businessType, message });

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof BookingData, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof BookingData;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, service, businessType, message }),
      });

      setSubmitted(true);
      toast({
        title: "Appointment Request Sent!",
        description: `We'll get back to you about ${service} for your ${businessType} business.`,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "Failed to submit. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="w-16 h-16 rounded-full bg-orange/20 flex items-center justify-center mx-auto mb-5">
          <Check className="text-orange" size={32} />
        </div>
        <h3 className="font-heading font-700 text-2xl text-foreground mb-2">Request Sent!</h3>
        <p className="text-muted-foreground font-body mb-1">
          <span className="font-500 text-foreground">{service}</span> for {businessType}
        </p>
        <p className="text-muted-foreground font-body text-sm">We'll send details to {email}</p>
        <button
          onClick={() => { setSubmitted(false); setName(""); setEmail(""); setPhone(""); setService(""); setBusinessType(""); setMessage(""); }}
          className="mt-6 px-6 py-2 text-sm font-heading font-600 text-orange border border-orange rounded-full hover:bg-orange/10 transition-colors"
        >
          Book Another
        </button>
      </motion.div>
    );
  }

  const inputClass = "w-full pl-11 pr-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange transition-colors";

  return (
    <form onSubmit={handleSubmit} className="space-y-5 text-left">
      {/* Name */}
      <div>
        <label className="text-sm font-body font-500 text-foreground mb-1.5 block">Full Name</label>
        <div className="relative">
          <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className={inputClass} />
        </div>
        {errors.name && <p className="text-sm text-destructive mt-1 font-body">{errors.name}</p>}
      </div>

      {/* Email */}
      <div>
        <label className="text-sm font-body font-500 text-foreground mb-1.5 block">Email</label>
        <div className="relative">
          <MailIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className={inputClass} />
        </div>
        {errors.email && <p className="text-sm text-destructive mt-1 font-body">{errors.email}</p>}
      </div>

      {/* Phone */}
      <div>
        <label className="text-sm font-body font-500 text-foreground mb-1.5 block">Phone Number</label>
        <div className="relative">
          <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 98765 43210" className={inputClass} />
        </div>
        {errors.phone && <p className="text-sm text-destructive mt-1 font-body">{errors.phone}</p>}
      </div>

      {/* Service & Business Type Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Service */}
        <div>
          <label className="text-sm font-body font-500 text-foreground mb-1.5 block">Service Needed</label>
          <Popover>
            <PopoverTrigger asChild>
              <button
                type="button"
                className={cn(
                  "w-full flex items-center justify-between gap-2 pl-4 pr-3 py-3 rounded-xl bg-muted/50 border border-border text-sm font-body text-left transition-colors focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange",
                  !service && "text-muted-foreground"
                )}
              >
                <span className="truncate">{service || "Select service"}</span>
                <ChevronDown size={16} className="text-muted-foreground shrink-0" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-2 pointer-events-auto" align="start">
              <div className="grid gap-1 max-h-56 overflow-y-auto">
                {serviceOptions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setService(s)}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-lg text-sm font-body transition-colors",
                      service === s ? "bg-orange text-secondary-foreground" : "hover:bg-muted text-foreground"
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
          {errors.service && <p className="text-sm text-destructive mt-1 font-body">{errors.service}</p>}
        </div>

        {/* Business Type */}
        <div>
          <label className="text-sm font-body font-500 text-foreground mb-1.5 block">Business Type</label>
          <Popover>
            <PopoverTrigger asChild>
              <button
                type="button"
                className={cn(
                  "w-full flex items-center justify-between gap-2 pl-4 pr-3 py-3 rounded-xl bg-muted/50 border border-border text-sm font-body text-left transition-colors focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange",
                  !businessType && "text-muted-foreground"
                )}
              >
                <span className="truncate">{businessType || "Select type"}</span>
                <ChevronDown size={16} className="text-muted-foreground shrink-0" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-2 pointer-events-auto" align="start">
              <div className="grid gap-1 max-h-56 overflow-y-auto">
                {businessTypes.map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setBusinessType(b)}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-lg text-sm font-body transition-colors",
                      businessType === b ? "bg-orange text-secondary-foreground" : "hover:bg-muted text-foreground"
                    )}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
          {errors.businessType && <p className="text-sm text-destructive mt-1 font-body">{errors.businessType}</p>}
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="text-sm font-body font-500 text-foreground mb-1.5 block">Message (optional)</label>
        <div className="relative">
          <MessageSquare size={16} className="absolute left-4 top-3.5 text-muted-foreground" />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell us about your project..."
            rows={3}
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange transition-colors resize-none"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-orange text-secondary-foreground rounded-xl font-heading font-600 text-sm uppercase tracking-wider hover:shadow-[var(--shadow-glow)] transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        <Send size={18} />
        {isSubmitting ? "Sending..." : "Book Appointment"}
      </button>
    </form>
  );
};

export default BookingForm;
