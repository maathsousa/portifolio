import { ArrowDown } from "lucide-react";
import fotoMat from "../assets/matheus.jpg";

export const Conteudo = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4"
    >
      <div className="container max-w-5xl mx-auto text-center md:text-start z-10 flex items-center gap-8 justify-center flex-col-reverse md:flex-row">
        <div className="space-y-5">
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight">
            <span className="text-foreground opacity-0 animate-fade-in">
              Olá, eu sou o
            </span>
            <span className="text-primary opacity-0 animate-fade-in-delay-1">
              {" "}
              Matheus Sousa
            </span>
          </h1>

          <p className="text-lg md:text-sm text-muted-foreground max-2-2xl mx-auto opacity-0 animate-fade-in-delay-3">
            <strong>Desenvolvedor Full Stack Jr</strong> apaixonado por criar
            soluções <strong>web</strong> e <strong>mobile</strong> que unem
            design, performance e funcionalidade.
          </p>

          <div className="pt-4 opacity-0 animate-fade-in-delay-4">
            <a href="#projetos" className="cosmic-button shadow-lg">
              Confira meus trabalhos
            </a>
          </div>
        </div>
        <img
          src={fotoMat}
          alt="Foto perfil"
          className="md:max-w-[300px]
                    max-w-[200px]
                    rounded-xl
                    h-auto z-10 shadow-2xl"
        />
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-sm text-muted-foreground mb-2"> Scroll </span>
        <ArrowDown className="h-5 w-5 text-primary" />
      </div>
    </section>
  );
};
