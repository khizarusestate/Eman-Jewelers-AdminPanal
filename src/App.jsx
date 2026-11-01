import { useEffect, useMemo, useState } from "react";
import { Gem, Users, Search, LogOut, ShieldCheck, Trash2, Edit3, X, UserRound, Package, LayoutDashboard } from "lucide-react";

const ADMIN_EMAIL = "admin123@gmail.com";
const ADMIN_PASSWORD = "admin123";
const PAGE_SIZE = 10;

// Temporary demo data: frontend-only until the backend is added.
const DEMO_CUSTOMERS = [
  { id: "demo-1", name: "Ayesha Khan", email: "ayesha.khan@example.com", phone: "+92 300 1234567", address: "Model Town", city: "Lahore", country: "Pakistan", createdAt: "2026-10-28T10:00:00Z" },
  { id: "demo-2", name: "Hamza Ali", email: "hamza.ali@example.com", phone: "+92 321 2345678", address: "Satellite Town", city: "Gujranwala", country: "Pakistan", createdAt: "2026-10-25T10:00:00Z" },
  { id: "demo-3", name: "Zara Ahmed", email: "zara.ahmed@example.com", phone: "+92 333 3456789", address: "DHA Phase 5", city: "Karachi", country: "Pakistan", createdAt: "2026-10-20T10:00:00Z" },
  { id: "demo-4", name: "Usman Raza", email: "usman.raza@example.com", phone: "+92 301 4567890", address: "People's Colony", city: "Faisalabad", country: "Pakistan", createdAt: "2026-10-15T10:00:00Z" },
  { id: "demo-5", name: "Maham Noor", email: "maham.noor@example.com", phone: "+92 345 5678901", address: "Gulberg", city: "Lahore", country: "Pakistan", createdAt: "2026-09-30T10:00:00Z" },
  { id: "demo-6", name: "Ali Hassan", email: "ali.hassan@example.com", phone: "+92 312 6789012", address: "Wapda Town", city: "Gujranwala", country: "Pakistan", createdAt: "2026-09-12T10:00:00Z" }
];

function App() {
  const [admin, setAdmin] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [customers, setCustomers] = useState(DEMO_CUSTOMERS);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [notice, setNotice] = useState("");
  const [selected, setSelected] = useState(null);
  const [edit, setEdit] = useState(null);

  const filteredCustomers = useMemo(() => {
    const term = search.trim().toLowerCase();
    return customers.filter(c => !term || [c.name, c.email, c.phone, c.city].some(v => (v || "").toLowerCase().includes(term)));
  }, [customers, search]);
  const pages = Math.max(1, Math.ceil(filteredCustomers.length / PAGE_SIZE));
  const visibleCustomers = filteredCustomers.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const recentCount = customers.filter(c => Date.now() - new Date(c.createdAt).getTime() <= 30 * 86400000).length;

  useEffect(() => { setPage(1); }, [search]);

  const login = e => {
    e.preventDefault();
    setError("");
    if (email.trim().toLowerCase() !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      setError("Invalid email or password.");
      return;
    }
    setAdmin({ email: ADMIN_EMAIL, name: "Administrator" });
    setPassword("");
  };
  const signout = () => {
    setAdmin(null);
    setEmail("");
    setPassword("");
    setSearch("");
    setError("");
  };
  const remove = id => {
    if (!window.confirm("Delete this demo customer from the current session?")) return;
    setCustomers(prev => prev.filter(c => c.id !== id));
    setSelected(null);
    setEdit(null);
    setNotice("Demo customer removed. This change is temporary and will reset on refresh.");
  };
  const save = e => {
    e.preventDefault();
    setCustomers(prev => prev.map(c => c.id === edit.id ? { ...edit } : c));
    setSelected(null);
    setEdit(null);
    setNotice("Demo customer updated. This change is temporary and will reset on refresh.");
  };

  if (!admin) return (
    <main className="login-shell">
      <form className="login-card" onSubmit={login}>
        <img src="https://raw.githubusercontent.com/khizarusestate/Eman-Jewelers/main/public/images/Logo.png" alt="Eman Jewelers logo" className="login-logo" />
        <p className="eyebrow">EMAN JEWELERS • PRIVATE ACCESS</p>
        <h1>Admin sign in</h1>
        <p className="muted">Temporary frontend demo access. No backend connection required.</p>
        {error && <div className="alert">{error}</div>}
        <label>Email address<input type="email" required autoComplete="username" value={email} onChange={e => setEmail(e.target.value)} /></label>
        <label>Password<input type="password" required autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} /></label>
        <button className="gold-btn" type="submit">Login</button>
      </form>
    </main>
  );

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand"><img src="https://raw.githubusercontent.com/khizarusestate/Eman-Jewelers/main/public/images/Logo.png" alt="Eman Jewelers logo" className="nav-logo" /><span>EMAN <b>ADMIN</b></span></div>
        <div className="side-active"><LayoutDashboard size={18} /> Dashboard</div>
        <div className="side-active"><Users size={18} /> Customers</div>
        <div className="side-foot"><ShieldCheck size={16} /> Temporary demo mode</div>
      </aside>
      <section className="workspace">
        <header className="topbar">
          <div><p className="eyebrow">MANAGEMENT CONSOLE</p><h1>Dashboard overview</h1></div>
          <button className="ghost-btn" onClick={signout}><LogOut size={16} /> Sign out</button>
        </header>
        <div className="alert"><ShieldCheck size={16} /> Frontend demo only — sample data is used. Changes reset when the page refreshes; no backend or real customer records are connected.</div>
        {notice && <div className="success">{notice}<button onClick={() => setNotice("")}><X size={15} /></button></div>}
        <div className="stats">
          <article><Users /><span>Total customers</span><strong>{customers.length}</strong></article>
          <article><UserRound /><span>Joined in last 30 days</span><strong>{recentCount}</strong></article>
          <article><Package /><span>Orders</span><strong>0</strong></article>
        </div>
        <div className="table-card">
          <div className="table-head">
            <div><h2>Customer accounts</h2><p className="muted">Sample records to preview the management UI.</p></div>
            <div className="search"><Search size={17} /><input placeholder="Search name, email or city…" value={search} onChange={e => setSearch(e.target.value)} /></div>
          </div>
          <div className="table-wrap">
            <table><thead><tr><th>Customer</th><th>Contact</th><th>Joined</th><th>Actions</th></tr></thead>
              <tbody>
                {visibleCustomers.map(c => <tr key={c.id}><td><b>{c.name}</b><small>{c.email}</small></td><td>{c.phone || "—"}</td><td>{new Date(c.createdAt).toLocaleDateString()}</td><td><button className="icon-btn" title="View and edit" onClick={() => { setSelected(c); setEdit({ ...c }); }}><Edit3 size={16} /></button><button className="icon-btn danger" title="Delete demo customer" onClick={() => remove(c.id)}><Trash2 size={16} /></button></td></tr>)}
                {!visibleCustomers.length && <tr><td colSpan="4" className="empty">No customers match your search.</td></tr>}
              </tbody>
            </table>
          </div>
          <footer className="pagination"><span>{filteredCustomers.length} demo records · Page {page} of {pages}</span><div><button disabled={page <= 1} onClick={() => setPage(p => p - 1)}>Previous</button><button disabled={page >= pages} onClick={() => setPage(p => p + 1)}>Next</button><button onClick={() => { setCustomers(DEMO_CUSTOMERS); setSearch(""); setPage(1); setNotice("Demo data reset."); }}>Reset demo data</button></div></footer>
        </div>
        <p className="muted signed">Signed in as {admin.email}</p>
      </section>
      {selected && edit && <div className="modal-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) { setSelected(null); setEdit(null); } }}>
        <form className="edit-modal" onSubmit={save}>
          <button type="button" className="close" onClick={() => { setSelected(null); setEdit(null); }}><X /></button>
          <p className="eyebrow">DEMO CUSTOMER PROFILE</p><h2>Edit customer</h2>
          {["name", "email", "phone", "address", "city", "country"].map(k => <label key={k}>{k[0].toUpperCase() + k.slice(1)}<input required={k === "name"} type={k === "email" ? "email" : "text"} value={edit[k] || ""} onChange={e => setEdit({ ...edit, [k]: e.target.value })} /></label>)}
          <div className="modal-actions"><button type="button" className="ghost-btn" onClick={() => { setSelected(null); setEdit(null); }}>Cancel</button><button className="gold-btn" type="submit">Save changes</button></div>
        </form>
      </div>}
    </main>
  );
}
export default App;
