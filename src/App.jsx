import { useEffect, useMemo, useState } from "react";
import { Gem, Users, Search, LogOut, ShieldCheck, Trash2, Edit3, X, UserRound, Package, LayoutDashboard, ShoppingBag, Tags, Settings, Plus, Menu, Eye, Save } from "lucide-react";

const ADMIN_EMAIL = "admin123@gmail.com";
const ADMIN_PASSWORD = "admin123";
const PAGE_SIZE = 10;
const DEMO_CUSTOMERS = [
  { id:"demo-1",name:"Ayesha Khan",email:"ayesha.khan@example.com",phone:"+92 300 1234567",address:"Model Town",city:"Lahore",country:"Pakistan",createdAt:"2026-10-28T10:00:00Z" },
  { id:"demo-2",name:"Hamza Ali",email:"hamza.ali@example.com",phone:"+92 321 2345678",address:"Satellite Town",city:"Gujranwala",country:"Pakistan",createdAt:"2026-10-25T10:00:00Z" },
  { id:"demo-3",name:"Zara Ahmed",email:"zara.ahmed@example.com",phone:"+92 333 3456789",address:"DHA Phase 5",city:"Karachi",country:"Pakistan",createdAt:"2026-10-20T10:00:00Z" },
  { id:"demo-4",name:"Usman Raza",email:"usman.raza@example.com",phone:"+92 301 4567890",address:"People's Colony",city:"Faisalabad",country:"Pakistan",createdAt:"2026-10-15T10:00:00Z" },
  { id:"demo-5",name:"Maham Noor",email:"maham.noor@example.com",phone:"+92 345 5678901",address:"Gulberg",city:"Lahore",country:"Pakistan",createdAt:"2026-09-30T10:00:00Z" },
  { id:"demo-6",name:"Ali Hassan",email:"ali.hassan@example.com",phone:"+92 312 6789012",address:"Wapda Town",city:"Gujranwala",country:"Pakistan",createdAt:"2026-09-12T10:00:00Z" }
];
const INITIAL_PRODUCTS = [
  {id:"p-1",name:"Classic Gold Ring",category:"Rings",price:"18500",stock:"8",description:"Elegant everyday gold ring."},
  {id:"p-2",name:"Pearl Drop Earrings",category:"Earrings",price:"7200",stock:"14",description:"Pearl drop earrings for special occasions."},
  {id:"p-3",name:"Minimal Pendant Necklace",category:"Necklaces",price:"12500",stock:"5",description:"Minimal pendant necklace."}
];
const NAV = [
  {id:"dashboard",label:"Dashboard",icon:LayoutDashboard,group:"OVERVIEW"},
  {id:"customers",label:"Customers",icon:Users,group:"MANAGEMENT"},
  {id:"products",label:"Products",icon:Gem,group:"MANAGEMENT"},
  {id:"orders",label:"Orders",icon:ShoppingBag,group:"MANAGEMENT"},
  {id:"categories",label:"Categories",icon:Tags,group:"MANAGEMENT"},
  {id:"settings",label:"Settings",icon:Settings,group:"SYSTEM"}
];

function App() {
  const [admin,setAdmin] = useState(null);
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");
  const [active,setActive] = useState("dashboard");
  const [mobileMenu,setMobileMenu] = useState(false);
  const [customers,setCustomers] = useState(DEMO_CUSTOMERS);
  const [products,setProducts] = useState(INITIAL_PRODUCTS);
  const [search,setSearch] = useState("");
  const [page,setPage] = useState(1);
  const [notice,setNotice] = useState("");
  const [editCustomer,setEditCustomer] = useState(null);
  const [productForm,setProductForm] = useState(null);
  const [editingProduct,setEditingProduct] = useState(false);
  const [categoryForm,setCategoryForm] = useState("");
  const [categories,setCategories] = useState(["Rings","Earrings","Necklaces","Bracelets","Sets"]);
  const [settingsSaved,setSettingsSaved] = useState(false);

  const filteredCustomers = useMemo(() => {
    const term=search.trim().toLowerCase();
    return customers.filter(c=>!term||[c.name,c.email,c.phone,c.city].some(v=>(v||"").toLowerCase().includes(term)));
  },[customers,search]);
  const filteredProducts = useMemo(() => {
    const term=search.trim().toLowerCase();
    return products.filter(p=>!term||[p.name,p.category,p.description].some(v=>(v||"").toLowerCase().includes(term)));
  },[products,search]);
  const pages=Math.max(1,Math.ceil(filteredCustomers.length/PAGE_SIZE));
  const visibleCustomers=filteredCustomers.slice((page-1)*PAGE_SIZE,page*PAGE_SIZE);
  useEffect(()=>{setPage(1);},[search,active]);

  const login=e=>{e.preventDefault();setError("");if(email.trim().toLowerCase()!==ADMIN_EMAIL||password!==ADMIN_PASSWORD){setError("Invalid email or password.");return;}setAdmin({email:ADMIN_EMAIL,name:"Administrator"});setPassword("");};
  const signout=()=>{setAdmin(null);setEmail("");setPassword("");setSearch("");setActive("dashboard");setMobileMenu(false);};
  const flash=msg=>{setNotice(msg);window.setTimeout(()=>setNotice(""),4500);};
  const deleteCustomer=id=>{if(!window.confirm("Delete this demo customer from the current session?"))return;setCustomers(prev=>prev.filter(c=>c.id!==id));flash("Demo customer removed. This change resets on refresh.");};
  const saveCustomer=e=>{e.preventDefault();setCustomers(prev=>prev.map(c=>c.id===editCustomer.id?editCustomer:c));setEditCustomer(null);flash("Customer updated in this demo session only.");};
  const saveProduct=e=>{e.preventDefault();if(editingProduct){setProducts(prev=>prev.map(p=>p.id===productForm.id?productForm:p));flash("Product updated in this demo session.");}else{setProducts(prev=>[{...productForm,id:"p-"+Date.now()},...prev]);flash("Product added to the demo catalogue. It will reset on refresh.");}setProductForm(null);setEditingProduct(false);};
  const openNewProduct=()=>{setEditingProduct(false);setProductForm({name:"",category:categories[0]||"Rings",price:"",stock:"",description:""});};
  const removeProduct=id=>{if(window.confirm("Remove this demo product?")){setProducts(prev=>prev.filter(p=>p.id!==id));flash("Demo product removed.");}};
  const resetDemo=()=>{setCustomers(DEMO_CUSTOMERS);setProducts(INITIAL_PRODUCTS);setCategories(["Rings","Earrings","Necklaces","Bracelets","Sets"]);setSearch("");setPage(1);flash("Demo data reset to the original sample records.");};

  if(!admin)return <main className="login-shell"><form className="login-card" onSubmit={login}><img src="https://raw.githubusercontent.com/khizarusestate/Eman-Jewelers/main/public/images/Logo.png" alt="Eman Jewelers logo" className="login-logo"/><p className="eyebrow">EMAN JEWELERS • PRIVATE ACCESS</p><h1>Admin sign in</h1><p className="muted">Temporary frontend demo access. No backend connection required.</p>{error&&<div className="alert">{error}</div>}<label>Email address<input type="email" required autoComplete="username" value={email} onChange={e=>setEmail(e.target.value)}/></label><label>Password<input type="password" required autoComplete="current-password" value={password} onChange={e=>setPassword(e.target.value)}/></label><button className="gold-btn" type="submit">Login</button></form></main>;

  const current= NAV.find(n=>n.id===active)||NAV[0];
  const PageIcon=current.icon;
  const changePage=id=>{setActive(id);setSearch("");setMobileMenu(false);};

  return <main className="app-shell">
    <aside className={"sidebar "+(mobileMenu?"sidebar-open":"")}>
      <div className="brand"><img src="https://raw.githubusercontent.com/khizarusestate/Eman-Jewelers/main/public/images/Logo.png" alt="Eman Jewelers logo" className="nav-logo"/><span>EMAN <b>ADMIN</b></span><button className="mobile-close" onClick={()=>setMobileMenu(false)} aria-label="Close menu"><X size={19}/></button></div>
      <div className="menu-caption">WORKSPACE</div>
      {["OVERVIEW","MANAGEMENT","SYSTEM"].map(group=><div className="nav-group" key={group}><p className="nav-group-title">{group}</p>{NAV.filter(n=>n.group===group).map(n=>{const Icon=n.icon;return <button key={n.id} className={"nav-item "+(active===n.id?"nav-item-active":"")} onClick={()=>changePage(n.id)}><Icon size={17}/><span>{n.label}</span>{n.id==="products"&&<small>{products.length}</small>}</button>})}</div>)}
      <div className="sidebar-bottom"><div className="demo-indicator"><ShieldCheck size={16}/><span><b>Demo mode</b><small>Changes are not permanent</small></span></div><div className="admin-profile"><div className="avatar">A</div><div className="admin-meta"><b>Administrator</b><small>{admin.email}</small></div><button className="signout-menu" title="Sign out" onClick={signout}><LogOut size={17}/></button></div></div>
    </aside>
    {mobileMenu&&<button className="mobile-scrim" aria-label="Close navigation" onClick={()=>setMobileMenu(false)}/>}
    <section className="workspace">
      <header className="topbar"><div className="heading-wrap"><button className="menu-toggle" onClick={()=>setMobileMenu(true)} aria-label="Open menu"><Menu size={21}/></button><div><p className="eyebrow">EMAN JEWELERS / {current.label.toUpperCase()}</p><h1>{active==="dashboard"?"Dashboard overview":current.label}</h1></div></div><div className="topbar-actions"><span className="status-pill"><i/> Store admin</span>{active==="products"&&<button className="gold-btn compact-btn" onClick={openNewProduct}><Plus size={16}/> Add product</button>}</div></header>
      {notice&&<div className="success">{notice}<button onClick={()=>setNotice("")}><X size={15}/></button></div>}
      <div className="alert"><ShieldCheck size={16}/><span><b>Frontend demo only.</b> Sample data is used; changes reset on refresh. No backend, real products, orders or customer records are connected.</span></div>
      {active==="dashboard"&&<><div className="welcome-row"><div><h2>Welcome back, Administrator</h2><p className="muted">Here’s a quick overview of your store workspace.</p></div><button className="ghost-btn" onClick={()=>changePage("products")}><Package size={16}/> Manage catalogue</button></div><div className="stats"><article><Users/><span>Total customers</span><strong>{customers.length}</strong><small className="stat-foot">Sample customer records</small></article><article><Gem/><span>Catalogue products</span><strong>{products.length}</strong><small className="stat-foot">Demo products</small></article><article><ShoppingBag/><span>Total orders</span><strong>0</strong><small className="stat-foot">Order backend not connected</small></article></div><div className="section-title"><div><h2>Quick access</h2><p className="muted">Jump straight to a management area.</p></div></div><div className="quick-grid">{NAV.filter(n=>n.id!=="dashboard").map(n=>{const Icon=n.icon;return <button key={n.id} className="quick-card" onClick={()=>changePage(n.id)}><span className="quick-icon"><Icon size={21}/></span><span><b>{n.label}</b><small>{({customers:"View and manage sample accounts",products:"Add, edit and remove demo products",orders:"Order management placeholder",categories:"Organize product categories",settings:"Store preferences and demo controls"})[n.id]}</small></span><span className="quick-arrow">↗</span></button>})}</div><div className="table-card reset-card"><div><h2>Demo data controls</h2><p className="muted">Restore the original sample customers, products and categories.</p></div><button className="ghost-btn" onClick={resetDemo}>Reset demo data</button></div></>}
      {active==="customers"&&<div className="table-card"><div className="table-head"><div><h2>Customer accounts</h2><p className="muted">Browse, search and edit sample customer profiles.</p></div><div className="search"><Search size={17}/><input placeholder="Search name, email or city…" value={search} onChange={e=>setSearch(e.target.value)}/></div></div><div className="table-wrap"><table><thead><tr><th>Customer</th><th>Contact</th><th>Joined</th><th>Actions</th></tr></thead><tbody>{visibleCustomers.map(c=><tr key={c.id}><td><b>{c.name}</b><small>{c.email}</small></td><td>{c.phone||"—"}</td><td>{new Date(c.createdAt).toLocaleDateString()}</td><td><button className="icon-btn" title="View and edit" onClick={()=>setEditCustomer({...c})}><Edit3 size={16}/></button><button className="icon-btn danger" title="Delete demo customer" onClick={()=>deleteCustomer(c.id)}><Trash2 size={16}/></button></td></tr>)}{!visibleCustomers.length&&<tr><td colSpan="4" className="empty">No customers match your search.</td></tr>}</tbody></table></div><footer className="pagination"><span>{filteredCustomers.length} demo records · Page {page} of {pages}</span><div><button disabled={page<=1} onClick={()=>setPage(p=>p-1)}>Previous</button><button disabled={page>=pages} onClick={()=>setPage(p=>p+1)}>Next</button></div></footer></div>}
      {active==="products"&&<div className="table-card"><div className="table-head"><div><h2>Product catalogue</h2><p className="muted">Add a product, update details or remove a demo item.</p></div><div className="search"><Search size={17}/><input placeholder="Search products or categories…" value={search} onChange={e=>setSearch(e.target.value)}/></div></div><div className="table-wrap"><table><thead><tr><th>Product</th><th>Category</th><th>Price (PKR)</th><th>Stock</th><th>Actions</th></tr></thead><tbody>{filteredProducts.map(p=><tr key={p.id}><td><b>{p.name}</b><small>{p.description||"No description"}</small></td><td>{p.category}</td><td>{Number(p.price||0).toLocaleString("en-PK")}</td><td><span className="stock-pill">{p.stock||0} units</span></td><td><button className="icon-btn" title="Edit product" onClick={()=>{setProductForm({...p});setEditingProduct(true);}}><Edit3 size={16}/></button><button className="icon-btn danger" title="Delete product" onClick={()=>removeProduct(p.id)}><Trash2 size={16}/></button></td></tr>)}{!filteredProducts.length&&<tr><td colSpan="5" className="empty">No products found. Use “Add product” to create one.</td></tr>}</tbody></table></div><footer className="pagination"><span>{filteredProducts.length} demo products</span><button className="gold-btn compact-btn" onClick={openNewProduct}><Plus size={15}/> Add product</button></footer></div>}
      {active==="orders"&&<div className="placeholder-panel"><span className="placeholder-icon"><ShoppingBag size={27}/></span><p className="eyebrow">ORDER MANAGEMENT</p><h2>Orders workspace is ready for integration</h2><p className="muted">This section is prepared for order lists, order details, payment status, fulfilment status and customer order history. Real orders will appear after the backend and checkout flow are connected.</p><div className="placeholder-steps"><span>01 <b>Order list</b><small>Search and filter orders</small></span><span>02 <b>Order details</b><small>Items, totals and address</small></span><span>03 <b>Status updates</b><small>Processing to delivered</small></span></div></div>}
      {active==="categories"&&<div className="table-card"><div className="table-head"><div><h2>Product categories</h2><p className="muted">Manage the category options available in the product form.</p></div></div><form className="category-add" onSubmit={e=>{e.preventDefault();const v=categoryForm.trim();if(!v)return;if(categories.some(c=>c.toLowerCase()===v.toLowerCase())){flash("That category already exists.");return;}setCategories(prev=>[...prev,v]);setCategoryForm("");flash("Category added for this demo session.");}}><input value={categoryForm} onChange={e=>setCategoryForm(e.target.value)} placeholder="New category name" required/><button className="gold-btn compact-btn" type="submit"><Plus size={15}/> Add category</button></form><div className="category-list">{categories.map(cat=><div className="category-row" key={cat}><span className="category-symbol"><Tags size={17}/></span><b>{cat}</b><span className="category-count">{products.filter(p=>p.category===cat).length} products</span><button className="icon-btn danger" title={"Remove "+cat} onClick={()=>{if(products.some(p=>p.category===cat)){flash("Move or remove products in this category before deleting it.");return;}setCategories(prev=>prev.filter(c=>c!==cat));flash("Category removed from demo session.");}}><Trash2 size={16}/></button></div>)}</div></div>}
      {active==="settings"&&<div className="settings-grid"><div className="table-card settings-card"><p className="eyebrow">STORE CONFIGURATION</p><h2>Store preferences</h2><p className="muted">Preview of settings that can be wired to the backend later.</p><label>Store name<input defaultValue="Eman Jewelers" /></label><label>Support email<input type="email" defaultValue="support@emanjewelers.com" /></label><label>Currency<select defaultValue="PKR"><option value="PKR">PKR — Pakistani Rupee</option><option value="AED">AED — UAE Dirham</option><option value="USD">USD — US Dollar</option></select></label><button className="gold-btn compact-btn" onClick={()=>{setSettingsSaved(true);flash("Settings preview saved for this screen only.");}}><Save size={15}/> Save preferences</button>{settingsSaved&&<p className="muted">Preview saved in this session only; it is not persisted.</p>}</div><div className="table-card settings-card"><p className="eyebrow">ACCESS & DATA</p><h2>Demo controls</h2><p className="muted">This admin interface currently uses local sample data and hardcoded demo credentials.</p><div className="settings-info"><ShieldCheck size={18}/><span><b>Frontend-only authentication</b><small>Do not use these credentials for production.</small></span></div><button className="ghost-btn" onClick={resetDemo}>Reset all sample data</button><button className="ghost-btn" onClick={signout}><LogOut size={16}/> Sign out</button></div></div>}
      <p className="muted signed">Signed in as {admin.email} · Frontend demo</p>
    </section>
    {editCustomer&&<div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)setEditCustomer(null);}}><form className="edit-modal" onSubmit={saveCustomer}><button type="button" className="close" onClick={()=>setEditCustomer(null)}><X/></button><p className="eyebrow">DEMO CUSTOMER PROFILE</p><h2>Edit customer</h2>{["name","email","phone","address","city","country"].map(k=><label key={k}>{k[0].toUpperCase()+k.slice(1)}<input required={k==="name"} type={k==="email"?"email":"text"} value={editCustomer[k]||""} onChange={e=>setEditCustomer({...editCustomer,[k]:e.target.value})}/></label>)}<div className="modal-actions"><button type="button" className="ghost-btn" onClick={()=>setEditCustomer(null)}>Cancel</button><button className="gold-btn" type="submit">Save changes</button></div></form></div>}
    {productForm&&<div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget){setProductForm(null);setEditingProduct(false);}}}><form className="edit-modal product-modal" onSubmit={saveProduct}><button type="button" className="close" onClick={()=>{setProductForm(null);setEditingProduct(false);}}><X/></button><p className="eyebrow">CATALOGUE MANAGEMENT</p><h2>{editingProduct?"Edit product":"Add new product"}</h2><p className="muted">Fill in the product details below. This demo saves locally until refresh.</p><label>Product name *<input required value={productForm.name} onChange={e=>setProductForm({...productForm,name:e.target.value})} placeholder="e.g. Gold necklace"/></label><label>Category<select value={productForm.category} onChange={e=>setProductForm({...productForm,category:e.target.value})}>{categories.map(c=><option key={c} value={c}>{c}</option>)}</select></label><div className="form-two"><label>Price (PKR) *<input required type="number" min="0" value={productForm.price} onChange={e=>setProductForm({...productForm,price:e.target.value})} placeholder="0"/></label><label>Stock quantity *<input required type="number" min="0" value={productForm.stock} onChange={e=>setProductForm({...productForm,stock:e.target.value})} placeholder="0"/></label></div><label>Description<textarea rows="3" value={productForm.description} onChange={e=>setProductForm({...productForm,description:e.target.value})} placeholder="Product details…"/></label><div className="modal-actions"><button type="button" className="ghost-btn" onClick={()=>{setProductForm(null);setEditingProduct(false);}}>Cancel</button><button className="gold-btn" type="submit"><Save size={15}/> {editingProduct?"Save changes":"Add product"}</button></div></form></div>}
  </main>;
}
export default App;
