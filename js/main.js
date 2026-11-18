/* ==========================================================================
   Aula Lite — everything that makes the site work.

   Nothing is fetched and nothing is bundled: this file reads js/config.js,
   js/courses.js, js/i18n.js and js/progress.js and draws the page. Open
   index.html straight from the disk and it works.

   Reading order
     1. small helpers    — $, el, esc, money, time
     2. language & theme — what the two switches in the header do
     3. header & footer  — shared by every page
     4. render*()        — one function per page; each one checks whether it
                           has anything to draw on this page
   ========================================================================== */

/* ---- which locale formats numbers for which language ------------------
   When you add a language to js/i18n.js, add a line here too, otherwise the
   price is written in the wrong shape. */
const LOCALES = { en: 'en-GB', pl: 'pl-PL', uk: 'uk-UA' };

const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

function el(tag, cls, html) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
}

/* Everything coming from the content files passes through this before it
   becomes markup: the page builds some HTML as strings, and a < in a course
   title must not open a tag. */
function esc(s) {
  return String(s).replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

let LANG = 'en';

/* ---- words ----------------------------------------------------------- */
function t(key, vars) {
  let s = (I18N[LANG] && I18N[LANG][key]) ?? I18N.en[key] ?? key;
  if (vars) for (const k in vars) s = s.split('{' + k + '}').join(vars[k]);
  return s;
}

/* A field shaped { en, pl, uk } from js/courses.js or js/config.js */
function tx(obj) {
  if (!obj) return '';
  return obj[LANG] || obj.en || '';
}

/* ---- money and time --------------------------------------------------- */
function money(n) {
  return new Intl.NumberFormat(LOCALES[LANG] || 'en-GB', {
    style: 'currency', currency: CFG.currency, maximumFractionDigits: 0
  }).format(n);
}

/* 95 minutes → "1 h 35 min". The abbreviations are deliberate: spelling it
   out needs three plural forms per language, and a course card is not the
   place to get grammar wrong. */
function fmtTime(min) {
  const h = Math.floor(min / 60), m = Math.round(min % 60);
  const U = {
    en: { h: 'h', m: 'min' },
    pl: { h: 'godz.', m: 'min' },
    uk: { h: 'год', m: 'хв' }
  }[LANG] || { h: 'h', m: 'min' };
  if (!h) return m + ' ' + U.m;
  if (!m) return h + ' ' + U.h;
  return h + ' ' + U.h + ' ' + m + ' ' + U.m;
}

/* ---- course data ------------------------------------------------------ */
function courseById(id) {
  return COURSES.find(c => c.id === id) || null;
}

/* a flat list of the course's lessons, in programme order */
function lessonsOf(course) {
  const out = [];
  course.modules.forEach((m, mi) => m.lessons.forEach(l => out.push({ ...l, mi })));
  return out;
}

function courseMinutes(course) {
  return lessonsOf(course).reduce((s, l) => s + l.min, 0);
}

function findLesson(id) {
  for (const c of COURSES) {
    const list = lessonsOf(c);
    const i = list.findIndex(l => l.id === id);
    if (i !== -1) return { course: c, lesson: list[i], index: i, list };
  }
  return null;
}

/* ---- translate everything marked with data-i18n ---------------------- */
function applyI18n() {
  const vars = { name: CFG.name, city: tx(CFG.city) };
  $$('[data-i18n]').forEach(n => { n.textContent = t(n.dataset.i18n, vars); });
  $$('[data-i18n-attr]').forEach(n => {
    const [attr, key] = n.dataset.i18nAttr.split(':');
    n.setAttribute(attr, t(key, vars));
  });
  document.documentElement.lang = LANG;
  document.title = t('doc.title', vars);
  const d = $('meta[name=description]');
  if (d) d.setAttribute('content', t('doc.desc', vars));
}

/* ---- the two switches in the header ---------------------------------- */
function setLang(code) {
  LANG = LANGS.includes(code) ? code : 'en';
  try { localStorage.setItem('aula-lang', LANG); } catch (e) { /* private window */ }
  const sel = $('#lang');
  if (sel) sel.value = LANG;
  renderAll();
}

function setTheme(mode) {
  document.documentElement.dataset.theme = mode;
  const b = $('#theme');
  if (b) b.setAttribute('aria-pressed', mode === 'dark' ? 'true' : 'false');
  try { localStorage.setItem('aula-theme', mode); } catch (e) { /* private window */ }
}

/* ==========================================================================
   Shared by every page
   ========================================================================== */

function renderChrome() {
  $$('[data-name]').forEach(n => { n.textContent = CFG.name; });
  $$('[data-tagline]').forEach(n => { n.textContent = tx(CFG.tagline); });
  const y = $('[data-year]');
  if (y) y.textContent = new Date().getFullYear();

  const contacts = $('[data-contacts]');
  if (contacts) {
    contacts.innerHTML = '';
    const add = (href, text) => {
      const li = el('li');
      const a = el('a', null, esc(text));
      a.href = href;
      if (/^https?:/.test(href)) { a.target = '_blank'; a.rel = 'noopener'; }
      li.append(a);
      contacts.append(li);
    };
    if (CFG.email) add('mailto:' + CFG.email, CFG.email);
    if (CFG.phone) add('tel:' + CFG.phone.replace(/[^+\d]/g, ''), CFG.phone);
    for (const k in CFG.social) {
      if (CFG.social[k]) add(CFG.social[k], k[0].toUpperCase() + k.slice(1));
    }
  }

  /* the course list in the footer, so it is not hand-edited in every file */
  const fc = $('[data-foot-courses]');
  if (fc) {
    fc.innerHTML = '';
    COURSES.forEach(c => {
      const li = el('li');
      const a = el('a', null, esc(tx(c.title)));
      a.href = 'course.html?id=' + encodeURIComponent(c.id);
      li.append(a);
      fc.append(li);
    });
  }
}

/* ---- course card: one markup for the catalogue and the home page ------ */
function courseCard(c) {
  const list = lessonsOf(c);
  const free = list.some(l => l.id === CFG.trialLesson);
  const st = Progress.stats(c.id, list.length);
  const href = 'course.html?id=' + encodeURIComponent(c.id);

  const card = el('article', 'card');
  card.innerHTML =
    `<a class="card-img" href="${href}" aria-label="${esc(tx(c.title))}">
       <img src="${c.img}" alt="" loading="lazy" width="900" height="600">
       ${free ? `<span class="badge">${esc(t('card.free'))}</span>` : ''}
     </a>
     <div class="card-body">
       <p class="meta">${esc(t('level.' + c.level))} · ${esc(t('topic.' + c.topic))}</p>
       <h3><a href="${href}">${esc(tx(c.title))}</a></h3>
       <p class="card-short">${esc(tx(c.short))}</p>
       <p class="meta">${esc(t('card.lessons', { n: list.length }))} · ${esc(t('card.hours', { t: fmtTime(courseMinutes(c)) }))}</p>
       ${st.done ? `<div class="bar" role="img" aria-label="${esc(t('course.progress', { done: st.done, total: st.total }))}">
            <i style="width:${st.pct}%"></i></div>
          <p class="meta">${esc(t('course.progress', { done: st.done, total: st.total }))}</p>` : ''}
       <div class="card-foot">
         <span class="price">${c.old ? `<s>${esc(money(c.old))}</s> ` : ''}${esc(money(c.price))}</span>
         <a class="btn btn-sm" href="${href}">${esc(t('card.open'))}</a>
       </div>
     </div>`;
  return card;
}

/* ==========================================================================
   Pages
   ========================================================================== */

function renderHome() {
  const figs = $('[data-figs]');
  if (!figs) return;

  figs.innerHTML = '';
  CFG.figures.forEach(f => {
    const li = el('li', 'fig');
    li.append(el('b', null, esc(f.value)));
    li.append(el('span', null, esc(t(f.key))));
    figs.append(li);
  });

  const top = $('[data-top-courses]');
  if (top) {
    top.innerHTML = '';
    COURSES.slice(0, 3).forEach(c => top.append(courseCard(c)));
  }

  const trial = $('[data-trial]');
  if (trial) {
    const f = findLesson(CFG.trialLesson);
    trial.href = f ? 'lesson.html?id=' + encodeURIComponent(f.lesson.id)
                   : 'course.html?id=' + encodeURIComponent(COURSES[0].id);
  }

  const tp = $('[data-teacher-photo]');
  if (tp) {
    tp.style.backgroundImage = CFG.teacher.photo ? `url('${CFG.teacher.photo}'), var(--art)` : 'var(--art)';
    $('[data-teacher-name]').textContent = CFG.teacher.name;
    $('[data-teacher-role]').textContent = tx(CFG.teacher.role);
    $('[data-teacher-about]').textContent = tx(CFG.teacher.about);
  }

  const rev = $('[data-reviews]');
  if (rev) {
    const sec = rev.closest('section');
    if (!REVIEWS.length) { if (sec) sec.hidden = true; return; }
    rev.innerHTML = '';
    REVIEWS.forEach(r => {
      const c = courseById(r.course);
      const q = el('figure', 'review');
      q.innerHTML =
        `<blockquote>${esc(tx(r.text))}</blockquote>
         <figcaption>${esc(r.name)}<span> · ${esc(t('rev.about'))} «${esc(c ? tx(c.title) : r.course)}»</span></figcaption>`;
      rev.append(q);
    });
  }
}

function renderCourse() {
  const root = $('[data-course]');
  if (!root) return;

  const id = new URLSearchParams(location.search).get('id');
  const c = courseById(id) || COURSES[0];
  const list = lessonsOf(c);
  const st = Progress.stats(c.id, list.length);

  $('[data-c-title]').textContent = tx(c.title);
  $('[data-c-short]').textContent = tx(c.short);
  $('[data-c-about]').textContent = tx(c.about);
  $('[data-c-meta]').textContent =
    t('level.' + c.level) + ' · ' + t('topic.' + c.topic) + ' · ' +
    t('course.total', { lessons: list.length, time: fmtTime(courseMinutes(c)) });
  $('[data-c-img]').style.backgroundImage = `url('${c.img}'), var(--art)`;
  $('[data-c-price]').innerHTML =
    (c.old ? `<s>${esc(money(c.old))}</s> ` : '') + esc(money(c.price));

  /* the button follows the state: start → continue → finished */
  const cta = $('[data-c-cta]');
  const last = Progress.last(c.id);
  if (st.done >= st.total && st.total) {
    cta.textContent = t('course.done');
    cta.href = '#programme';
  } else if (last || st.done) {
    cta.textContent = t('course.continue');
    cta.href = 'lesson.html?id=' + encodeURIComponent(last || list[0].id);
  } else {
    cta.textContent = t('course.start');
    cta.href = 'lesson.html?id=' + encodeURIComponent(list[0].id);
  }

  const prog = $('[data-c-progress]');
  if (st.done) {
    prog.hidden = false;
    $('[data-c-bar]').style.width = st.pct + '%';
    $('[data-c-done]').textContent = t('course.progress', { done: st.done, total: st.total });
  } else {
    prog.hidden = true;
  }

  /* the programme: modules fold open, the first one starts open */
  const box = $('[data-c-modules]');
  box.innerHTML = '';
  c.modules.forEach((m, mi) => {
    const mins = m.lessons.reduce((s, l) => s + l.min, 0);
    const d = el('details', 'module');
    if (mi === 0) d.open = true;
    const rows = m.lessons.map(l => {
      const free = l.id === CFG.trialLesson;
      const done = Progress.isDone(c.id, l.id);
      return `<li class="${done ? 'is-done' : ''}">
          <a href="lesson.html?id=${encodeURIComponent(l.id)}">
            <span class="tick" aria-hidden="true"></span>
            <span class="lname">${esc(tx(l.t))}</span>
            ${free ? `<span class="free">${esc(t('course.free'))}</span>` : ''}
            <span class="lmin">${esc(fmtTime(l.min))}</span>
          </a></li>`;
    }).join('');
    d.innerHTML =
      `<summary>
         <span class="mnum">${esc(t('course.module', { n: mi + 1 }))}</span>
         <span class="mname">${esc(tx(m.title))}</span>
         <span class="mmeta">${esc(t('card.lessons', { n: m.lessons.length }))} · ${esc(fmtTime(mins))}</span>
       </summary>
       <ul class="lessons">${rows}</ul>`;
    box.append(d);
  });

  const other = $('[data-c-other]');
  if (other) {
    other.innerHTML = '';
    COURSES.filter(x => x.id !== c.id).slice(0, 3).forEach(x => other.append(courseCard(x)));
  }
}

function renderLesson() {
  const root = $('[data-lesson]');
  if (!root) return;

  const id = new URLSearchParams(location.search).get('id') || CFG.trialLesson;
  const f = findLesson(id) || findLesson(CFG.trialLesson);
  if (!f) return;

  const { course: c, lesson: l, index, list } = f;
  Progress.touch(c.id, l.id);

  $('[data-l-course]').textContent = tx(c.title);
  $('[data-l-course]').href = 'course.html?id=' + encodeURIComponent(c.id);
  $('[data-l-title]').textContent = tx(l.t);
  $('[data-l-meta]').textContent =
    t('course.module', { n: l.mi + 1 }) + ' · ' + fmtTime(l.min);
  $('[data-l-free]').hidden = l.id !== CFG.trialLesson;

  /* video: in the template this is a poster with an honest caption. The
     school owner adds a link and a player appears in its place. */
  const frame = $('[data-l-video]');
  if (l.video) {
    frame.innerHTML = `<iframe src="${esc(l.video)}" title="${esc(tx(l.t))}"
        allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture; fullscreen"
        allowfullscreen loading="lazy"></iframe>`;
  }

  /* the "done" tick */
  const done = $('[data-l-done]');
  function paint() {
    const is = Progress.isDone(c.id, l.id);
    done.textContent = t(is ? 'lesson.undone' : 'lesson.done');
    done.classList.toggle('btn-ghost', is);
    done.classList.toggle('btn-go', !is);
    const st = Progress.stats(c.id, list.length);
    $('[data-l-bar]').style.width = st.pct + '%';
    $('[data-l-progress]').textContent = t('course.progress', { done: st.done, total: st.total });
  }
  done.addEventListener('click', () => { Progress.toggle(c.id, l.id); paint(); });
  paint();

  const prev = $('[data-l-prev]'), next = $('[data-l-next]');
  if (index > 0) {
    prev.href = 'lesson.html?id=' + encodeURIComponent(list[index - 1].id);
  } else {
    prev.hidden = true;
  }
  if (index < list.length - 1) {
    next.href = 'lesson.html?id=' + encodeURIComponent(list[index + 1].id);
  } else {
    next.hidden = true;
  }
}

/* ==========================================================================
   Start-up
   ========================================================================== */

function renderAll() {
  applyI18n();
  renderChrome();
  renderHome();
  renderCourse();
  renderLesson();
}

function boot() {
  /* language: remembered → the browser's → English */
  let saved = null;
  try { saved = localStorage.getItem('aula-lang'); } catch (e) { /* private window */ }
  const fromBrowser = (navigator.language || 'en').slice(0, 2).toLowerCase();
  LANG = LANGS.includes(saved) ? saved : (LANGS.includes(fromBrowser) ? fromBrowser : 'en');

  const sel = $('#lang');
  if (sel) {
    LANGS.forEach(code => {
      const name = new Intl.DisplayNames([LOCALES[code] || code], { type: 'language' });
      sel.append(new Option(name.of(code).replace(/^./, ch => ch.toUpperCase()), code));
    });
    sel.value = LANG;
    sel.addEventListener('change', e => setLang(e.target.value));
  }

  /* theme: remembered → the system's → light, which is the school's face */
  let th = null;
  try { th = localStorage.getItem('aula-theme'); } catch (e) { /* private window */ }
  if (!th) th = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  setTheme(th);
  const tb = $('#theme');
  if (tb) tb.addEventListener('click', () =>
    setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'));

  const burger = $('#burger');
  if (burger) {
    burger.addEventListener('click', () => {
      const open = document.body.classList.toggle('nav-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    $$('#nav a').forEach(a => a.addEventListener('click', () => {
      document.body.classList.remove('nav-open');
      burger.setAttribute('aria-expanded', 'false');
    }));
  }

  const onScroll = () => document.body.classList.toggle('scrolled', scrollY > 8);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  renderAll();
}

document.addEventListener('DOMContentLoaded', boot);
