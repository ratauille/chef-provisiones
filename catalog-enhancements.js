/* Chef Franko: catalog enhancement, preserving the original Formspree order flow. */
(() => {
  const images = {
    "Premium Spirits":"photo-1510812431401-41d2bd2722f3",
    "Wine & Bubbles":"photo-1510812431401-41d2bd2722f3",
    "Luxury Waters":"photo-1433086966358-54859d0ed716",
    "Mixers & Essentials":"photo-1544145945-f90425340c7e",
    "Oils & Condiments":"photo-1474979266404-7eaacbcd87c5",
    "Dairy & Charcuterie":"photo-1486297678162-eb2a19b0a32d",
    "Bakery & Snacks":"photo-1509440159596-0249088772ff",
    "Fresh & Specialty":"photo-1542838132-92c53300491e",
    "USDA Prime & Wagyu":"photo-1607623814075-e51df1bdc82f",
    "Poultry Pork & Lamb":"photo-1604908176997-431c7a2e2a2e",
    "Fresh Fish":"photo-1510130387422-82bed34b37e9",
    "Premium Seafood":"photo-1559737558-2f5a35f4523b"
  };
  const catalog = document.getElementById("catalog");
  const filters = document.getElementById("filters");
  const products = document.getElementById("products");
  if (!catalog || !filters || !products || typeof P === "undefined") return;
  const search = document.createElement("input");
  search.id = "productSearch";
  search.type = "search";
  search.placeholder = "Search ingredients, brands or categories...";
  search.setAttribute("aria-label", "Search villa provisions");
  const count = document.createElement("p");
  count.id = "resultCount";
  count.setAttribute("aria-live", "polite");
  filters.before(search);
  filters.after(count);
  const escapeText = value => String(value).replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
  // TODO: Cambiar por foto real de la base de datos o almacenamiento.
  const imageFor = item => "https://images.unsplash.com/" + (images[item[1]] || "photo-1542838132-92c53300491e") + "?auto=format&fit=crop&w=640&q=80";
  function draw() {
    const q = search.value.trim().toLowerCase();
    const matches = P.map((item, index) => ({item,index})).filter(({item}) => (cat === "All" || item[1] === cat) && (!q || item.join(" ").toLowerCase().includes(q)));
    count.textContent = matches.length + " provisions available to request";
    products.innerHTML = matches.map(({item,index}) => `<article class="card border rounded-2xl bg-white"><img class="villa-image" loading="lazy" src="${imageFor(item)}" alt="Illustrative ${escapeText(item[1])} photograph" onerror="this.onerror=null;this.style.display='none'"><p class="r text-[11px] uppercase tracking-[.14em] font-bold mt-4">${escapeText(item[1])}</p><h3 class="font-semibold text-lg mt-2">${escapeText(item[0])}</h3><p class="text-gray-500 text-sm mt-2">${escapeText(item[2])}</p><div class="villa-card-footer"><span class="text-xs text-gray-500">Final price confirmed in quote</span><button type="button" class="bt text-white px-4 py-2 rounded-full text-sm font-semibold" aria-label="Add ${escapeText(item[0])} to villa list" data-add-index="${index}">+ Add to Villa</button></div></article>`).join("") || '<p class="col-span-full text-center text-gray-600 py-12">No matching provisions. Try another search.</p>';
  }
  search.addEventListener("input", draw);
  filters.addEventListener("click", () => queueMicrotask(draw));
  products.addEventListener("click", event => {
    const button = event.target.closest("[data-add-index]");
    if (button) add(Number(button.dataset.addIndex));
  });
  draw();
})();
