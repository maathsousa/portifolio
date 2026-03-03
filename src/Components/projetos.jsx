import { useEffect, useMemo, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import crqsp from "../assets/crqsp.png";
import qualifica from "../assets/qualifica.png";
import tabela from "../assets/tabelasite.png";
import conecta from "../assets/conecta.png";
import pop from "../assets/pop.png";
import appTabela from "../assets/apptabela.png";
import appMeucrq from "../assets/appmeucrqsp.png";
import delorean from "../assets/delorean.png";

const testimonialsSeed = [
  {
    id: 1,
    nome: "Página do Conselho",
    nomePagina: "Home",
    empresa: "CRQ-SP",
    linguagem: ["Wordpress", "HTML", "CSS", "Javascript", "PHP", "SQL Server"],
    avatar: crqsp,
    descricao:
      "A página inicial foi redesenhada com foco em destacar os serviços mais acessados, trazendo uma navegação mais clara e banners atualizáveis.",
    link: "https://crqsp.org.br/",
  },
  {
    id: 2,
    nome: "Tabela Periódica Interativa",
    nomePagina: "Página",
    empresa: "CRQ-SP",
    linguagem: ["Wordpress", "HTML", "CSS", "Javascript"],
    avatar: tabela,
    descricao:
      "Foi desenvolvida uma Tabela Periódica Interativa para o CRQ-SP, permitindo explorar cada elemento químico com informações detalhadas, filtros e recursos educacionais de forma moderna e acessível.",
    link: "https://crqsp.org.br/tabelaperiodica/",
  },
  {
    id: 3,
    nome: "Qualifica",
    nomePagina: "Portal",
    empresa: "CRQ-SP",
    linguagem: ["Wordpress", "PHP", "HTML", "CSS", "Javascript"],
    avatar: qualifica,
    descricao:
      "Foi desenvolvido o portal CRQ-SP Qualifica, oferecendo cursos online e lives com foco em atualização profissional e disseminação de conhecimento na área química.",
    link: "https://crqsp.org.br/qualifica/",
  },
  {
    id: 4,
    nome: "Conecta",
    nomePagina: "Portal de empregos",
    empresa: "CRQ-SP",
    linguagem: ["Laravel", "PHP", "HTML", "CSS", "Javascript"],
    avatar: conecta,
    descricao:
      "Foi desenvolvido o portal Conecta, evolução da antiga Bolsa de Emprego, com redesign completo, nova identidade visual e melhorias na experiência de navegação.",
    link: "https://crqsp.org.br/conecta/",
  },
  {
    id: 5,
    nome: "POP",
    nomePagina: "Programa de Orientação Profissional",
    empresa: "CRQ-SP",
    linguagem: ["Wordpress", "HTML", "CSS", "Javascript"],
    avatar: pop,
    descricao:
      "Foi desenvolvido a landing page do POP - Programa de Orientação Profissional, com toda informação que o estudante precisa saber para se tornar um profissional.",
    link: "https://crqsp.org.br/programa-de-orientacao-profissional-pop/",
  },
  {
    id: 6,
    nome: "Aplicativo da Tabela Periódica",
    nomePagina: "Aplicativo Multiplataforma",
    empresa: "CRQ-SP",
    linguagem: [
      "Flutter",
      "Dart",
      "Firebase",
      "Kotlin",
      "Swift",
      "Json",
      "Javascript",
    ],
    avatar: appTabela,
    descricao:
      "Foi desenvolvido o aplicativo da Tabela Periódica Interativa do CRQ-SP, focando nos detalhes do elemento, visualização dos elementos em 3D, e realidade aumentada e também temos o Tabelinho, chatbot(IA).",
    link: "https://crqsp.org.br/crq-sp-lanca-aplicativo-da-tabela-periodica-interativa/",
  },
  {
    id: 7,
    nome: "Aplicativo do MEUCRQSP",
    nomePagina: "Serviços On-line",
    empresa: "CRQ-SP",
    linguagem: [
      "Flutter",
      "Dart",
      "Firebase",
      "Kotlin",
      "Swift",
      "PHP",
      "Javascript",
    ],
    avatar: appMeucrq,
    descricao:
      "Foi desenvolvido o aplicativo dos serviços on-line do CRQ-SP, o MEUCRQSP deixando todo o serviço já existente na palma da mão do profissional da Química.",
    link: "https://crqsp.org.br/aplicativo-meucrqsp-ja-esta-disponivel-para-android-e-ios/",
  },
  {
    id: 7,
    nome: "Delorean Viagens",
    nomePagina: "Agência de viagens",
    empresa: "Delorean Viagens",
    linguagem: ["Wordpress", "PHP", "HTML", "CSS", "Javascript"],
    avatar: delorean,
    descricao:
      "Foi desenvolvido um site para a agência  de viagens Delorean Viagens, ainda está em fase de desenvolvimento",
    link: "https://deloreanviagens.com.br/",
  },
];

export default function Projetos({
  items = testimonialsSeed,
  autoPlay = true,
  delay = 10000,
}) {
  const [stack, setStack] = useState(items);
  const topItem = stack[0];

  const layers = useMemo(
    () =>
      stack.map((it, i) => ({
        id: it.id,
        offsetX: -i * 10,
        offsetY: i * 14,
        rotate: i * 2.5,
        z: stack.length - i,
      })),
    [stack]
  );

  const next = useCallback(() => {
    setStack((prev) => {
      if (prev.length <= 1) return prev;
      const last = prev[prev.length - 1];
      return [last, ...prev.slice(0, prev.length - 1)];
    });
  }, []);

  const prev = useCallback(() => {
    setStack((prev) => {
      if (prev.length <= 1) return prev;
      const [first, ...rest] = prev;
      return [...rest, first];
    });
  }, []);

  // Autoplay opcional
  useEffect(() => {
    if (!autoPlay) return;
    const id = setInterval(next, delay);
    return () => clearInterval(id);
  }, [autoPlay, delay, next]);

  return (
    <section className="relative py-24 px-4" id="projetos">
      <h2 className="text-3xl md:text-4xl font-bold text-center">
        Principais <span className="text-primary">Projetos</span>
      </h2>
      <div className="container mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* --- STACK DE IMAGENS --- */}
        <div className="relative h-[360px] sm:h-[420px] md:h-[460px] lg:h-[500px] -top-10">
          {layers.map((layer, i) => (
            <motion.div
              key={layer.id}
              layout
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ zIndex: layer.z }}
              animate={{
                x: layer.offsetX,
                y: layer.offsetY,
                rotate: layer.rotate,
                scale: i === 0 ? 1 : 0.96,
              }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
            >
              <motion.img
                src={stack[i]?.avatar}
                alt={stack[i]?.nome}
                className="
                    md:max-w-[500px]
                    max-w-[300px]
                    h-auto
                    rounded-xl 
                    shadow-[0_20px_60px_rgba(0,0,0,0.35)] 
                    object-cover
                "
                initial={{ opacity: 0.6 }}
                animate={{ opacity: i === 0 ? 1 : 0.85 }}
                transition={{ duration: 0.3 }}
                draggable={false}
                loading="lazy"
                decoding="async"
              />
            </motion.div>
          ))}

          {/* setas sobre a pilha (mobile-first) */}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 lg:hidden">
            <button
              onClick={prev}
              aria-label="Anterior"
              className="h-10 w-10 rounded-full border bg-background/70 backdrop-blur hover:bg-accent hover:text-accent-foreground flex items-center justify-center"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              onClick={next}
              aria-label="Próximo"
              className="h-10 w-10 rounded-full border bg-background/70 backdrop-blur hover:bg-accent hover:text-accent-foreground flex items-center justify-center"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* --- CONTEÚDO (direita) --- */}
        <div className="max-w-xl md:ml-20 lg:ml-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={topItem.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
            >
              <div className="mb-2">
                <h3 className="text-2xl md:text-3xl font-semibold">
                  {topItem.nome}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {topItem.nomePagina}{" "}
                  {topItem.empresa ? (
                    <>
                      <span className="mx-1">·</span>
                      <span className="opacity-90">{topItem.empresa}</span>
                    </>
                  ) : null}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mb-5 items-center justify-center">
                {topItem.linguagem?.map((l, idx) => (
                  <span
                    key={`${topItem.id}-lang-${idx}`}
                    className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground"
                  >
                    {l}
                  </span>
                ))}
              </div>

              <blockquote className="relative pl-6 text-base md:text-lg leading-relaxed text-foreground/90">
                <Quote
                  className="absolute left-0 top-0 translate-y-1"
                  size={18}
                />
                {topItem.descricao}
              </blockquote>

              <a
                href={topItem.link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-300 relative top-5"
              >
                Acesse a página
              </a>

              <div className="mt-6 hidden lg:flex items-center gap-3">
                <button
                  onClick={prev}
                  aria-label="Anterior"
                  className="h-10 w-10 rounded-full border hover:bg-accent hover:text-accent-foreground flex items-center justify-center"
                >
                  <ArrowLeft size={18} />
                </button>
                <button
                  onClick={next}
                  aria-label="Próximo"
                  className="h-10 w-10 rounded-full border hover:bg-accent hover:text-accent-foreground flex items-center justify-center"
                >
                  <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
