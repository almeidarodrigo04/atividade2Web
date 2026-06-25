import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AdminPotionRow from "../components/AdminPotionRow";

const API = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

const emptyForm = { name: "", description: "", image: "", price: "" };

const Admin = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const [potions, setPotions] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState(null);
  const [formSuccess, setFormSuccess] = useState(null);
  const [loading, setLoading] = useState(true);

  const authHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const fetchPotions = () => {
    setLoading(true);
    fetch(`${API}/potions`)
      .then((res) => res.json())
      .then((data) => setPotions(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPotions();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);

    const { name, description, image, price } = form;
    if (!name || !description || !image || !price) {
      setFormError("Todos os campos são obrigatórios.");
      return;
    }

    try {
      const res = await fetch(`${API}/potions`, {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify({ name, description, image, price: parseFloat(price) }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Erro ao cadastrar poção.");

      setFormSuccess("Poção cadastrada com sucesso!");
      setForm(emptyForm);
      fetchPotions();
    } catch (err) {
      setFormError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza que deseja remover esta poção?")) return;

    try {
      const res = await fetch(`${API}/potions/${id}`, {
        method: "DELETE",
        headers: authHeaders,
      });

      if (!res.ok) throw new Error("Erro ao remover poção.");

      fetchPotions();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="admin-page">
      <header className="admin-header">
        <h1 className="admin-header__title">⚗️ Painel de Administração</h1>
        <div className="admin-header__actions">
          <button className="btn btn--ghost" onClick={() => navigate("/")}>
            Ver loja
          </button>
          <button className="btn btn--danger" onClick={handleLogout}>
            Sair
          </button>
        </div>
      </header>

      <main className="admin-main container">
        {/* Register Form */}
        <section className="admin-section">
          <h2 className="admin-section__title">Cadastrar Nova Poção</h2>
          <div className="admin-form">
            <div className="admin-form__row">
              <div className="admin-form__group">
                <label className="form-label" htmlFor="name">
                  Nome
                </label>
                <input
                  id="name"
                  name="name"
                  className="form-input"
                  placeholder="Ex: Poção do Dragão"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>
              <div className="admin-form__group">
                <label className="form-label" htmlFor="price">
                  Preço (moedas)
                </label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  className="form-input"
                  placeholder="Ex: 250"
                  value={form.price}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="admin-form__group">
              <label className="form-label" htmlFor="image">
                URL da Imagem
              </label>
              <input
                id="image"
                name="image"
                className="form-input"
                placeholder="https://..."
                value={form.image}
                onChange={handleChange}
              />
            </div>
            <div className="admin-form__group">
              <label className="form-label" htmlFor="description">
                Descrição
              </label>
              <textarea
                id="description"
                name="description"
                className="form-input form-input--textarea"
                placeholder="Descreva os efeitos da poção..."
                value={form.description}
                onChange={handleChange}
                rows={3}
              />
            </div>
            {formError && <p className="form-error">{formError}</p>}
            {formSuccess && <p className="form-success">{formSuccess}</p>}
            <button className="btn btn--primary" onClick={handleCreate}>
              Cadastrar Poção
            </button>
          </div>
        </section>

        {/* Potion List */}
        <section className="admin-section">
          <h2 className="admin-section__title">
            Poções Cadastradas ({potions.length})
          </h2>
          {loading ? (
            <p className="status-msg">Carregando...</p>
          ) : potions.length === 0 ? (
            <p className="status-msg">Nenhuma poção cadastrada.</p>
          ) : (
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th className="admin-table__head">Imagem</th>
                    <th className="admin-table__head">Nome</th>
                    <th className="admin-table__head">Descrição</th>
                    <th className="admin-table__head">Preço</th>
                    <th className="admin-table__head">Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {potions.map((p) => (
                    <AdminPotionRow key={p.id} potion={p} onDelete={handleDelete} />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Admin;
