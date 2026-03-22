import { useState, FormEvent } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { Send } from "lucide-react";
import { useLang } from "@/contexts/LangContext";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const { t } = useLang();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="pb-16 md:pb-0">
      {/* Hero */}
      <section className="relative bg-[hsl(var(--surface-dark))] pt-32 md:pt-44 pb-20 md:pb-28">
        <div className="absolute bottom-8 right-10 w-4 h-4 border-b border-r border-[#a11d2d]/20 hidden md:block" />
        <div className="container-wide">
          <ScrollReveal>
            <p className="font-heading text-[11px] font-light tracking-[0.3em] uppercase text-[hsl(var(--gold-accent))] mb-4">{t("contact.label")}</p>
            <h1 className="font-heading text-[40px] md:text-[60px] lg:text-[76px] font-light leading-[0.95] text-white max-w-3xl tracking-tight">
              {t("contact.title")}
            </h1>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="section-padding-lg bg-background relative">
        <div className="absolute top-12 left-6 md:left-10 w-px h-8 bg-[#a11d2d]/20" />
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Form */}
            <ScrollReveal direction="left" className="lg:col-span-7">
              <p className="font-heading text-[11px] font-light tracking-[0.3em] uppercase text-[hsl(var(--purple-muted))] mb-4">
                {t("contact.formLabel")}
              </p>
              <h2 className="font-heading text-2xl md:text-3xl font-light text-foreground mb-8 tracking-tight">
                {t("contact.formTitle1")} <span className="font-medium">{t("contact.formTitle2")}</span>
              </h2>
              {submitted ? (
                <div className="py-16 text-center">
                  <div className="w-14 h-14 rounded-full bg-[hsl(var(--surface-warm))] flex items-center justify-center mx-auto mb-4">
                    <Send className="w-6 h-6 text-foreground" />
                  </div>
                  <h3 className="font-heading text-xl font-light text-foreground mb-2">{t("contact.sent")}</h3>
                  <p className="text-muted-foreground font-light">{t("contact.sentDesc")}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-[13px] font-light text-foreground mb-2">{t("contact.name")}</label>
                      <input id="name" type="text" required className="w-full px-0 py-3 bg-transparent border-0 border-b border-border text-foreground font-light focus:outline-none focus:border-foreground transition-colors" placeholder={t("contact.namePlaceholder")} />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-[13px] font-light text-foreground mb-2">{t("contact.email")}</label>
                      <input id="email" type="email" required className="w-full px-0 py-3 bg-transparent border-0 border-b border-border text-foreground font-light focus:outline-none focus:border-foreground transition-colors" placeholder={t("contact.emailPlaceholder")} />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-[13px] font-light text-foreground mb-2">{t("contact.phone")}</label>
                    <input id="phone" type="tel" className="w-full px-0 py-3 bg-transparent border-0 border-b border-border text-foreground font-light focus:outline-none focus:border-foreground transition-colors" placeholder={t("contact.phonePlaceholder")} />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-[13px] font-light text-foreground mb-2">{t("contact.message")}</label>
                    <textarea id="message" rows={5} required className="w-full px-0 py-3 bg-transparent border-0 border-b border-border text-foreground font-light focus:outline-none focus:border-foreground transition-colors resize-none" placeholder={t("contact.messagePlaceholder")} />
                  </div>
                  <button type="submit" className="inline-flex items-center gap-3 font-heading text-[13px] font-light tracking-[0.1em] uppercase text-[hsl(var(--surface-dark))] bg-[hsl(var(--gold-accent))] px-8 py-4 rounded-sm transition-all duration-300 hover:opacity-90 active:scale-[0.97]">
                    <Send className="w-4 h-4" />
                    {t("contact.send")}
                  </button>
                </form>
              )}
            </ScrollReveal>

            {/* Info */}
            <ScrollReveal direction="right" className="lg:col-span-4 lg:col-start-9">
              <p className="font-heading text-[11px] font-light tracking-[0.3em] uppercase text-[hsl(var(--purple-muted))] mb-4">
                {t("contact.infoLabel")}
              </p>
              <h2 className="font-heading text-2xl md:text-3xl font-light text-foreground mb-8 tracking-tight">
                {t("contact.infoTitle1")} <span className="font-medium">{t("contact.infoTitle2")}</span>
              </h2>
              <div className="space-y-8">
                <div>
                  <span className="text-[11px] font-light tracking-[0.2em] uppercase text-muted-foreground block mb-2">{t("contact.phoneLabel")}</span>
                  <a href="tel:604-818-2088" className="text-foreground font-light hover:text-[hsl(var(--purple-muted))] transition-colors">604.818.2088</a>
                </div>
                <div>
                  <span className="text-[11px] font-light tracking-[0.2em] uppercase text-muted-foreground block mb-2">{t("contact.emailLabel")}</span>
                  <a href="mailto:cary@architect57.com" className="text-foreground font-light hover:text-[hsl(var(--purple-muted))] transition-colors">cary@architect57.com</a>
                </div>
                <div>
                  <span className="text-[11px] font-light tracking-[0.2em] uppercase text-muted-foreground block mb-2">{t("contact.addressLabel")}</span>
                  <p className="text-foreground font-light leading-relaxed">203-2680 Shell Road<br />Richmond, BC V6X 4C9</p>
                </div>
              </div>

              <div className="mt-10 overflow-hidden rounded-sm h-[280px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2607.8!2d-123.1286!3d49.1766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDnCsDEwJzM1LjgiTiAxMjPCsDA3JzQzLjAiVw!5e0!3m2!1sen!2sca!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Architect 57 無極建築 Location"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
