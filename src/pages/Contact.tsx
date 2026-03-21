import { useState, FormEvent } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { Phone, Mail, MapPin, Send } from "lucide-react";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="pb-16 md:pb-0">
      {/* Hero */}
      <section className="bg-primary section-padding pt-32 md:pt-40">
        <div className="container-wide">
          <ScrollReveal>
            <p className="font-heading text-sm font-bold uppercase tracking-[0.2em] text-secondary mb-3">Get in Touch</p>
            <h1 className="text-[38px] md:text-[52px] lg:text-[64px] font-extrabold leading-[1.05] text-primary-foreground max-w-3xl mb-6">
              Contact Us
            </h1>
            <p className="text-lg text-primary-foreground/80 max-w-xl">
              Ready to start your project? Reach out for a consultation.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="section-padding-lg bg-background">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <ScrollReveal direction="left">
              <div className="bg-[hsl(var(--section-alt))] rounded-lg p-8 md:p-10">
                <h2 className="text-2xl font-extrabold text-foreground mb-6">Send Us a Message</h2>
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Send className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Message Sent</h3>
                    <p className="text-muted-foreground">Thank you for reaching out. We'll get back to you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-1.5">Name</label>
                      <input
                        id="name"
                        type="text"
                        required
                        className="w-full px-4 py-3 rounded bg-background border border-border text-foreground font-body focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-1.5">Email</label>
                      <input
                        id="email"
                        type="email"
                        required
                        className="w-full px-4 py-3 rounded bg-background border border-border text-foreground font-body focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                        placeholder="you@email.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-foreground mb-1.5">Phone</label>
                      <input
                        id="phone"
                        type="tel"
                        className="w-full px-4 py-3 rounded bg-background border border-border text-foreground font-body focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                        placeholder="604-XXX-XXXX"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-1.5">Message</label>
                      <textarea
                        id="message"
                        rows={5}
                        required
                        className="w-full px-4 py-3 rounded bg-background border border-border text-foreground font-body focus:outline-none focus:ring-2 focus:ring-primary/40 transition resize-none"
                        placeholder="Tell us about your project..."
                      />
                    </div>
                    <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                      <Send className="w-4 h-4" />
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </ScrollReveal>

            {/* Info */}
            <ScrollReveal direction="right">
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-extrabold text-foreground mb-6">Contact Information</h2>
                  <div className="space-y-6">
                    <a href="tel:604-818-2088" className="flex items-start gap-4 group">
                      <div className="w-12 h-12 rounded bg-primary/10 flex items-center justify-center shrink-0">
                        <Phone className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground group-hover:text-primary transition-colors">Phone</p>
                        <p className="text-muted-foreground">604-818-2088</p>
                      </div>
                    </a>
                    <a href="mailto:cary@architect57.com" className="flex items-start gap-4 group">
                      <div className="w-12 h-12 rounded bg-primary/10 flex items-center justify-center shrink-0">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground group-hover:text-primary transition-colors">Email</p>
                        <p className="text-muted-foreground">cary@architect57.com</p>
                      </div>
                    </a>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded bg-primary/10 flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Address</p>
                        <p className="text-muted-foreground">203-2680 Shell Road<br />Richmond, BC V6X 4C9</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg overflow-hidden shadow-lg h-[300px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2607.8!2d-123.1286!3d49.1766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDnCsDEwJzM1LjgiTiAxMjPCsDA3JzQzLjAiVw!5e0!3m2!1sen!2sca!4v1"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Architect 57 Inc. Location"
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
