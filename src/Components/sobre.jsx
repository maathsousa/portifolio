import { TabletSmartphone, Code, User } from "lucide-react";

export const Sobre = () => {
  return (
    <section id="sobre" className="py-24 px-4 relative">
      {" "}
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Sobre <span className="text-primary"> mim</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-muted-foreground">
              Sempre gostei de aprender e experimentar novas tecnologias,
              buscando formas de transformar ideias em soluções digitais que
              realmente fazem diferença. Meu foco é criar aplicações que unam
              praticidade, boa experiência e impacto real para quem usa.
            </p>

            <p className="text-muted-foreground">
              Gosto de encarar desafios que me tiram da zona de conforto e me
              permitem crescer como desenvolvedor. Cada projeto é uma
              oportunidade de evoluir minhas habilidades e entregar algo melhor
              do que antes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <a
                href="#contato"
                className="cosmic-button hover:bg-white hover:text-primary hover:border-primary hover:border"
              >
                {" "}
                Entre em contato
              </a>

              <a
                href="https://linktr.ee/maathsousa"
                download
                className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-300"
              >
                Download CV
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="gradient-border p-6 card-hover rounded-xl">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg"> Front-end</h4>
                  <p className="text-muted-foreground">
                    Desenvolvimento de interfaces modernas, responsivas e
                    intuitivas, sempre focadas na melhor experiência do usuário.
                  </p>
                </div>
              </div>
            </div>
            <div className="gradient-border p-6 card-hover rounded-xl">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">Back-end</h4>
                  <p className="text-muted-foreground">
                    Criação de estruturas organizadas, seguras e escaláveis,
                    garantindo desempenho e confiabilidade.
                  </p>
                </div>
              </div>
            </div>
            <div className="gradient-border p-6 card-hover rounded-xl">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <TabletSmartphone className="h-6 w-6 text-primary" />
                </div>

                <div className="text-left">
                  <h4 className="font-semibold text-lg">Mobile</h4>
                  <p className="text-muted-foreground">
                    Aplicativos funcionais e práticos, pensados para facilitar o
                    dia a dia e oferecer uma navegação fluida.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
