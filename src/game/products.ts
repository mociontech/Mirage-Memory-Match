import boilerTurboFlux from "../assets/images/products/boiler-turbo-flux.webp";
import ciMagnumComercialLigero from "../assets/images/products/ci-magnum-comercial-ligero.webp";
import disx30 from "../assets/images/products/disx30.webp";
import m22MinisplitColombia from "../assets/images/products/m22-minisplit-colombia.webp";
import neoMinisplit from "../assets/images/products/neo-minisplit.webp";
import nexMinisplit from "../assets/images/products/nex-minisplit.webp";
import v32Minisplit from "../assets/images/products/v32-minisplit.webp";
import xtraMultinverter from "../assets/images/products/xtra-multinverter.webp";

export interface Product {
  id: string;
  name: string;
  image: string;
  /** Copy shown in ProductPopup when this product's pair is matched. */
  popupCopy: string;
}

/**
 * Colombia board, per Figma node 209:862 ("inicio Juego" in the COLOMBIA
 * section of the Mirage file, fileKey vilVPSsVUtGwTG8Er9njo5): 8 products,
 * 16 cards, 4x4 grid — matches PAIRS_COUNT in game.config.ts.
 *
 * PENDING (client copy): popupCopy is still placeholder for all products —
 * Figma only labels this "8 pantallas totales, una por producto" without
 * final copy text yet. Names and images are real.
 */
export const PRODUCTS: Product[] = [
  { id: "nex", name: "NEX", image: nexMinisplit, popupCopy: "Copy pendiente del cliente para NEX" },
  { id: "neo", name: "NEO", image: neoMinisplit, popupCopy: "Copy pendiente del cliente para NEO" },
  { id: "v32", name: "V32", image: v32Minisplit, popupCopy: "Copy pendiente del cliente para V32" },
  { id: "disx30", name: "DIS X30", image: disx30, popupCopy: "Copy pendiente del cliente para DIS X30" },
  {
    id: "ci-magnum",
    name: "Ci Magnum",
    image: ciMagnumComercialLigero,
    popupCopy: "Copy pendiente del cliente para Ci Magnum",
  },
  {
    id: "xtra-multinverter",
    name: "Xtra Multi Inverter",
    image: xtraMultinverter,
    popupCopy: "Copy pendiente del cliente para Xtra Multi Inverter",
  },
  {
    id: "m22-magnum",
    name: "Magnum 22",
    image: m22MinisplitColombia,
    popupCopy: "Copy pendiente del cliente para Magnum 22",
  },
  {
    id: "boiler-turbo-flux",
    name: "Turbo Flux",
    image: boilerTurboFlux,
    popupCopy: "Copy pendiente del cliente para Turbo Flux",
  },
];
