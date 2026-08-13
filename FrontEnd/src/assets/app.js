
function icon(name){
 const p={
  dashboard:`<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="7" height="7" rx="1.2"/><rect x="14" y="3" width="7" height="7" rx="1.2"/><rect x="3" y="14" width="7" height="7" rx="1.2"/><rect x="14" y="14" width="7" height="7" rx="1.2"/></svg>`,
  inbox:`<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 5h16v14H4z"/><path d="M4 15h4l2 3h4l2-3h4"/></svg>`,
  trends:`<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 17l5-5 4 3 7-8"/><path d="M16 7h4v4"/></svg>`,
  ask:`<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5H7l-4 2 1.7-4A7.5 7.5 0 1 1 20 11.5Z"/><path d="M8 11h.01M12 11h.01M16 11h.01"/></svg>`,
  reports:`<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 3h9l3 3v15H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/></svg>`,
  settings:`<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z"/><path d="m19.4 15 .1.1a1.8 1.8 0 0 1-2.5 2.5l-.1-.1a1.8 1.8 0 0 0-3.1 1v.2a1.8 1.8 0 0 1-3.6 0v-.2a1.8 1.8 0 0 0-3.1-1l-.1.1a1.8 1.8 0 1 1-2.5-2.5l.1-.1a1.8 1.8 0 0 0-1-3.1h-.2a1.8 1.8 0 1 1 0-3.6h.2a1.8 1.8 0 0 0 1-3.1l-.1-.1a1.8 1.8 0 0 1 2.5-2.5l.1.1a1.8 1.8 0 0 0 3.1-1v-.2a1.8 1.8 0 0 1 3.6 0v.2a1.8 1.8 0 0 0 3.1 1l.1-.1a1.8 1.8 0 1 1 2.5 2.5l-.1.1a1.8 1.8 0 0 0 1 3.1h.2a1.8 1.8 0 1 1 0 3.6h-.2a1.8 1.8 0 0 0-1 3.1Z"/></svg>`,
  search:`<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4 4"/></svg>`,
  bell:`<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/></svg>`,
  plus:`<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>`,
  upload:`<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 20V9M8 13l4-4 4 4M5 4h14"/></svg>`,
  download:`<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 4v11M8 11l4 4 4-4M5 20h14"/></svg>`,
  close:`<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m6 6 12 12M18 6 6 18"/></svg>`,
  spark:`<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z"/><path d="m19 16 .7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z"/></svg>`
 };
 return p[name]||"";
}

function shell(active,title){
 const items=[
  ["dashboard.html","Dashboard","dashboard"],
  ["inbox.html","Feedback Inbox","inbox"],
  ["trends.html","Themes & Trends","trends"],
  ["ask.html","Ask LOOP","ask"],
  ["reports.html","VoC Reports","reports"],
  ["settings.html","Settings","settings"]
 ];
 return `<div class="app">
 <aside class="sidebar">
  <div class="brand"><div class="brand-mark">L</div><div><div class="brand-name">LOOP</div><span class="brand-sub">Customer Intelligence</span></div></div>
  <div class="nav-section">Workspace</div>
  <nav class="nav">${items.map(x=>`<a href="${x[0]}" class="${active===x[1]?"active":""}">${icon(x[2])}<span>${x[1]}</span></a>`).join("")}</nav>
  <div class="sidebar-spacer"></div>
  <div class="workspace-card"><div class="label">Current workspace</div><div class="workspace-row">Acme Inc. <span>⌄</span></div></div>
  <div class="profile"><div class="avatar">AH</div><div><strong>Ainul Haq</strong><small>Admin</small></div></div>
 </aside>
 <main class="main">
  <header class="topbar"><div class="breadcrumb">Acme Inc. <span style="margin:0 5px">/</span> <strong>${title}</strong></div><div class="top-right"><button class="icon-btn" aria-label="Search">${icon("search")}</button><button class="icon-btn" aria-label="Notifications">${icon("bell")}</button><div class="top-avatar">AH</div></div></header>
  <section class="content"></section>
 </main>
 <nav class="mobile-bottom">${items.slice(0,5).map(x=>`<a href="${x[0]}" class="${active===x[1]?"active":""}">${icon(x[2])}<span>${x[1].replace("Feedback ","").replace("Themes & ","").replace("VoC ","")}</span></a>`).join("")}</nav>
 </div>`;
}

function toast(message,type="success"){
 let t=document.querySelector(".toast"); if(t)t.remove();
 t=document.createElement("div"); t.className="toast";
 t.innerHTML=`<span style="color:${type==="error"?"#ff8790":"#7fe4ba"}">●</span>${message}`;
 document.body.appendChild(t); setTimeout(()=>t.remove(),2400);
}
function openModal(id){document.getElementById(id)?.classList.add("open")}
function closeModal(id){document.getElementById(id)?.classList.remove("open")}
function statusBadge(status){return `<span class="badge ${status.toLowerCase()}">${status}</span>`}
function sentimentBadge(s){return `<span class="badge ${s}">${s}</span>`}
function esc(s){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[m]))}

document.addEventListener("click",e=>{
 const action=e.target.closest("[data-toast]");
 if(action){toast(action.dataset.toast);return}
 const close=e.target.closest("[data-close]");
 if(close) closeModal(close.dataset.close);
});
