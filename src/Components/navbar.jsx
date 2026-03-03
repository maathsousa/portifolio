import { cn } from "../lib/utils";
import { useEffect, useState } from "react";
import { Theme } from "../Components/Theme";
import { Menu, X } from "lucide-react";

const NavItems = [
  { name: "Home", href: "#hero" },
  { name: "Sobre", href: "#sobre" },
  { name: "Skills", href: "#skills" },
  { name: "Projetos", href: "#projetos" },
  { name: "Contato", href: "#contato" },
];

export const Navbar = () => {
  const [isScrolled, setScrolled] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = () => setMenuOpen(false);

  return (
    <header
      className={cn(
        // layout do header no estilo que você curtiu
        "fixed inset-x-0 top-0 z-40 mx-auto w-full max-w-screen-md",
        "border border-border bg-[hsl(var(--background))]/80 backdrop-blur-lg",
        "py-3 shadow-sm md:top-6 md:rounded-3xl lg:max-w-screen-lg",
        isScrolled ? "shadow-md" : "shadow-sm"
      )}
    >
      <div className="px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex shrink-0">
            <a aria-current="page" className="flex items-center" href="#hero">
              <span className="text-xl font-bold text-primary flex items-center">
                <span className="relative z-10">
                  <span className="text-foreground">Meu</span> Portifólio
                </span>
              </span>
            </a>
          </div>

          {/* Links - Desktop */}
          <nav className="hidden md:flex md:items-center md:justify-center md:gap-5 md:relative md:-left-10">
            {NavItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "inline-block rounded-lg px-2 py-1 text-sm font-medium",
                  "text-foreground/90 transition-all duration-200",
                  "hover:bg-foreground/10 hover:text-foreground"
                )}
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Ações: Theme + hambúrguer */}
          <div className="flex items-center justify-end gap-3 pb-2">
            <Theme />

            {/* Botão mobile */}
            <button
              onClick={() => setMenuOpen((p) => !p)}
              className={cn(
                "md:hidden inline-flex items-center justify-center rounded-xl",
                "px-2.5 py-2 text-sm font-semibold",
                "text-foreground ring-1 ring-inset ring-border",
                "transition-all hover:bg-foreground/10"
              )}
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile (dropdown) */}
      <div
        id="mobile-menu"
        className={cn(
          "md:hidden overflow-hidden transition-[max-height,opacity] duration-300",
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div
          className={cn(
            "px-4 pt-3 pb-4 border-t border-border",
            "bg-[hsl(var(--background))]"
          )}
        >
          <ul className="grid gap-1">
            {NavItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={handleNavClick}
                  className={cn(
                    "block rounded-lg px-3 py-2 text-sm font-medium",
                    "text-foreground/90 hover:bg-foreground/10 hover:text-foreground",
                    "transition-colors"
                  )}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};
