import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const contactInfo = [
  { icon: Mail, label: "Email", value: "infoneixcyll@gmail.com" },
  { icon: Phone, label: "Phone", value: "+62 858 0665 3602" },
  { icon: MapPin, label: "Location", value: "Surabaya, Jawa Timur" },
];

export const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast({
      title: "Message sent! ✨",
      description: "I'll get back to you soon.",
    });
    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-full h-1/2"
        style={{ background: "radial-gradient(ellipse at bottom, hsla(270, 95%, 65%, 0.05) 0%, transparent 70%)" }}
      />

      <div className="container mx-auto px-6 lg:px-12 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 rounded-full mb-6">
            Contact
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Let's <span className="text-gradient">connect</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Have a project in mind? Let's make it happen.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
         <motion.div
  initial={{ opacity: 0, x: -30 }}
  animate={isInView ? { opacity: 1, x: 0 } : {}}
  transition={{ duration: 0.6, delay: 0.2 }}
  className="lg:col-span-5 flex flex-col sm:flex-row gap-6 justify-center"
>
  {contactInfo.map((info, index) => (
    <motion.div
      key={info.label}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.3 + index * 0.1 }}
      className="flex items-center gap-4 p-4 glass-card rounded-2xl
                 min-w-[220px] justify-center text-center
                 group hover:border-primary/30 transition-all"
    >
      <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20">
        <info.icon className="w-5 h-5 text-primary" />
      </div>

      <div className="text-left">
        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
          {info.label}
        </p>
        <p className="font-medium">{info.value}</p>
      </div>
    </motion.div>
  ))}
</motion.div>
        </div>
      </div>
    </section>
  );
};
