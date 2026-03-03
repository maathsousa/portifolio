import { Conteudo } from "../Components/conteudoinicial";
import { Navbar } from "../Components/navbar";
import { Sobre } from "../Components/sobre";
import { Skills } from "../Components/skills";
import Projetos from "../Components/projetos";
import { Contato } from "../Components/contato";
import { Footer } from "../Components/footer";

export const Home = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <main>
        <Conteudo />
        <Sobre />
        <Skills />
        <Projetos />
        <Contato />
        <Footer />
      </main>
    </div>
  );
};
