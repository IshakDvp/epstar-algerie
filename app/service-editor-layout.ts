// Explicit display order, independent of persisted JSON property order.
// Keep legacy copy.back in storage for compatibility, but never expose/render it.
export const serviceEditorSections = [
  {id:"hero",label:"1 — Bannière principale",fields:["eyebrow","headline","text","contact"],images:["model"]},
  {id:"includes",label:"2 — Prestations",fields:["includes","includesText","list"],images:[]},
  {id:"process",label:"3 — Méthode et étapes",fields:["process","processTitle","intro","steps"],images:[]},
  {id:"gallery",label:"4 — Galerie",fields:["gallery","galleryTitle","materialLabel"],images:["photo"]},
  {id:"quote",label:"5 — Demande de devis",fields:["cta","ctaText"],images:[]},
  {id:"other",label:"6 — Autres services",fields:["other"],images:[]},
] as const;
