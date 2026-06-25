import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PotionCard from "../components/PotionCard";

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
          src="https://images.pexels.com/photos/17459947/pexels-photo-17459947.jpeg?auto=compress&cs=tinysrgb&w=1280"
          alt="Floresta mística"
        />
        <div className="hero__content">
          <h1 className="hero__title">Poções & Soluções</h1>
          <p className="hero__subtitle">
            Beco da Última Saída — Mestres do Elixir desde 1867
          </p>
        </div>
      </header>

      {/* Shop Description */}
      <section className="section section--about">
        <div className="container">
          <h2 className="section__heading">A Nossa Loja</h2>
          <p className="section__text">
            Fundada por Annabelle Merigold, a Poções & Soluções é o destino
            definitivo para quem busca remédios mágicos, elixires raros e
            preparos especiais. Cada poção é elaborada com ingredientes
            selecionados e destilada sob a luz da lua, garantindo a mais alta
            potência e qualidade.
          </p>
          <p className="section__text">
            Nossos produtos chegaram a grandes bruxos e aventureiros de todas
            as partes do reino. Seja para curar, fortalecer ou simplesmente
            cheirar melhor — temos o que você precisa.
          </p>
        </div>
      </section>

      {/* History */}
      <section className="section section--history">
        <div className="container">
          <h2 className="section__heading">Nossa História</h2>
          <div className="history__grid">
            <div className="history__block">
              <div className="history__year">1867</div>
              <p className="history__text">
                Annabelle Merigold abre as portas da primeira loja no Beco da
                Última Saída com apenas três poções no estoque e uma caldeira
                herdada de sua avó.
              </p>
            </div>
            <div className="history__block">
              <div className="history__year">1923</div>
              <p className="history__text">
                A segunda geração da família Merigold expande o catálogo para
                mais de cinquenta fórmulas, incluindo a famosa Poção de Pinus,
                que virou lenda entre os bruxos mais altos do continente.
              </p>
            </div>
            <div className="history__block">
              <div className="history__year">1969</div>
              <p className="history__text">
                John Lennon adquire a Poção Blue Sky e credita o elixir como
                fonte de inspiração para uma de suas composições mais icônicas.
                A loja nunca mais foi a mesma.
              </p>
            </div>
            <div className="history__block">
              <div className="history__year">Hoje</div>
              <p className="history__text">
                Com um novo site e a mesma receita de excelência, Poções &
                Soluções chega à era digital para atender a clientes de todo o
                reino — e além.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Potions */}
      <section className="section section--potions">
        <div className="container">
          <h2 className="section__heading">Nossas Poções</h2>
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
            <p>Beco da Última Saída, nº 13 — Reino Encantado</p>
            <p>📜 contato@pocoesesolucoes.mgc</p>
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
