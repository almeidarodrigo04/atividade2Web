import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PotionCard from "../components/PotionCard";
import painel from "../assets/painel.jpg";
import fachada from "../assets/loja_fachada.jpg";

const API = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

const Home = () => {
  const [potions, setPotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API}/potions`)
      .then((res) => {
        if (!res.ok) throw new Error("Falha ao carregar poções.");
        return res.json();
      })
      .then((data) => setPotions(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="home">
      {/* Hero */}
      <header className="hero">
        <div className="hero__overlay" />
        <img
          className="hero__bg"
          src={painel}
          alt="Floresta mística"
        />
        <div className="hero__content">
          <h1 className="hero__title">Poções & Soluções</h1>
        </div>
      </header>

      {/* Shop Description */}
      <section className="section section--about">
        <div className="container">
          <h2 className="section__heading">Sobre a loja</h2>

          <div className="about-content">
            <figure className="about-figure">
              <img
                src={fachada}
                alt="Fachada da loja Poções e Soluções"
                loading="lazy"
              />
            </figure>
            <div className="about-text">
              <p className="section__text">
                Idealizada pela Família Merigold, mundialmente conhecida por suas habilidades em alquimia,
                a loja Poções & Soluções se mantém sob a administração de Annabele Merigold com a mesma premissa
                de seus antepassados: trazer soluções concretas para os problemas de seus Clientes através de
                uma alquimia de primeira qualidade.
              </p>
              <p className="section__text">
                Apenas atrás da caça às bruxas, a pandemia foi a época de maior impacto no nosso honrável negócio,
                juntando a queda de vendas a aparente inabilidade dos aplicativos de delivery em respeitar nossa
                prática ancestral, acusando-nos de "não seguir as recomendações da ANVISA", criamos este belo mostruário
                com o nossas poções para que possam comprar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Potions */}
      <section className="section section--potions">
        <div className="container">
          <h2 className="section__heading">Catálogo de Poções</h2>
          {loading && <p className="status-msg">Preparando o caldeirão...</p>}
          {error && <p className="status-msg status-msg--error">{error}</p>}
          {!loading && !error && potions.length === 0 && (
            <p className="status-msg">Nenhuma poção disponível no momento.</p>
          )}
          <div className="potions__grid">
            {potions.map((potion) => (
              <PotionCard key={potion.id} potion={potion} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer__inner">
          <div className="footer__info">
            <h3 className="footer__brand">Poções & Soluções</h3>
            <p>Contato: contato@pocoesesolucoes.mgc</p>
            <p>Endereço: Beco da Última Saída</p>
            <p>🕯 Aberto das 18h às 3h (exceto noites sem lua)</p>
          </div>
          <p className="footer__copy">
            © 1867–{new Date().getFullYear()} Poções & Soluções. Todos os
            feitiços reservados. Não nos responsabilizamos por maldições
            acidentais.
          </p>
          <Link to="/login" className="footer__admin-link">
            Área restrita
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Home;
