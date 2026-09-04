export interface Product {
  id: string;
  name: string;
  /** Copy shown in ProductPopup when this product's pair is matched. */
  popupCopy: string;
}

/**
 * PENDING (Fase 4 audit): only "rt3" has real content from the client — the
 * other 9 are placeholders so the board/popup pipeline is complete and
 * testable. Swap these for the real name + copy per product before launch;
 * nothing else needs to change (Game reads this list length, not a literal 10).
 */
export const PRODUCTS: Product[] = [
  { id: "rt3", name: "Aire RT3", popupCopy: "Con el aire RT3 de mirage la vida es cool" },
  { id: "product-02", name: "Producto 2", popupCopy: "Copy pendiente del cliente para Producto 2" },
  { id: "product-03", name: "Producto 3", popupCopy: "Copy pendiente del cliente para Producto 3" },
  { id: "product-04", name: "Producto 4", popupCopy: "Copy pendiente del cliente para Producto 4" },
  { id: "product-05", name: "Producto 5", popupCopy: "Copy pendiente del cliente para Producto 5" },
  { id: "product-06", name: "Producto 6", popupCopy: "Copy pendiente del cliente para Producto 6" },
  { id: "product-07", name: "Producto 7", popupCopy: "Copy pendiente del cliente para Producto 7" },
  { id: "product-08", name: "Producto 8", popupCopy: "Copy pendiente del cliente para Producto 8" },
  { id: "product-09", name: "Producto 9", popupCopy: "Copy pendiente del cliente para Producto 9" },
  { id: "product-10", name: "Producto 10", popupCopy: "Copy pendiente del cliente para Producto 10" },
];
