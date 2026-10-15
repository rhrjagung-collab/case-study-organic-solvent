/* ============================================================
   Pelarut Organik — Studi Kasus Toksikologi Industri
   Router + renderer + quiz engine (vanilla, tanpa dependensi)
   ============================================================ */

(function () {
  "use strict";

  /* ---------- State & storage ---------- */
  const SKEY = "tosol-progress-v1";
  let state = loadState();

  function loadState() {
    try {
      const raw = localStorage.getItem(SKEY);
      if (raw) return JSON.parse(raw);
    } catch (e) { /* ignore */ }
    return { quiz: {}, visited: [] };
  }
  function saveState() {
    try { localStorage.setItem(SKEY, JSON.stringify(state)); } catch (e) { /* ignore */ }
  }

  function markVisited(id) {
    if (!state.visited.includes(id)) { state.visited.push(id); saveState(); }
  }

  function quizScore(unitId) {
    const q = state.quiz[unitId];
    return q ? { done: q.done, correct: q.correct, total: q.total } : null;
  }
  function unitDone(u) {
    const s = quizScore(u);
    return s && s.done && s.correct >= Math.ceil(s.total * 0.6);
  }
  function overallProgress() {
    const all = MODULE.units.map(u => u.id).concat(["A"]);
    const done = all.filter(id => unitDone(id)).length;
    return Math.round((done / all.length) * 100);
  }

  /* ---------- Router ---------- */
  function route() {
    const hash = location.hash.replace(/^#\/?/, "") || "";
    closeMenu();
    closeGloss();
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
    const page = document.getElementById("page");
    const crumb = document.getElementById("topbarCrumb");

    if (!hash) { renderHome(page); crumb.innerHTML = "Beranda"; }
    else if (hash === "referensi") { renderRefs(page); crumb.innerHTML = "Referensi"; }
    else if (hash === "kamus") { renderGlossary(page); crumb.innerHTML = "Kamus Istilah"; }
    else if (hash === "asesmen") { renderAssessment(page); crumb.innerHTML = "Asesmen Akhir"; }
    else {
      const m = hash.match(/^unit\/(\d+)$/);
      if (m) {
        const u = MODULE.units.find(x => x.id === +m[1]);
        if (u) { renderUnit(page, u); crumb.innerHTML = "Unit " + u.id + " · <b>" + u.title + "</b>"; markVisited(u.id); }
        else page.innerHTML = '<p>Unit tidak ditemukan. <a href="#/">Kembali ke beranda</a>.</p>';
      } else {
        renderHome(page); crumb.innerHTML = "Beranda";
      }
    }
    renderNav(); updateProgress();
    initReveals(page);
  }

  /* ---------- Sidebar nav ---------- */
  function renderNav() {
    const nav = document.getElementById("unitNav");
    let html = '<div class="nav-label">Perjalanan modul</div>';
    html += `<a class="nav-item" data-nav="home" href="#/"><span class="n-ico">◈</span> Beranda</a>`;
    MODULE.units.forEach(u => {
      const done = unitDone(u.id);
      html += `<a class="nav-item ${done ? "done" : ""}" data-nav="unit-1" href="#/unit/${u.id}">
        <span class="n-ico">${u.icon}</span> ${u.short}
        <span class="n-check">✓</span></a>`;
    });
    html += `<div class="nav-sec">Ujian &amp; rujukan</div>`;
    const aDone = unitDone("A");
    html += `<a class="nav-item ${aDone ? "done" : ""}" data-nav="asesmen" href="#/asesmen"><span class="n-ico">A</span> Asesmen Akhir<span class="n-check">✓</span></a>`;
    html += `<a class="nav-item" data-nav="referensi" href="#/referensi"><span class="n-ico">≡</span> Referensi</a>`;
    html += `<a class="nav-item" data-nav="kamus" href="#/kamus"><span class="n-ico">Aa</span> Kamus Istilah</a>`;
    nav.innerHTML = html;
    // highlight active
    const path = location.hash.replace(/^#\/?/, "");
    nav.querySelectorAll(".nav-item").forEach(a => {
      a.classList.toggle("active",
        (path === "" && a.getAttribute("href") === "#/") ||
        (path === "referensi" && a.getAttribute("href") === "#/referensi") ||
        (path === "asesmen" && a.getAttribute("href") === "#/asesmen") ||
        (path === "kamus" && a.getAttribute("href") === "#/kamus") ||
        (path === "unit/" + (a.getAttribute("href") || "").split("/").pop() && a.getAttribute("href").startsWith("#/unit/"))
      );
    });
  }

  function updateProgress() {
    const pct = overallProgress();
    document.getElementById("progressFill").style.width = pct + "%";
    document.getElementById("progressNum").textContent = pct + "%";
    const all = MODULE.units.length + 1;
    const done = MODULE.units.filter(u => unitDone(u.id)).length + (unitDone("A") ? 1 : 0);
    document.getElementById("progressLabel").textContent =
      done === 0 ? "Belum dimulai" : done + " dari " + all + " bagian selesai";
  }

  /* ---------- Kamus istilah (hotspot) ---------- */
  const GLOSS = MODULE.glossary || {};

  // Ubah token {{slug}} di dalam teks menjadi tombol hotspot. Memakai
  // <span role="button"> (bukan <button>) agar tetap legal di dalam tombol
  // lain: pilihan kuis, chip match, judul accordion, flip-card, dsb.
  function applyGlossary(root) {
    if (!root || !Object.keys(GLOSS).length) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(n) {
        if (n.nodeValue.indexOf("{{") < 0) return NodeFilter.FILTER_REJECT;
        const p = n.parentElement;
        return (p && p.closest("script,style,input,textarea,select")) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
      }
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(n => {
      const txt = n.nodeValue;
      const frag = document.createDocumentFragment();
      let last = 0, m;
      const re = /\{\{([A-Za-z0-9-]+)\}\}/g;
      while ((m = re.exec(txt))) {
        if (m.index > last) frag.appendChild(document.createTextNode(txt.slice(last, m.index)));
        const g = GLOSS[m[1].toLowerCase()];
        if (g) {
          const s = document.createElement("span");
          s.className = "g";
          s.setAttribute("role", "button");
          s.setAttribute("tabindex", "0");
          s.setAttribute("data-term", m[1].toLowerCase());
          s.textContent = g.label;
          frag.appendChild(s);
        } else {
          frag.appendChild(document.createTextNode(m[0]));
        }
        last = m.index + m[0].length;
      }
      if (last < txt.length) frag.appendChild(document.createTextNode(txt.slice(last)));
      n.parentNode.replaceChild(frag, n);
    });
  }

  /* ---------- Popup kamus ---------- */
  let panelEl = null;
  function glossPanel() {
    if (!panelEl) {
      panelEl = document.createElement("div");
      panelEl.className = "gloss-panel";
      panelEl.id = "glossPanel";
      panelEl.setAttribute("role", "dialog");
      panelEl.setAttribute("aria-label", "Kamus istilah");
      panelEl.innerHTML =
        '<div class="gp-head">' +
          '<div class="gp-titles"><span class="gp-label"></span><span class="gp-en"></span></div>' +
          '<button class="gp-close" type="button" aria-label="Tutup penjelasan">&times;</button>' +
        '</div>' +
        '<div class="gp-def"></div>' +
        '<a class="gp-all" href="#/kamus">Seluruh kamus &rarr;</a>';
      document.body.appendChild(panelEl);
      panelEl.querySelector(".gp-close").addEventListener("click", closeGloss);
    }
    return panelEl;
  }

  function openGloss(key, anchor) {
    const g = GLOSS[key];
    if (!g) return;
    const p = glossPanel();
    p.querySelector(".gp-label").textContent = g.label;
    p.querySelector(".gp-en").textContent = g.en || "";
    p.querySelector(".gp-def").innerHTML = g.def || "";
    p.dataset.term = key;
    p.classList.add("open");
    const mr = document.getElementById("main").getBoundingClientRect();
    const r = anchor.getBoundingClientRect();
    const pw = Math.min(380, mr.width - 24);
    p.style.width = pw + "px";
    const ph = p.offsetHeight;
    let left = r.left + r.width / 2 - pw / 2;
    left = Math.max(mr.left + 10, Math.min(left, mr.right - pw - 10));
    let top = r.bottom + 8;
    if (top + ph > window.innerHeight - 10) top = Math.max(10, r.top - ph - 8);
    p.style.left = Math.round(left) + "px";
    p.style.top = Math.round(top) + "px";
  }

  function closeGloss() {
    if (panelEl) { panelEl.classList.remove("open"); panelEl.dataset.term = ""; }
  }

  /* ---------- Section renderers ---------- */
  function esc(s) { return s; } // content is authored, trusted

  function renderUnit(page, u) {
    let html = `<div class="kicker">Unit ${u.id} · ${u.minutes} menit</div>
      <h1>${u.title}</h1>
      <div class="objectives"><h3>Capaian unit</h3><ul>${u.objectives.map(o => "<li>" + o + "</li>").join("")}</ul></div>`;

    u.sections.forEach(sec => { html += renderSection(sec, u); });

    if (u.keyPoints) {
      html += `<div class="keypoints"><h3>Poin kunci unit ${u.id}</h3><ul>${u.keyPoints.map(k => "<li>" + k + "</li>").join("")}</ul></div>`;
    }
    // next unit card
    const idx = MODULE.units.indexOf(u);
    const next = idx < MODULE.units.length - 1 ? MODULE.units[idx + 1] : null;
    html += next
      ? `<a class="next-card" href="#/unit/${next.id}" style="text-decoration:none">
           <div><div class="nx-label">Selanjutnya · ${next.minutes} menit</div>
           <div class="nx-title">Unit ${next.id} — ${next.title}</div></div>
           <span class="btn btn-ghost">Lanjutkan →</span></a>`
      : `<a class="next-card" href="#/asesmen" style="text-decoration:none">
           <div><div class="nx-label">Selanjutnya · ujian</div>
           <div class="nx-title">Asesmen Akhir — Kasus Progresif</div></div>
           <span class="btn btn-primary">Kerjakan →</span></a>`;
    page.innerHTML = html;
    applyGlossary(page);
  }

  function renderSection(sec, u) {
    switch (sec.type) {
      case "text":
        return `<div class="sec sr">${sec.html}</div>`;
      case "callout":
        return `<div class="sec sr"><div class="callout ${sec.variant || ""}"><div class="co-title">${sec.title}</div>${sec.html}</div></div>`;
      case "stats":
        return `<div class="sec sr"><div class="stat-row">${sec.items.map((s, i) =>
          `<div class="stat ${s.accent ? "accent" : ""}"><div class="s-num">${s.num}</div><div class="s-lbl">${s.lbl}</div></div>`).join("")}</div></div>`;
      case "timeline":
        return `<div class="sec sr"><h2>${sec.title || "Kronologi"}</h2><div class="timeline">${sec.items.map((it, i) =>
          `<div class="tl-item" style="animation-delay:${i * 0.15}s"><div class="tl-when">${it.when}</div><div class="tl-what">${it.what}</div></div>`).join("")}</div></div>`;
      case "reveal":
        return `<div class="sec sr"><h2>${sec.title}</h2>${sec.lead ? `<p>${sec.lead}</p>` : ""}<div>${sec.items.map(it =>
          `<div class="reveal-item"><button class="reveal-btn"><span class="rv-ico">+</span><span>${it.q}</span></button>
           <div class="reveal-body"><div class="reveal-body-inner">${it.a}</div></div></div>`).join("")}</div></div>`;
      case "cards":
        return `<div class="sec sr"><h2>${sec.title}</h2>${sec.lead ? `<p>${sec.lead}</p>` : ""}<div class="grid grid-3">${sec.items.map(c =>
          `<div class="map-card"><div class="mc-num">${c.ex}</div><h3>${c.name}</h3>
           <p style="margin-bottom:6px"><b>Jobs:</b> ${c.jobs}</p><p>${c.tox}</p></div>`).join("")}</div></div>`;
      case "flipcards":
        return `<div class="sec sr"><h2>${sec.title}</h2>${sec.lead ? `<p>${sec.lead}</p>` : ""}<div class="flip-grid">${sec.items.map(c =>
          `<div class="flip-card" tabindex="0" role="button" aria-label="${c.name}">
             <div class="flip-inner">
               <div class="flip-face flip-front">
                 <div class="f-chem">${c.chem}</div>
                 <div class="f-name">${c.name}</div>
                 <div class="f-class">${c.klass}</div>
                 <div class="f-hint">⟲ klik untuk membalik</div>
               </div>
               <div class="flip-face flip-back">
                 <span class="fb-tag">${c.name}</span>
                 <div>${c.back}</div>
               </div>
             </div>
           </div>`).join("")}</div></div>`;
      case "match":
        return `<div class="sec sr"><h2>${sec.title}</h2><p>${sec.lead}</p>
          <div class="match-wrap" id="matchWrap">
            <div><div class="match-col-title">Pelarut</div>${sec.left.map((l, i) =>
              `<button class="match-chip" data-side="L" data-i="${i}">${l.t}<small>${l.s}</small></button>`).join("")}</div>
            <div><div class="match-col-title">Organ sasaran</div>${sec.right.map((r, i) =>
              `<button class="match-chip" data-side="R" data-i="${i}">${r.t}<small>${r.s}</small></button>`).join("")}</div>
          </div>
          <div class="match-status" id="matchStatus"></div></div>`;
      case "chain":
        return `<div class="sec sr"><h2>${sec.title}</h2><div class="chain">${sec.nodes.map((n, i) =>
          `<span class="c-node ${n.hot ? "hot" : ""}" style="animation-delay:${i * 0.22}s">${n.t}</span>` +
          (i < sec.nodes.length - 1 ? `<span class="c-arrow" style="animation-delay:${i * 0.22 + 0.1}s">→</span>` : "")
        ).join("")}</div></div>`;
      case "spectrum":
        return `<div class="sec sr"><h2>${sec.title}</h2><p>${sec.lead}</p>
          <div class="spectrum">
            <div class="spec-track">${sec.pins.map(p =>
              `<div class="spec-pin ${p.mol ? "mol" : ""}" style="left:${p.x}%"><span>${p.label}</span><div class="dot"></div></div>`).join("")}
            </div>
            <div class="spec-ends"><span>← Narkosis: gejala cepat, pulih cepat, pemantauan udara cukup</span><span>Metabolit: gejala tertunda, biomarker wajib →</span></div>
          </div></div>`;
      case "bars":
        return `<div class="sec sr"><h2>${sec.title}</h2>${sec.lead ? `<p>${sec.lead}</p>` : ""}
          <div class="chart-card bar-chart" data-anim="bars">
            ${sec.rows.map(r => `<div class="bar-row">
              <div class="bar-name">${r.name}<small>${r.sub || ""}</small></div>
              <div class="bar-track"><div class="bar-fill" data-val="${r.val}" style="max-width:calc(100% - 66px)"></div></div>
              <div class="bar-val">${r.val}</div>
            </div>
            ${r.old ? `<div class="bar-row">
              <div class="bar-name"><small>estimasi 1981</small></div>
              <div class="bar-track"><div class="bar-fill old" data-val="${r.old}" style="max-width:calc(100% - 66px)"></div></div>
              <div class="bar-val">${r.old}</div>
            </div>` : ""}`).join("")}
          </div></div>`;
      case "table":
        return `<div class="sec sr"><h2>${sec.title}</h2>
          <div class="tablewrap"><table class="data"><thead><tr>${sec.head.map(h => "<th>" + h + "</th>").join("")}</tr></thead>
          <tbody>${sec.rows.map(r => "<tr>" + r.map(c => `<td class="${/^[\d.,–\-—]/.test(c) ? "num" : ""}">` + c + "</td>").join("") + "</tr>").join("")}</tbody></table></div>
          ${sec.note ? `<p class="small">${sec.note}</p>` : ""}</div>`;
      case "accordion":
        return `<div class="sec sr"><h2>${sec.title}</h2>${sec.lead ? `<p>${sec.lead}</p>` : ""}${sec.items.map(it =>
          `<div class="acc"><button class="acc-head"><span class="a-ico">▣</span><span>${it.t}</span><span class="a-caret">▾</span></button>
           <div class="acc-body"><div class="acc-body-inner">${it.html}</div></div></div>`).join("")}</div>`;
      case "quote":
        return `<div class="sec sr"><blockquote class="quote">${sec.html}<span class="q-src">${sec.src}</span></blockquote></div>`;
      case "chart":
        return `<div class="sec sr"><h2>${sec.title}</h2>${digitSpanChart()}<div class="chart-annotate">
          <b>Slope teradjusted:</b> DSF −2,8 digit per 100 ppm (P=0,04) · DSB −3,9 digit per 100 ppm (P=0,01).
          Penurunan ±1 digit per 25–40 ppm — DSF setara menua ±25 tahun, DSB setara ±14 tahun.
          SRT, SDS, PM, AL/AR: tidak berhubungan signifikan dengan paparan.</div></div>`;
      case "quiz":
        return `<div class="sec sr" data-quiz="${u ? u.id : "A"}">${renderQuiz(sec, u ? u.id : "A")}</div>`;
      default:
        return "";
    }
  }

  /* ---------- Digit Span chart (SVG) ---------- */
  function digitSpanChart() {
    const bands = ["Bebas paparan", "< 5 ppm", "5–15 ppm", "15–25 ppm", "≥ 25 ppm"];
    const dsf = [7.44, 6.19, 6.33, 5.83, 5.52];
    const dsb = [6.33, 5.89, 5.54, 5.03, 4.56];
    const N = [90, 36, 24, 36, 23];
    const W = 720, H = 380, PL = 52, PB = 64, PT = 24, PR = 18;
    const iw = W - PL - PR, ih = H - PT - PB;
    const yMin = 4, yMax = 8;
    const x = i => PL + (iw / (bands.length - 1)) * i;
    const y = v => PT + ih - ((v - yMin) / (yMax - yMin)) * ih;

    let g = "";
    // gridlines
    for (let v = 4; v <= 8; v += 1) {
      g += `<line x1="${PL}" y1="${y(v)}" x2="${W - PR}" y2="${y(v)}" stroke="#eee7da" stroke-width="1"/>`;
      g += `<text x="${PL - 8}" y="${y(v) + 4}" text-anchor="end" font-size="11" fill="#71889a">${v}</text>`;
    }
    // x labels
    bands.forEach((b, i) => {
      g += `<text x="${x(i)}" y="${H - PB + 18}" text-anchor="middle" font-size="11" fill="#71889a">${b}</text>`;
      g += `<text x="${x(i)}" y="${H - PB + 33}" text-anchor="middle" font-size="10" fill="#a5b4bf">N=${N[i]}</text>`;
    });
    // axes
    g += `<line x1="${PL}" y1="${PT}" x2="${PL}" y2="${H - PB}" stroke="#c9d4da" stroke-width="1.5"/>`;
    g += `<line x1="${PL}" y1="${H - PB}" x2="${W - PR}" y2="${H - PB}" stroke="#c9d4da" stroke-width="1.5"/>`;
    g += `<text x="14" y="${PT + ih / 2}" font-size="11" fill="#3d5566" transform="rotate(-90 14 ${PT + ih / 2})" text-anchor="middle">Skor Digit Span (rata-rata)</text>`;

    const line = data => data.map((v, i) => (i ? "L" : "M") + x(i) + "," + y(v)).join(" ");
    // animated draw
    const lenF = 640, lenB = 640;
    g += `<path d="${line(dsf)}" fill="none" stroke="#0e7490" stroke-width="3.5" stroke-linecap="round"
            class="draw" style="stroke-dasharray:${lenF};stroke-dashoffset:${lenF}"/>`;
    g += `<path d="${line(dsb)}" fill="none" stroke="#f59e0b" stroke-width="3.5" stroke-linecap="round"
            class="draw" style="stroke-dasharray:${lenB};stroke-dashoffset:${lenB}"/>`;
    // points
    const dot = (data, color, delayBase) => data.map((v, i) =>
      `<circle cx="${x(i)}" cy="${y(v)}" r="5" fill="#fff" stroke="${color}" stroke-width="3"
        class="dotp" style="animation-delay:${delayBase + i * 0.12}s"><title>${v.toFixed(2)}</title></circle>`).join("");
    g += dot(dsf, "#0e7490", 0.3);
    g += dot(dsb, "#f59e0b", 0.9);
    // value labels on DSB (steeper) & DSF
    dsb.forEach((v, i) => { g += `<text x="${x(i)}" y="${y(v) - 12}" text-anchor="middle" font-size="10.5" font-weight="700" fill="#b45309">${v.toFixed(2)}</text>`; });
    dsf.forEach((v, i) => { g += `<text x="${x(i)}" y="${y(v) + 18}" text-anchor="middle" font-size="10.5" font-weight="700" fill="#0b4f5c">${v.toFixed(2)}</text>`; });

    return `<div class="chart-card">
      <div class="chart-legend">
        <span class="lg"><span class="swatch" style="background:#0e7490"></span> Digit Span Maju (DSF)</span>
        <span class="lg"><span class="swatch" style="background:#f59e0b"></span> Digit Span Mundur (DSB)</span>
      </div>
      <svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto" role="img" aria-label="Grafik hubungan paparan toluena dengan skor Digit Span">${g}</svg>
    </div>`;
  }

  /* ---------- Quiz ---------- */
  function renderQuiz(sec, ownerId) {
    const qid = ownerId + ":" + sec.title;
    const saved = state.quiz[ownerId];
    const isDone = saved && saved.done;
    let html = `<div class="quiz-card" data-quizcard="${ownerId}">
      <div class="quiz-head"><span class="q-badge">Kuis</span><h3>${sec.title}</h3></div>
      <div class="q-counter" data-counter>${isDone ? "Selesai — " + saved.correct + "/" + saved.total + " benar" : sec.questions.length + " soal · jawaban langsung diberi umpan balik"}</div>
      <div data-qbody>
        ${isDone
          ? doneBanner(saved, ownerId)
          : `<div data-qform>${qHTML(sec.questions, 0, ownerId)}</div>`}
      </div>
    </div>`;
    return html;
  }

  function qHTML(questions, idx, ownerId) {
    const q = questions[idx];
    return `
      ${q.scenario ? `<div class="q-scenario">📖 ${q.scenario}</div>` : ""}
      <div class="q-stem">${q.stem}</div>
      <div class="q-opts">${q.opts.map((o, i) =>
        `<button class="q-opt" data-idx="${i}"><span class="q-letter">${"ABCD"[i]}</span><span>${o}</span></button>`).join("")}</div>
      <div data-explain></div>
      <div class="q-foot">
        <span class="q-score" data-score>Soal ${idx + 1} dari ${questions.length}</span>
        <button class="btn btn-outline" data-next style="visibility:hidden">Selanjutnya →</button>
      </div>`;
  }

  function doneBanner(saved, ownerId) {
    const pct = Math.round((saved.correct / saved.total) * 100);
    const msg = pct >= 80 ? "Mantap — pemahaman Anda solid." :
      pct >= 60 ? "Lolos. Ulangi bagian yang tertinggal bila perlu." :
      "Coba pelajari kembali unit ini, lalu ulangi kuisnya.";
    return `<div class="quiz-done-banner">
      <div class="big-check">✓</div>
      <h3>${saved.correct} dari ${saved.total} benar (${pct}%)</h3>
      <p>${msg}</p>
      <button class="btn btn-outline" data-retake>Ulangi kuis</button>
    </div>`;
  }

  function bindQuiz(root, ownerId, questions) {
    const card = root.querySelector(`[data-quizcard="${ownerId}"]`);
    if (!card) return;
    const body = card.querySelector("[data-qbody]");
    const saved = state.quiz[ownerId];
    const isDone = !!(saved && saved.done);
    let correct = 0;

    // Hanya menulis DOM. Penyambungannya dilakukan pemanggil — memanggil
    // bindQuestion dari sini juga akan menyambungkan soal yang sama dua kali.
    function show(i) {
      body.innerHTML = `<div data-qform>${qHTML(questions, i, ownerId)}</div>`;
      applyGlossary(body);
    }

    function render(i) { show(i); bindQuestion(i); }

    function bindQuestion(i) {
      const q = questions[i];
      const opts = body.querySelectorAll(".q-opt");
      const btnNext = body.querySelector("[data-next]");
      const scoreEl = body.querySelector("[data-score]");
      opts.forEach(btn => {
        btn.addEventListener("click", () => {
          const pick = +btn.dataset.idx;
          opts.forEach(o => { o.disabled = true; });
          const isRight = pick === q.answer;
          if (isRight) correct++;
          opts.forEach((o, oi) => {
            if (oi === q.answer) o.classList.add("correct");
            else if (oi === pick) o.classList.add("incorrect");
            else o.classList.add("dim");
          });
          const ex = body.querySelector("[data-explain]");
          ex.innerHTML = `<div class="q-explain ${isRight ? "good" : "bad"}">
            <b>${isRight ? "✓ Benar." : "✗ Belum tepat."}</b> ${isRight ? q.explainGood : q.explainBad}</div>`;
          applyGlossary(ex);
          scoreEl.textContent = `Soal ${i + 1} dari ${questions.length} · ${correct} benar`;
          btnNext.style.visibility = "visible";
          btnNext.textContent = i < questions.length - 1 ? "Selanjutnya →" : "Lihat skor →";
          btnNext.onclick = () => {
            if (i < questions.length - 1) render(i + 1);
            else finish();
          };
          setTimeout(() => btnNext.scrollIntoView({ behavior: "smooth", block: "nearest" }), 60);
        });
      });
    }

    function bindRetake() {
      const r = body.querySelector("[data-retake]");
      if (r) r.addEventListener("click", () => { correct = 0; render(0); });
    }

    function finish() {
      state.quiz[ownerId] = { done: true, correct: correct, total: questions.length };
      saveState();
      const counter = card.querySelector("[data-counter]");
      counter.textContent = "Selesai — " + correct + "/" + questions.length + " benar";
      body.innerHTML = doneBanner({ done: true, correct, total: questions.length }, ownerId);
      bindRetake();
      renderNav(); updateProgress();
    }

    // Kartu sudah berisi banner (kuis selesai, terbaca dari penyimpanan):
    // cukup sambungkan tombol ulangi. Menulis ulang dengan show(0) akan
    // menghapus banner, sehingga progress tampak hilang saat unit dibuka lagi.
    if (isDone) bindRetake();
    else render(0);
  }

  /* ---------- Home ---------- */
  function renderHome(page) {
    const hex = `<svg viewBox="0 0 100 100"><polygon points="50,6 90,28 90,72 50,94 10,72 10,28" fill="none" stroke="currentColor" stroke-width="5"/></svg>`;
    let html = `
    <div class="hero">
      <div class="hero-hexbg">${hex}${hex}${hex}</div>
      <div class="kicker">${MODULE.meta.course}</div>
      <h1>${MODULE.meta.title}<br>${MODULE.meta.subtitle}</h1>
      <p class="lead">${MODULE.meta.tagline}</p>
      <div class="hero-meta">
        <div class="m"><b>6 unit + asesmen</b>perjalanan belajar</div>
        <div class="m"><b>±${MODULE.meta.minutes} menit</b>durasi mandiri</div>
        <div class="m"><b>34 soal</b>kuis tiap unit + kasus progresif</div>
        <div class="m"><b>${MODULE.meta.program}</b>${MODULE.meta.course}</div>
      </div>
      <div class="hero-cta">
        <a class="btn btn-primary" href="#/unit/1">Mulai dari Unit 1 →</a>
        <a class="btn btn-ghost" href="#asesmen" onclick="location.hash='#/asesmen';return false;">Langsung ke Asesmen</a>
      </div>
    </div>

    <div class="sec sr">
      <h2>Peta modul</h2>
      <div class="grid grid-2">
        ${MODULE.units.map(u => {
          const done = unitDone(u.id);
          const s = quizScore(u.id);
          return `<a class="map-card ${done ? "is-done" : ""}" href="#/unit/${u.id}">
            <span class="mc-min">${u.minutes} menit</span>
            <span class="mc-done">✓ selesai</span>
            <div class="mc-num">Unit ${u.id}</div>
            <h3>${u.title}</h3>
            <p>${u.objectives[0]}</p>
          </a>`;
        }).join("")}
        <a class="map-card assessment-card" href="#/asesmen">
          <span class="mc-min">${MODULE.assessment.minutes} menit</span>
          <div class="mc-num">Ujian</div>
          <h3>${MODULE.assessment.title}</h3>
          <p>8 soal kasus progresif yang menggabungkan semua unit.</p>
        </a>
      </div>
    </div>

    <div class="sec sr">
      <h2>Capaian pembelajaran</h2>
      <div class="objectives"><ul>${MODULE.outcomes.map(o => "<li>" + o + "</li>").join("")}</ul></div>
    </div>

    <div class="sec sr">
      <div class="callout data">
        <div class="co-title">Kasus utama modul</div>
        <p>${MODULE.meta.primarySource}</p>
        <p style="font-size:12.5px;color:var(--ink-faint)">Kasus dibingkai ulang sebagai penyelidikan interaktif; angka-angka pendukung diverifikasi terhadap sumber primer yang dikutip di halaman Referensi.</p>
      </div>
    </div>`;
    page.innerHTML = html;
    applyGlossary(page);

    // bind home quiz cards (none) — but bind any quizzes? home has none.
  }

  /* ---------- Assessment ---------- */
  function renderAssessment(page) {
    let html = `<div class="kicker">Ujian · ${MODULE.assessment.minutes} menit</div>
      <h1>${MODULE.assessment.title}</h1>
      ${MODULE.assessment.intro}`;
    html += `<div data-quiz="A">${renderQuiz({ title: "Kasus progresif — percetakan & pabrik sepatu", questions: MODULE.assessment.questions }, "A")}</div>`;
    html += `<a class="next-card" href="#/referensi" style="text-decoration:none">
        <div><div class="nx-label">Setelah selesai</div><div class="nx-title">Daftar Referensi</div></div>
        <span class="btn btn-ghost">Buka →</span></a>`;
    page.innerHTML = html;
    applyGlossary(page);
    bindQuiz(page, "A", MODULE.assessment.questions);
  }

  /* ---------- Halaman kamus ---------- */
  function renderGlossary(page) {
    const keys = Object.keys(GLOSS).sort((a, b) =>
      GLOSS[a].label.localeCompare(GLOSS[b].label, "id", { sensitivity: "base" }));
    const groups = {};
    keys.forEach(k => {
      const ch = (GLOSS[k].label.trim()[0] || "?").toUpperCase();
      (groups[ch] = groups[ch] || []).push(k);
    });
    let html = `<div class="kicker">Rujukan</div>
      <h1>Kamus Istilah</h1>
      <p class="lead">${keys.length} istilah teknis yang dipakai modul ini. Di dalam unit dan asesmen istilah ini muncul seperti ini: <span class="g demo">cetak offset</span> &mdash; klik untuk membuka penjelasan singkat tanpa meninggalkan halaman.</p>
      <div class="k-abs">`;
    Object.keys(groups).sort().forEach(ch => {
      html += `<h2 class="k-letter">${ch}</h2><div class="k-grid">`;
      groups[ch].forEach(k => {
        const g = GLOSS[k];
        html += `<div class="k-card"><div class="k-top"><h3>${g.label}</h3><span class="k-en">${g.en || ""}</span></div><p>${g.def || ""}</p></div>`;
      });
      html += `</div>`;
    });
    html += `</div>`;
    page.innerHTML = html;
  }



  /* ---------- References ---------- */
  function renderRefs(page) {
    page.innerHTML = `<div class="kicker">Rujukan</div>
      <h1>Referensi</h1>
      <p>Daftar pustaka modul. Kasus utama: Chouanière dkk. (2002). Angka-angka lain diverifikasi terhadap sumber berikut.</p>
      <ol class="ref-list">${MODULE.references.map(r => "<li>" + r + "</li>").join("")}</ol>
      <p class="small">Modul pengajaran — ${MODULE.meta.program}. Disusun untuk ${MODULE.meta.course}.</p>`;
    applyGlossary(page);
  }

  /* ---------- Reveal animations ---------- */
  function initReveals(root) {
    const els = root.querySelectorAll(".sr");
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); }
      });
    }, { threshold: 0.08 });
    els.forEach(el => obs.observe(el));

    // tl-items
    root.querySelectorAll(".tl-item").forEach(el => {
      const o2 = new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) { el.classList.add("shown"); o2.disconnect(); } }), { threshold: 0.3 });
      o2.observe(el);
    });

    // bars animation
    root.querySelectorAll("[data-anim='bars']").forEach(card => {
      const o3 = new IntersectionObserver(es => es.forEach(x => {
        if (x.isIntersecting) {
          card.querySelectorAll(".bar-fill").forEach((f, i) => {
            const v = +f.dataset.val;
            const max = 200; // scale
            setTimeout(() => { f.style.width = Math.min(100, (v / max) * 100) + "%"; }, 120 + i * 90);
          });
          o3.disconnect();
        }
      }), { threshold: 0.25 });
      o3.observe(card);
    });

    // chart draw animation
    root.querySelectorAll("svg .draw").forEach(p => {
      const o4 = new IntersectionObserver(es => es.forEach(x => {
        if (x.isIntersecting) {
          p.style.transition = "stroke-dashoffset 1.6s cubic-bezier(.22,1,.36,1)";
          p.style.strokeDashoffset = "0";
          o4.disconnect();
        }
      }), { threshold: 0.3 });
      o4.observe(p);
    });
    root.querySelectorAll("svg .dotp").forEach(d => {
      d.style.opacity = "0";
      const o5 = new IntersectionObserver(es => es.forEach(x => {
        if (x.isIntersecting) {
          d.style.transition = "opacity .4s";
          d.style.opacity = "1";
          o5.disconnect();
        }
      }), { threshold: 0.3 });
      o5.observe(d);
    });
  }

  /* ---------- Interaksi kamus (fase capture: memotong bubbling) ---------- */
  document.addEventListener("click", e => {
    const gl = e.target.closest && e.target.closest(".g[data-term]");
    if (gl) {
      e.preventDefault();
      e.stopPropagation();
      const same = panelEl && panelEl.classList.contains("open") && panelEl.dataset.term === gl.dataset.term;
      if (same) closeGloss(); else openGloss(gl.dataset.term, gl);
      return;
    }
    if (panelEl && panelEl.classList.contains("open") && !e.target.closest("#glossPanel")) closeGloss();
  }, true);

  /* ---------- Global delegated interactions ---------- */
  document.addEventListener("click", e => {
    // reveal buttons
    const rb = e.target.closest(".reveal-btn");
    if (rb) { rb.parentElement.classList.toggle("open"); return; }
    // accordion
    const ah = e.target.closest(".acc-head");
    if (ah) { ah.parentElement.classList.toggle("open"); return; }
    // flipcards
    const fc = e.target.closest(".flip-card");
    if (fc) { fc.classList.toggle("flipped"); return; }
    // match chips
    const chip = e.target.closest(".match-chip");
    if (chip && !chip.classList.contains("locked")) { handleMatch(chip); return; }
    // quiz answers are bound locally after render
  });

  document.addEventListener("keydown", e => {
    const fc = document.activeElement && document.activeElement.classList && document.activeElement.classList.contains("flip-card")
      ? document.activeElement : null;
    if (fc && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); fc.classList.toggle("flipped"); }
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") { closeGloss(); return; }
    const a = document.activeElement;
    const gl = a && a.closest && a.closest(".g[data-term]");
    if (gl && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); openGloss(gl.dataset.term, gl); }
  });


  /* ---------- Match logic ---------- */
  const matchSel = { L: null, R: null };
  function currentMatchData() {
    const path = location.hash.replace(/^#\//, "");
    const u = location.hash.match(/unit\/(\d+)/);
    if (u) {
      const unit = MODULE.units.find(x => x.id === +u[1]);
      if (unit) {
        const sec = unit.sections.find(s => s.type === "match");
        if (sec) return sec;
      }
    }
    return null;
  }
  function handleMatch(chip) {
    const side = chip.dataset.side, i = +chip.dataset.i;
    const sec = currentMatchData();
    const wrap = document.getElementById("matchWrap");
    if (!sec || !wrap) return;
    // clear selection in same side
    wrap.querySelectorAll(`.match-chip[data-side="${side}"]`).forEach(c => c.classList.remove("sel", "wrong"));
    chip.classList.add("sel");
    matchSel[side] = i;
    if (matchSel.L !== null && matchSel.R !== null) {
      const pairIdx = sec.pairs.findIndex(p => p[0] === matchSel.L);
      const ok = pairIdx >= 0 && sec.pairs[pairIdx][1] === matchSel.R;
      const lChip = wrap.querySelector(`.match-chip[data-side="L"][data-i="${matchSel.L}"]`);
      const rChip = wrap.querySelector(`.match-chip[data-side="R"][data-i="${matchSel.R}"]`);
      const status = document.getElementById("matchStatus");
      if (ok) {
        lChip.classList.remove("sel"); lChip.classList.add("locked");
        rChip.classList.remove("sel"); rChip.classList.add("locked");
        lChip.disabled = true; rChip.disabled = true;
        const locked = wrap.querySelectorAll(".locked").length / 2;
        const total = sec.pairs.length;
        status.textContent = locked === total
          ? `✓ Sempurna — ${total}/${total} pasangan benar. Sekarang perhatikan: inilah peta yang dibuktikan di Unit 4.`
          : `✓ Benar (${locked}/${total}). Lanjutkan.`;
        status.style.color = "var(--good)";
      } else {
        lChip.classList.add("wrong"); rChip.classList.add("wrong");
        status.textContent = "✗ Belum tepat — coba pasangan lain.";
        status.style.color = "var(--bad)";
        setTimeout(() => {
          lChip.classList.remove("wrong", "sel"); rChip.classList.remove("wrong", "sel");
        }, 650);
      }
      matchSel.L = null; matchSel.R = null;
    }
  }

  /* ---------- Menu / reset ---------- */
  const sidebar = document.getElementById("sidebar");
  const scrim = document.getElementById("sidebarScrim");
  function closeMenu() { sidebar.classList.remove("open"); scrim.classList.remove("show"); }
  document.getElementById("btnMenu").addEventListener("click", () => {
    sidebar.classList.toggle("open"); scrim.classList.toggle("show");
  });
  scrim.addEventListener("click", closeMenu);
  document.getElementById("btnReset").addEventListener("click", () => {
    if (confirm("Atur ulang seluruh progres modul (skor kuis & unit selesai)?")) {
      state = { quiz: {}, visited: [] };
      saveState();
      route();
    }
  });

  /* ---------- Quiz binding after route ---------- */
  // Kunci = elemen kartu kuis itu sendiri, bukan id unit: setiap kali halaman
  // dirender ulang muncul elemen baru yang harus di-bind ulang. Guard berbasis
  // dataset di #page tidak pernah dibersihkan sehingga kuis jadi mati saat
  // pengguna kembali ke unit yang sudah dibuka sebelumnya.
  const boundCards = new WeakSet();
  const obs = new MutationObserver(muts => {
    muts.forEach(m => {
      if (m.target.id !== "page") return;
      const page = m.target;
      MODULE.units.forEach(u => {
        const card = page.querySelector(`[data-quizcard="${u.id}"]`);
        if (card && !boundCards.has(card)) {
          const sec = u.sections.find(s => s.type === "quiz");
          if (sec) { bindQuiz(page, u.id, sec.questions); boundCards.add(card); }
        }
      });
      const cardA = page.querySelector('[data-quizcard="A"]');
      if (cardA && !boundCards.has(cardA)) {
        bindQuiz(page, "A", MODULE.assessment.questions);
        boundCards.add(cardA);
      }
    });
  });
  obs.observe(document.getElementById("page"), { childList: true });

  window.addEventListener("hashchange", route);
  route();
})();
