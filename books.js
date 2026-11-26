// Dimaag Dada book store + product page. Data-driven: one object per book, sections skip when their data is empty.
// Honest page: no ratings, reviews, urgency, MRP strike-through or "save %". Prices must match Gumroad / Dodo.
(function(){
const eh = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const R = (n) => "₹" + n;
const gum = () => { const b = BOOKP.buy.en; return BOOKP.launchOn ? b.replace(/\/$/, "") + "/" + BOOKP.launchCode : b; };

const PAGES = [1, 2, 3, 4].map((n) => ({ src: "img/books/reasoning-samjho/page-" + n + ".webp", alt: ["Chapter 1 title page: Seating Arrangement, with Dimaag Dada", "Dada's class story page from the free chapter", "Sneak peek of the rest of Chapter 1", "End of the free chapter with Dimaag Dada waving"][n - 1],
  cap: ["Chapter opener", "Dada's class story", "A look at what is inside", "Get the full book"][n - 1] }));

const BOOKS = [
  { slug: "reasoning-samjho", id: "reasoning", status: "sale", title: "Reasoning Samjho", sub: "Puzzle se Selection tak", cover: "img/puzzles-cover-en.jpg",
    lead: "192 original reasoning puzzles with 3 mock tests, taught by Dimaag Dada: draw it, place the surest clue first, and let the paper think for you.",
    more: ["Good practice for school quizzes, interviews, competitive exams and placement tests. Every worked puzzle shows the method, a diagram, the step-by-step solution, Dada's shortcut and the trap most people fall into.",
      "Each chapter ends with practice sets and a boss puzzle, and the worked answers are at the back. Three timed mock tests, a study plan and an exam-wise index finish the book."],
    pills: [["a", "English edition"], ["s", "PDF + EPUB"], ["p", "289 pages"], ["p", "Free Chapter 1"]],
    stats: [["289", "pages"], ["192", "original puzzles"], ["16", "chapters"], ["3", "mock tests"]],
    why: [["Every answer checked", "A program tried every possibility for the puzzles; the word-based items were reviewed by hand."], ["One method", "Draw it, place the surest clue first, check the traps. The same steps work on every puzzle."], ["Dada's shortcuts", "Each worked puzzle has the long way and the fast way, plus the trap to watch for."], ["Try it free", "Read the whole of Chapter 1's opening pages before you buy."]],
    who: ["Students who want sharper thinking, school onwards", "Anyone preparing for competitive exams", "Final-year students getting ready for company placement tests", "Candidates facing logic rounds in interviews", "Parents and teachers who want original puzzles with worked answers"],
    learn: ["Draw a seating or ranking puzzle and place the surest clue first", "Solve blood-relation and direction puzzles without getting lost", "Crack coding-decoding and series patterns", "Handle syllogisms and inequalities with simple diagrams", "Work input-output and data sufficiency step by step", "Use calendar, clock, cube and dice shortcuts", "Spot the trap before you fall into it", "Time yourself on three full mock tests"],
    details: [["Pages", "289"], ["Format", "PDF (A5 print layout) and EPUB (reflowable, for phones and e-readers)"], ["Language", "English"], ["Author", "Raj, with Dimaag Dada"], ["Puzzles", "192 original puzzles (about 270 questions)"], ["Mock tests", "3 timed mock tests with answer keys"], ["Delivery", "Instant download after payment, both files"]],
    inside: [[1, "Seating Arrangement", 8], [2, "Floor, Box and Scheduling", 21], [3, "Order and Ranking", 35], [4, "Blood Relations", 48], [5, "Direction Sense", 61], [6, "Coding-Decoding", 74], [7, "Series", 87], [8, "Analogy and Odd One Out", 100], [9, "Syllogism", 113], [10, "Inequalities", 126], [11, "Input-Output", 139], [12, "Data Sufficiency", 152], [13, "Calendars and Clocks", 165], [14, "Cubes, Dice and Spatial", 178], [15, "Statements and Critical Reasoning", 191], [16, "LRDI Sets and IT-Company Logic Puzzles", 204], ["", "3 timed mock tests", 217], ["", "Worked answers", 234], ["", "Exam-wise index", 283]],
    gallery: PAGES, pages: PAGES,
    faq: [["What do I get?", "Two files, both included in the price: the book as a PDF and as an EPUB. You can download them straight after paying."], ["Is there a free preview?", "Yes. The free Chapter 1 opening pages are on this page, and you can read them as a PDF first."], ["Which format should I open?", "The PDF keeps the book's page layout. The EPUB reflows to your screen, so it is easier on a phone."], ["Is it a printed book?", "No. It is a digital book. Nothing is posted to you."], ["How do I pay?", "You can buy it on Gumroad now. Card checkout on this site is being switched on, and the cart already holds the book for it."], ["Who wrote it?", "Raj wrote it with Dimaag Dada. All puzzles are original."]] },
  { slug: "anna-chiklu-puzzle-book", id: "kids", status: "soon", title: "Anna & Chiklu's Puzzle Book", sub: "Puzzles for kids 7–12", cover: "play/img/comic/trail-1-cover.webp",
    lead: "Mazes, number puzzles and spot-the-difference for kids 7 to 12. Coming soon.", pills: [["s", "Coming soon"], ["p", "Ages 7–12"]] }
];
const find = (slug) => BOOKS.find((b) => b.slug === slug);
const href = (b) => "#book/" + b.slug;

function priceHtml(b){
  if (b.status !== "sale") return '<span class="bk-pn">Price announced at launch</span>';
  const z = BOOKP;
  return z.launchOn ? '<span class="bk-p">' + R(z.launch) + '</span><small class="bk-pt">Launch price until ' + eh(z.launchEndsLabel) + ", then " + R(z.price) + ". Tax included.</small>"
                    : '<span class="bk-p">' + R(z.price) + '</span><small class="bk-pt">Tax included.</small>';
}
const pills = (b) => '<div class="bk-pills">' + (b.pills || []).map((p) => '<span class="bk-pill ' + p[0] + '">' + eh(p[1]) + "</span>").join("") + "</div>";
function buyBtns(b, sm){
  if (b.status !== "sale") return '<span class="btn off' + (sm ? " sm" : "") + '" aria-disabled="true">Coming soon</span><a class="bk-link" href="#community">Follow Dada to hear first</a>';
  return '<button class="btn' + (sm ? " sm" : "") + '" type="button" data-addcart="' + b.id + '">Add to cart</button><a class="btn ghost' + (sm ? " sm" : "") + '" href="' + gum() + '" target="_blank" rel="noopener">Buy on Gumroad</a>';
}
function card(b){
  return '<article class="bk-card"><a class="im" href="' + (b.status === "sale" ? href(b) : "#community") + '" aria-label="' + eh(b.title) + '"><img src="' + b.cover + '" alt="' + eh(b.title + " cover") + '" loading="lazy" width="300" height="400"></a><div class="bd">' + pills(b)
    + '<h3><a href="' + (b.status === "sale" ? href(b) : "#community") + '">' + eh(b.title) + "</a></h3><p class=\"bk-meta\">" + (b.status === "sale" ? "289 pages · 192 puzzles · 3 mock tests" : eh(b.lead)) + "</p>" + priceHtml(b)
    + '<div class="bk-row">' + buyBtns(b, true) + (b.status === "sale" ? '<a class="bk-link" href="' + href(b) + '">See inside</a>' : "") + "</div></div></article>";
}
function carousel(b){
  if (!b.pages || !b.pages.length) return "";
  return '<section class="bk-sec" id="bk-pages"><h2>See real pages from the book</h2><p class="bk-meta" style="margin:0 0 8px">These are the free Chapter 1 pages, exactly as in the book. <a class="bk-link" href="notes/puzzles-1-en-preview.pdf" target="_blank" rel="noopener">Read the free chapter (PDF)</a></p><div class="bk-cn"><button type="button" data-car="-1" aria-label="Previous page">‹</button><button type="button" data-car="1" aria-label="Next page">›</button></div><div class="bk-car" id="bkcar" tabindex="0" aria-label="Sample pages">'
    + b.pages.map((p) => '<figure><img src="' + p.src + '" alt="' + eh(p.alt) + '" loading="lazy" width="360" height="510"><figcaption>' + eh(p.cap) + "</figcaption></figure>").join("") + "</div></section>";
}
function faq(b){
  if (!b.faq || !b.faq.length) return "";
  return '<section class="bk-sec"><h2>Questions</h2><div class="bk-faq">' + b.faq.map((q) => "<details><summary>" + eh(q[0]) + "</summary><p>" + eh(q[1]) + "</p></details>").join("") + "</div></section>";
}
const list = (a) => '<ul class="bk-list">' + a.map((x) => "<li><span>" + eh(x) + "</span></li>").join("") + "</ul>";

function store(){
  const b = BOOKS[0], sale = BOOKS.filter((x) => x.status === "sale");
  return '<div class="bk">'
    + '<section class="bk-hero"><div><span class="bk-eyebrow">Dimaag Dada · Books</span><h1>Puzzle books with Dimaag Dada.</h1><p class="lead">Original puzzles, worked answers and a method you can use in any exam hall or interview.</p>'
    + '<div class="bk-btns"><button class="btn" type="button" data-scroll="bk-lib">See the books</button><a class="btn ghost" href="' + href(b) + '">See inside Reasoning Samjho</a></div>'
    + '<ul class="bk-facts"><li><b>289</b> pages</li><li><b>192</b> original puzzles</li><li><b>3</b> mock tests</li></ul></div>'
    + '<div class="bk-collage"><span class="bk-chip">Instant download</span><img class="cv" src="' + b.cover + '" alt="' + eh(b.title + " book cover") + '" width="300" height="425"><img class="dd" src="img/dada-3d.webp" alt="" width="120" height="208"></div></section>'
    + '<div class="bk-trust"><div><span class="i">1</span><span><b>Instant download</b>PDF and EPUB after payment</span></div><div><span class="i">2</span><span><b>Answers checked</b>A program tried every possibility</span></div><div><span class="i">3</span><span><b>Free preview</b>Read Chapter 1’s opening pages first</span></div><div><span class="i">4</span><span><b>Secure checkout</b>Paid through trusted payment partners</span></div></div>'
    + '<section class="bk-sec"><h2>What do you want the book for?</h2><div class="bk-goals"><a class="bk-goal" href="' + href(b) + '"><b>Sharper thinking</b><span>School quizzes and interviews. Start with the method.</span></a><a class="bk-goal" href="' + href(b) + '"><b>Competitive exams</b><span>Practice sets, a boss puzzle per chapter and mock tests.</span></a><a class="bk-goal" href="' + href(b) + '"><b>Placement tests</b><span>Logic rounds and company-style puzzle sets.</span></a></div></section>'
    + '<section class="bk-sec" id="bk-lib"><h2>The books</h2><div class="bk-grid">' + BOOKS.map(card).join("") + "</div></section>"
    + carousel(b)
    + '<section class="bk-sec"><h2>Why these books</h2><div class="bk-cols">' + b.why.map((w) => '<div class="bk-box"><h3>' + eh(w[0]) + "</h3><p>" + eh(w[1]) + "</p></div>").join("") + "</div></section>"
    + faq(b)
    + '<p class="bk-meta" style="margin:18px 0">Want a note when the next book arrives? <a class="bk-link" href="#community">Join the channels or leave your email</a>.</p></div>';
}

function product(slug){
  const b = find(slug);
  if (!b || b.status !== "sale") return '<div class="bk"><p class="bk-crumb"><a href="#books">← All books</a></p><h1>Book not found</h1><p><a class="btn" href="#books">See the books</a></p></div>';
  const g = b.gallery, others = BOOKS.filter((x) => x.slug !== b.slug);
  return '<div class="bk"><p class="bk-crumb"><a href="#books">Books</a> › ' + eh(b.title) + "</p>"
    + '<div class="bk-prod"><div class="bk-gal" id="bkgal" data-i="0"><div class="bk-gmain"><button class="bk-arr prev" type="button" data-g="-1" aria-label="Previous image">‹</button><img id="bkgi" src="' + b.cover + '" alt="' + eh(b.title + " book cover") + '" width="600" height="852"><button class="bk-arr next" type="button" data-g="1" aria-label="Next image">›</button><span class="bk-cnt" id="bkgc">1 / ' + (g.length + 1) + "</span></div>"
    + '<div class="bk-thumbs">' + [{ src: b.cover, alt: "Book cover" }].concat(g).map((p, i) => '<button type="button" data-gi="' + i + '" aria-label="Show image ' + (i + 1) + '"' + (i === 0 ? ' aria-current="true"' : "") + '><img src="' + p.src + '" alt="" loading="lazy" width="62" height="88"></button>').join("") + "</div></div>"
    + '<div class="bk-info"><h1>' + eh(b.title) + '</h1><p class="sub">' + eh(b.sub) + "</p>" + pills(b) + '<div class="pr">' + priceHtml(b) + "</div>"
    + '<div class="bk-more" data-open="0"><p>' + eh(b.lead) + "</p>" + b.more.map((m) => '<p class="x">' + eh(m) + "</p>").join("") + '<button type="button" data-more>View more</button></div>'
    + '<div class="bk-btns">' + buyBtns(b, false) + '</div><p class="bk-meta" style="margin-top:10px">Digital book. Instant download of the PDF and the EPUB after payment.</p></div></div>'
    + '<section class="bk-sec"><div class="bk-glance">' + b.stats.map((s) => "<div><b>" + eh(s[0]) + "</b><span>" + eh(s[1]) + "</span></div>").join("") + "</div></section>"
    + '<section class="bk-sec"><h2>Why choose this book</h2><div class="bk-cols">' + b.why.map((w) => '<div class="bk-box"><h3>' + eh(w[0]) + "</h3><p>" + eh(w[1]) + "</p></div>").join("") + "</div></section>"
    + '<section class="bk-sec"><div class="bk-cols"><div><h2>Who is it for</h2>' + list(b.who) + "</div><div><h2>What you will learn</h2>" + list(b.learn) + "</div></div></section>"
    + '<section class="bk-sec"><h2>Book details</h2><table class="bk-table"><tbody>' + b.details.map((d) => "<tr><th>" + eh(d[0]) + "</th><td>" + eh(d[1]) + "</td></tr>").join("") + "</tbody></table></section>"
    + '<section class="bk-sec"><h2>Inside the book</h2><ol class="bk-toc">' + b.inside.map((c) => "<li><span>" + (c[0] ? "Chapter " + c[0] + " · " : "") + eh(c[1]) + "</span><span>p. " + c[2] + "</span></li>").join("") + "</ol></section>"
    + carousel(b) + faq(b)
    + (others.length ? '<section class="bk-sec"><h2>You may also like</h2><div class="bk-grid">' + others.map(card).join("") + "</div></section>" : "")
    + '<div class="bk-sticky" aria-label="Add to cart"><div class="in"><div><b>' + eh(b.title) + "</b><small>" + (BOOKP.launchOn ? R(BOOKP.launch) + " launch price" : R(BOOKP.price)) + ' · tax included</small></div><button class="btn sm" type="button" data-addcart="' + b.id + '">Add to cart</button></div></div></div>';
}

// ---- interactions (one delegated handler; works after every re-render)
function setGal(i){
  const gal = document.getElementById("bkgal"); if (!gal) return; const b = find("reasoning-samjho"); const all = [{ src: b.cover, alt: b.title + " book cover" }].concat(b.gallery);
  i = (i + all.length) % all.length; gal.dataset.i = i; const im = document.getElementById("bkgi"); im.src = all[i].src; im.alt = all[i].alt;
  document.getElementById("bkgc").textContent = (i + 1) + " / " + all.length; gal.querySelectorAll("[data-gi]").forEach((t) => t.setAttribute("aria-current", +t.dataset.gi === i ? "true" : "false"));
}
document.addEventListener("click", (e) => {
  const t = e.target.closest && e.target.closest("[data-g],[data-gi],[data-car],[data-more],[data-scroll]"); if (!t) return;
  const gal = document.getElementById("bkgal");
  if (t.dataset.g && gal) setGal(+gal.dataset.i + +t.dataset.g);
  else if (t.dataset.gi != null && gal) setGal(+t.dataset.gi);
  else if (t.dataset.car) { const c = document.getElementById("bkcar"); if (c) c.scrollBy({ left: +t.dataset.car * Math.max(260, c.clientWidth * 0.7), behavior: "smooth" }); }
  else if (t.hasAttribute("data-more")) { const m = t.closest(".bk-more"); const open = m.dataset.open === "1"; m.dataset.open = open ? "0" : "1"; t.textContent = open ? "View more" : "View less"; }
  else if (t.dataset.scroll) { const el = document.getElementById(t.dataset.scroll); if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }); }
});
document.addEventListener("keydown", (e) => { const gal = document.getElementById("bkgal"); if (!gal || /INPUT|TEXTAREA|SELECT/.test((e.target.tagName || ""))) return; if (e.key === "ArrowLeft") setGal(+gal.dataset.i - 1); if (e.key === "ArrowRight") setGal(+gal.dataset.i + 1); });

window.DDBOOK = { store, product, BOOKS, gum, thumb: (id) => id === "reasoning" ? "img/puzzles-cover-en.jpg" : "img/jigsaw/mystery-house-sm.webp" };
})();
