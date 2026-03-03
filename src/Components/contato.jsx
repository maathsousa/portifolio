import { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Send, Linkedin, Github } from "lucide-react";
import { cn } from "@/lib/utils";

/** carrega o script do reCAPTCHA apenas uma vez */
function useRecaptchaScript() {
  useEffect(() => {
    if (window.grecaptcha) return;
    const s = document.createElement("script");
    s.src = "https://www.google.com/recaptcha/api.js?render=explicit";
    s.async = true;
    s.defer = true;
    document.head.appendChild(s);
  }, []);
}

export const Contato = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [widgetId, setWidgetId] = useState(null);

  const formRef = useRef(null);
  const captchaRef = useRef(null);

  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  useRecaptchaScript();

  /** renderiza o widget invisível quando grecaptcha estiver pronto */
  useEffect(() => {
    const timer = setInterval(() => {
      if (window.grecaptcha && captchaRef.current && widgetId === null) {
        const id = window.grecaptcha.render(captchaRef.current, {
          sitekey: RECAPTCHA_SITE_KEY,
          size: "invisible",
          callback: (token) => {
            onCaptchaVerified(token);
          },
        });
        setWidgetId(id);
      }
    }, 200);
    return () => clearInterval(timer);
  }, [RECAPTCHA_SITE_KEY, widgetId]);

  /** callback após validação do reCAPTCHA */
  const onCaptchaVerified = async (token) => {
    if (!formRef.current) return;

    try {
      // garante que o token vá junto
      let hidden = formRef.current.querySelector(
        'input[name="g-recaptcha-response"]'
      );
      if (!hidden) {
        hidden = document.createElement("input");
        hidden.type = "hidden";
        hidden.name = "g-recaptcha-response";
        formRef.current.appendChild(hidden);
      }
      hidden.value = token;

      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, {
        publicKey: PUBLIC_KEY,
      });

      toast({
        title: "Mensagem enviada!",
        description: "Obrigado pelo contato. Vou te responder em breve.",
      });
      formRef.current.reset();
    } catch (err) {
      console.error(err);
      toast({
        title: "Falha ao enviar",
        description: "Tente novamente em instantes.",
      });
    } finally {
      // ✅ volta o botão ao normal imediatamente
      setIsSubmitting(false);
      // ✅ reseta o reCAPTCHA invisível para um novo envio
      if (window.grecaptcha && widgetId !== null) {
        try {
          window.grecaptcha.reset(widgetId);
        } catch {}
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formRef.current) return;

    // Honeypot: se preenchido, cancela
    const honey = formRef.current.querySelector('input[name="honey"]');
    if (honey && honey.value) {
      toast({ title: "Erro", description: "Envio inválido." });
      return;
    }

    setIsSubmitting(true);

    // dispara o reCAPTCHA invisível
    if (window.grecaptcha && widgetId !== null) {
      try {
        window.grecaptcha.execute(widgetId);
      } catch (err) {
        console.error(err);
        setIsSubmitting(false);
        toast({
          title: "Falha no reCAPTCHA",
          description: "Atualize a página e tente novamente.",
        });
      }
    } else {
      setIsSubmitting(false);
      toast({
        title: "reCAPTCHA não carregou",
        description: "Espere alguns segundos e tente novamente.",
      });
    }
  };

  return (
    <section id="contato" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Entre em <span className="text-primary">Contato</span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Disponível para novas oportunidades, sejam projetos independentes ou
          posições formais. Envie sua mensagem.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Coluna esquerda */}
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold mb-6">
              Informações de Contato
            </h3>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Email</h4>
                  <a
                    href="mailto:maathsousa@hotmail.com"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    maathsousa@hotmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Celular</h4>
                  <a
                    href="tel:+5511985248479"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    +55 (11) 98524-8479
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Localização</h4>
                  <span className="text-muted-foreground">
                    São Paulo - SP, Brasil
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <h4 className="font-medium mb-4">Redes Sociais</h4>
              <div className="flex space-x-4 justify-center">
                <a
                  href="https://www.linkedin.com/in/maathsousa/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin />
                </a>
                <a
                  href="https://www.github.com/maathsousa"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github />
                </a>
              </div>
            </div>
          </div>

          {/* Coluna direita (formulário) */}
          <div className="bg-card p-8 rounded-lg shadow-xs">
            <h3 className="text-2xl font-semibold mb-6">
              Me envie uma mensagem
            </h3>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              {/* honeypot */}
              <input
                type="text"
                name="honey"
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  Seu nome
                </label>
                <input
                  type="text"
                  id="name"
                  name="from_name"
                  required
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary"
                  placeholder="Fulano da Silva..."
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  Seu e-mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="reply_to"
                  required
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary"
                  placeholder="contato@contato.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  Sua mensagem
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary resize-none"
                  placeholder="Olá, gostei do seu trabalho..."
                />
              </div>

              {/* container do reCAPTCHA invisível */}
              <div ref={captchaRef} />

              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "cosmic-button w-full flex items-center justify-center gap-2"
                )}
              >
                {isSubmitting ? "Enviando..." : "Enviar mensagem"}
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
