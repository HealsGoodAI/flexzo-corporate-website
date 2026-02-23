/**
 * Regionalisation utility – converts UK-English text to US-English
 * and swaps domain-specific terms (NHS → Healthcare Organizations, Staff Bank → Float Pool).
 */

// Domain-specific replacements (order matters – longer phrases first)
const domainReplacements: [RegExp, string][] = [
  // Staff Bank variations
  [/Collaborative Staff Bank/gi, "Collaborative Float Pool"],
  [/National Staff Bank/gi, "National Float Pool"],
  [/Internal Staff Bank/gi, "Internal Float Pool"],
  [/Staff Banks/gi, "Float Pools"],
  [/Staff Bank/gi, "Float Pool"],
  [/staff banks/gi, "float pools"],
  [/staff bank/gi, "float pool"],

  // Standalone bank/banks (after Staff Bank patterns so those match first)
  [/\bBanks\b/g, "Float Pools"],
  [/\bbanks\b/g, "float pools"],
  [/\bBank\b/g, "Float Pool"],
  [/\bbank\b/g, "float pool"],

  // NHS Trust variations
  [/NHS Trusts/gi, "Healthcare Organizations"],
  [/NHS Trust/gi, "Healthcare Organization"],
  [/NHS health assessments/gi, "health assessments"],
  [/NHS Pension Scheme/gi, "401(k) Retirement Plan"],
  [/NHS-equivalent/gi, "Industry-equivalent"],
  [/NHS terms/gi, "industry terms"],
  [/NHS workforce/gi, "healthcare workforce"],
  [/NHS/g, "Healthcare"],

  // Trust references (only standalone "Trusts" as organisations)
  [/Regional Trust/g, "Regional Health System"],
  [/partner\s+trusts/gi, "partner organizations"],
  [/Trusts/g, "Health Systems"],
];

// British → American spelling replacements
const spellingReplacements: [RegExp, string][] = [
  // -ise/-isation → -ize/-ization
  [/revolutionise/gi, (m) => m.replace(/ise$/i, "ize")],
  [/specialise[sd]?/gi, (m) => m.replace(/is/i, "iz")],
  [/recognise[sd]?/gi, (m) => m.replace(/is/i, "iz")],
  [/organis(e[sd]?|ation[s]?|ing)/gi, (m) => m.replace(/is/i, "iz")],
  [/optimis(e[sd]?|ation[s]?|ing)/gi, (m) => m.replace(/is/i, "iz")],
  [/minimis(e[sd]?|ation[s]?|ing)/gi, (m) => m.replace(/is/i, "iz")],
  [/customis(e[sd]?|ation[s]?|ing)/gi, (m) => m.replace(/is/i, "iz")],
  [/prioritis(e[sd]?|ation[s]?|ing)/gi, (m) => m.replace(/is/i, "iz")],
  [/prioritise[sd]?/gi, (m) => m.replace(/is/i, "iz")],
  [/standardis(e[sd]?|ation[s]?|ing)/gi, (m) => m.replace(/is/i, "iz")],
  [/digitalis(e[sd]?|ation[s]?|ing)/gi, (m) => m.replace(/is/i, "iz")],
  [/centralis(e[sd]?|ation[s]?|ing)/gi, (m) => m.replace(/is/i, "iz")],
  [/utilis(e[sd]?|ation[s]?|ing)/gi, (m) => m.replace(/is/i, "iz")],
  [/authoris(e[sd]?|ation[s]?|ing)/gi, (m) => m.replace(/is/i, "iz")],
  [/harmonise[sd]?/gi, (m) => m.replace(/is/i, "iz")],
  [/mobilise[sd]?/gi, (m) => m.replace(/is/i, "iz")],
  [/maximise[sd]?/gi, (m) => m.replace(/is/i, "iz")],
  [/normalise[sd]?/gi, (m) => m.replace(/is/i, "iz")],
  [/visualise[sd]?/gi, (m) => m.replace(/is/i, "iz")],
  [/summarise[sd]?/gi, (m) => m.replace(/is/i, "iz")],
  [/categorise[sd]?/gi, (m) => m.replace(/is/i, "iz")],
  [/analyse[sd]?/gi, (m) => m.replace(/ys/i, "yz")],

  // -our → -or
  [/behaviour[s]?/gi, (m) => m.replace(/our/i, "or")],
  [/favour(ite[s]?|able|ed|ing|s)?/gi, (m) => m.replace(/our/i, "or")],
  [/colour[s]?/gi, (m) => m.replace(/our/i, "or")],
  [/labour[s]?/gi, (m) => m.replace(/our/i, "or")],
  [/honour(able|ed|ing|s)?/gi, (m) => m.replace(/our/i, "or")],
  [/humour[s]?/gi, (m) => m.replace(/our/i, "or")],
  [/neighbour(hood|ing|s)?/gi, (m) => m.replace(/our/i, "or")],

  // -re → -er
  [/\bcentre[s]?\b/gi, (m) => m.replace(/re/i, "er")],
  [/\blitre[s]?\b/gi, (m) => m.replace(/re/i, "er")],
  [/\bmetre[s]?\b/gi, (m) => m.replace(/re/i, "er")],
  [/\bfibre[s]?\b/gi, (m) => m.replace(/re/i, "er")],

  // -ogue → -og
  [/catalogue[sd]?/gi, (m) => m.replace(/ogue/, "og")],
  [/dialogue[s]?/gi, (m) => m.replace(/ogue/, "og")],

  // -mme → -m
  [/programme[s]?/gi, (m) => m.replace(/mme/, "m")],

  // doubled l → single l
  [/\benrol(l?)(ment|ling|led)/gi, "enrol$2"],
  [/\bcounsell(or|ing|ed)/gi, "counsel$1"],
  [/\bmodell(ing|ed)/gi, "model$1"],
  [/\btravell(ing|ed|er)/gi, "travel$1"],
  [/\bfuelfill/gi, "fulfill"],
  [/\bfulfil([^l])/gi, "fulfill$1"],

  // Other specific words
  [/\bgrey\b/gi, "gray"],
  [/\blicence\b/gi, "license"],
  [/\bdefence\b/gi, "defense"],
  [/\boffence\b/gi, "offense"],
  [/\bpractise\b/gi, "practice"],
  [/\bcheque[s]?\b/gi, (m) => m.replace(/que/, "ck")],
  [/\baeroplane[s]?\b/gi, (m) => m.replace(/aeroplane/, "airplane")],
  [/\bmanoeuvre[s]?\b/gi, (m) => m.replace(/oeuvre/, "euver")],
  [/\bjewellery\b/gi, "jewelry"],
  [/\baluminium\b/gi, "aluminum"],
  [/\bplough(ed|ing|s)?\b/gi, (m) => m.replace(/plough/, "plow")],
  [/\bdraught[s]?\b/gi, (m) => m.replace(/draught/, "draft")],
] as any;

/**
 * Convert UK-English text to US-English with domain term swaps.
 * Returns original text if region is "uk".
 */
export function regionalize(text: string, region: "uk" | "us"): string {
  if (region === "uk") return text;

  let result = text;

  // Apply domain replacements first
  for (const [pattern, replacement] of domainReplacements) {
    result = result.replace(pattern, replacement as string);
  }

  // Apply spelling replacements
  for (const [pattern, replacement] of spellingReplacements) {
    result = result.replace(pattern, replacement as any);
  }

  return result;
}

/**
 * React hook that returns a `t()` function for regionalizing text.
 */
import { useRegion } from "@/hooks/useRegion";

export function useRegionText() {
  const { region } = useRegion();
  const t = (text: string) => regionalize(text, region);
  return { t, region };
}
