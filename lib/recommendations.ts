import {
  peptideProfiles,
  type AdministrationPreferenceOption,
  type BlendPreferenceOption,
  type BudgetOption,
  type GoalOption,
  type HealthCondition,
  type LifestyleFactor,
  type PeptideId,
  type QuizAnswers,
} from "@/lib/quiz-data";

export type ResultPeptide = {
  id: PeptideId;
  whyChosen: string;
  dosingRange?: string;
  routeAdjustment?: string;
  timingSuggestion?: string;
  interactionNotes: string[];
};

export type ResultMilestone = {
  label: string;
  detail: string;
};

export type ProtocolCalendarItem = {
  phase: string;
  detail: string;
};

export type QuizResult = {
  headline: string;
  summary: string;
  stackName: string;
  peptides: ResultPeptide[];
  timeline: ResultMilestone[];
  protocolCalendar: ProtocolCalendarItem[];
  citations: string[];
  researchNotes: string[];
  interactionWarnings: string[];
  stackVsGeneric: string[];
  educationalLinks: { label: string; href: string }[];
  reportIntro: string;
  complianceDisclaimer: string;
  upgradeMessage?: string;
};

const budgetRank: Record<BudgetOption, number> = {
  "Under $100": 1,
  "$100-200": 2,
  "$200-350": 3,
  "$350-500": 4,
  "$500+": 5,
};

const conditionMap: Partial<Record<HealthCondition, GoalOption>> = {
  "Chronic joint or tendon discomfort": "Pain & Injury Recovery",
  "Hair thinning or shedding": "Hair Restoration & Skin Health",
  "Weight management resistance": "Body Composition & Fat Loss",
  "Visible skin aging or texture changes": "Longevity & Anti-Aging",
  "Brain fog or poor focus": "Cognitive Performance & Focus",
  "Poor sleep quality": "Sleep & Recovery",
};

const routeMatch: Partial<Record<AdministrationPreferenceOption, PeptideId[]>> = {
  "Sublingual drops (easy, no needles)": ["bpc-157", "nad-plus"],
  "Nasal spray (fast absorption, simple)": ["selank", "semax"],
  "Topical cream/serum (targeted application)": ["ghk-cu", "glow"],
};

const interactionLibrary: Partial<Record<PeptideId, string[]>> = {
  "bpc-157": [
    "BPC-157 is commonly paired with TB-500 when the goal is broader connective-tissue signaling rather than a single-pathway recovery approach.",
    "If BPC-157 appears beside KLOW, the blend version may simplify the stack for someone who values convenience over component-by-component control.",
  ],
  "tb-500": [
    "TB-500 is often discussed as complementary to BPC-157 because cell-migration and remodeling themes can broaden a recovery-first stack.",
    "When TB-500 appears with GHK-Cu or KLOW, the stack leans more heavily into tissue-quality and remodeling conversations.",
  ],
  "ghk-cu": [
    "GHK-Cu is often paired with topical hair or skin routines and can also complement recovery stacks where collagen remodeling is relevant.",
    "When GHK-Cu appears beside GLOW or KLOW, the blend path usually emphasizes convenience and broader cosmetic or healing context.",
  ],
  "tesamorelin": [
    "Tesamorelin plus Ipamorelin or CJC-1295 creates a stronger GH-axis stack, so glucose tolerance and IGF-1 context deserve extra attention.",
  ],
  ipamorelin: [
    "Ipamorelin often complements CJC-1295 or Tesamorelin in GH-pulse discussions, but combining GH-axis compounds increases complexity quickly.",
  ],
  "cjc-1295": [
    "CJC-1295 is frequently discussed alongside Ipamorelin in classic GH-axis stacking frameworks, which is why it usually appears only in higher-complexity outputs.",
  ],
  "nad-plus": [
    "NAD+ often plays a support role rather than the headline role, pairing naturally with mitochondrial, focus, or longevity stacks.",
  ],
  "mots-c": [
    "MOTS-C is commonly layered with NAD+ or SS-31 when the goal is broader mitochondrial resilience rather than a single energy angle.",
  ],
  selank: [
    "Selank and Semax are often discussed together because one leans calmer while the other leans more stimulating and focus-oriented.",
  ],
  semax: [
    "Semax is often stacked with Selank when the goal is balanced cognition rather than raw stimulation alone.",
  ],
  klow: [
    "KLOW already bundles BPC-157, TB-500, GHK-Cu, and KPV logic into one convenience-forward recovery option.",
  ],
  glow: [
    "GLOW is most useful when someone wants a convenience-first hair or skin option instead of building around standalone GHK-Cu.",
  ],
};

const educationalLinks = [
  { label: "PeptideLaunch Hair Education", href: "https://peptidelaunch.com/hair" },
  { label: "PeptideLaunch Recovery Education", href: "https://peptidelaunch.com/recovery" },
  { label: "PeptideLaunch Longevity Education", href: "https://peptidelaunch.com/longevity" },
];

const basePlans: Record<
  GoalOption,
  {
    stackName: string;
    summary: string;
    primary: PeptideId[];
    enhanced: PeptideId[];
    premium: PeptideId[];
    longTermAdds: PeptideId[];
    conditionAdds: Partial<Record<HealthCondition, PeptideId[]>>;
    rationale: Partial<Record<PeptideId, string>>;
    genericComparison: string[];
  }
> = {
  "Pain & Injury Recovery": {
    stackName: "Repair, Recovery & Inflammation Research Stack",
    summary:
      "This result was built to feel more like a smart consult than a generic peptide list. For recovery goals, the engine starts with the most relevant repair literature, then decides whether a convenience blend or a component stack makes more sense based on your answers.",
    primary: ["bpc-157"],
    enhanced: ["bpc-157", "tb-500"],
    premium: ["bpc-157", "tb-500", "ss-31", "klow"],
    longTermAdds: ["ss-31"],
    conditionAdds: {
      "Digestive stress or gut sensitivity": ["bpc-157"],
      "Slow workout recovery": ["ss-31"],
    },
    rationale: {
      "bpc-157": "You signaled a repair-first goal, so the stack opens with the clearest connective-tissue and gut-repair research anchor rather than immediately jumping into a busier stack.",
      "tb-500": "TB-500 was layered in because your answers support a broader remodeling-and-recovery strategy, not just a minimal single-compound starting point.",
      "ss-31": "SS-31 appears when the profile suggests recovery is tied to deeper energy or resilience demands, especially across longer timelines.",
      klow: "Because your goal strongly matches healing, inflammation, or pain recovery themes, KLOW gives a convenience-first path built around BPC-157, TB-500, GHK-Cu, and KPV.",
    },
    genericComparison: [
      "A generic recovery stack usually shows everyone BPC-157 and stops there. Your version adjusts for budget, route tolerance, and whether convenience matters more than control.",
      "Because you answered a real intake instead of clicking a broad category, the result can decide whether a blend like KLOW deserves priority or whether the components should stay separate.",
    ],
  },
  "Hair Restoration & Skin Health": {
    stackName: "Hair, Scalp & Skin Research Stack",
    summary:
      "For hair and skin goals, the engine leans into scalp biology, follicle support, and cosmetic-style consistency. It avoids the lazy mistake of treating hair and skin like the same problem as body composition or general longevity.",
    primary: ["ghk-cu"],
    enhanced: ["ghk-cu", "glow"],
    premium: ["ghk-cu", "glow", "nad-plus"],
    longTermAdds: ["nad-plus"],
    conditionAdds: {
      "Visible skin aging or texture changes": ["nad-plus"],
    },
    rationale: {
      "ghk-cu": "GHK-Cu is the cleanest first fit because it sits at the center of the strongest hair-and-skin research in the reference set.",
      glow: "GLOW was surfaced because your answers support a convenience-first hair/skin framework rather than a purely component-level build.",
      "nad-plus": "NAD+ shows up when your answers point beyond appearance alone and toward broader cellular-energy or healthy-aging context.",
    },
    genericComparison: [
      "A generic hair result would simply mention GHK-Cu to everyone. Your report decides whether you’re better served by GHK-Cu alone, a convenience blend like GLOW, or a broader support layer.",
      "It also weighs skin-aging signals, lifestyle exposure, and whether you prefer a topical-first approach instead of assuming everyone wants a needle-based protocol.",
    ],
  },
  "Body Composition & Fat Loss": {
    stackName: "Body Composition Research Stack",
    summary:
      "For body-composition goals, the engine favors the best-known adiposity and GH-axis literature first, then only adds complexity when your budget, timeline, and comfort level support it.",
    primary: ["tesamorelin"],
    enhanced: ["tesamorelin", "ipamorelin"],
    premium: ["tesamorelin", "ipamorelin", "cjc-1295", "aod-9604"],
    longTermAdds: ["cjc-1295"],
    conditionAdds: {
      "Low energy or fatigue": ["ipamorelin"],
      "Weight management resistance": ["aod-9604"],
    },
    rationale: {
      tesamorelin: "Tesamorelin stayed at the center because it has the clearest clinical footing in this category rather than just hype-driven demand.",
      ipamorelin: "Ipamorelin was added because your profile can reasonably support a fuller GH-pulse discussion instead of a single-anchor result.",
      "cjc-1295": "CJC-1295 only enters when the answers justify a more advanced GH-axis stack rather than a beginner-friendly starting point.",
      "aod-9604": "AOD-9604 appears when the intake leans more directly into fat-loss framing instead of broad performance or longevity language.",
    },
    genericComparison: [
      "Generic fat-loss outputs usually overstack GH-axis compounds immediately. Your result keeps complexity earned, not assumed.",
      "It also adjusts for whether convenience or highest-confidence evidence matters more to you, which changes how aggressive the final stack should look.",
    ],
  },
  "Longevity & Anti-Aging": {
    stackName: "Longevity & Mitochondrial Research Stack",
    summary:
      "This pathway starts with metabolic and mitochondrial resilience themes, then decides how much of the more exploratory healthy-aging literature actually belongs in your plan.",
    primary: ["mots-c"],
    enhanced: ["mots-c", "nad-plus"],
    premium: ["mots-c", "nad-plus", "epitalon", "ss-31"],
    longTermAdds: ["epitalon", "ss-31"],
    conditionAdds: {
      "Low energy or fatigue": ["nad-plus"],
      "Visible skin aging or texture changes": ["epitalon"],
    },
    rationale: {
      "mots-c": "MOTS-C was chosen as the lead because it gives the longevity category a grounded metabolic anchor instead of a vague anti-aging promise.",
      "nad-plus": "NAD+ was layered in because your answers suggest a broader energy-and-repair conversation, not just a single longevity label.",
      epitalon: "Epitalon is reserved for users whose answers justify a longer-horizon, more exploratory healthy-aging protocol.",
      "ss-31": "SS-31 appears when mitochondrial resilience deserves a more serious role in the stack than a generic longevity page would normally provide.",
    },
    genericComparison: [
      "A generic longevity stack tends to throw every trendy molecule into one list. Your version filters for timeline, sensitivity, and evidence confidence before expanding.",
      "That means the result can stay focused instead of becoming a grab-bag of ‘anti-aging’ ideas.",
    ],
  },
  "Cognitive Performance & Focus": {
    stackName: "Cognition, Focus & Calm Research Stack",
    summary:
      "For cognitive goals, the engine tries to separate stimulation from steadier calm-focus support. That creates a result that feels more tailored than simply recommending every nootropic peptide at once.",
    primary: ["selank"],
    enhanced: ["selank", "semax"],
    premium: ["selank", "semax", "nad-plus"],
    longTermAdds: ["nad-plus"],
    conditionAdds: {
      "Brain fog or poor focus": ["semax"],
      "Low energy or fatigue": ["nad-plus"],
    },
    rationale: {
      selank: "Selank led the stack because your intake suggests you may benefit more from smooth calm-focus support than from a harsher stimulation-first path.",
      semax: "Semax was added because your answers indicate attention and drive matter enough to justify a more performance-oriented layer.",
      "nad-plus": "NAD+ appears when the cognitive picture includes low energy, resilience, or broader recovery capacity.",
    },
    genericComparison: [
      "A generic focus stack would usually toss Selank and Semax into the same bucket for everyone. Your result differentiates between calm-focus support, energy support, and a fuller cognitive stack.",
    ],
  },
  "Sleep & Recovery": {
    stackName: "Sleep, Calm & Recovery Research Stack",
    summary:
      "When sleep is the main goal, the best result is rarely the most crowded one. This pathway starts with lower-friction calm and recovery support, then adds depth only when the rest of the intake justifies it.",
    primary: ["selank"],
    enhanced: ["selank", "bpc-157"],
    premium: ["selank", "bpc-157", "mots-c", "dsip"],
    longTermAdds: ["mots-c", "dsip"],
    conditionAdds: {
      "Digestive stress or gut sensitivity": ["bpc-157"],
      "Low energy or fatigue": ["mots-c"],
    },
    rationale: {
      selank: "Selank leads because it gives the strongest calm-support angle without making the result feel needlessly complicated.",
      "bpc-157": "BPC-157 was added because sleep complaints often overlap with recovery and gut-stress signals in the intake.",
      "mots-c": "MOTS-C shows up when the profile suggests the sleep issue may be tied to broader resilience or energy regulation.",
      dsip: "DSIP stays contextual, appearing only when a fuller sleep-oriented protocol makes sense and the tool should acknowledge thinner but still relevant literature.",
    },
    genericComparison: [
      "A generic sleep result would usually show one calming peptide and move on. Your report looks at gut flags, fatigue, and overall recovery context before deciding whether to widen the stack.",
    ],
  },
};

function unique<T>(items: T[]) {
  return Array.from(new Set(items));
}

function determineGoal(answers: QuizAnswers): GoalOption {
  if (answers.goal) return answers.goal;
  const inferred = answers.conditions.find((condition) => conditionMap[condition]);
  return inferred ? conditionMap[inferred]! : "Pain & Injury Recovery";
}

function determineBaseStack(answers: QuizAnswers, goal: GoalOption) {
  const plan = basePlans[goal];
  const budget = answers.budget ? budgetRank[answers.budget] : 2;
  const beginner = answers.experience === "Brand new — I want a simple starting point";
  const advanced = answers.experience === "I’m experienced and comfortable with more nuance";

  if (beginner || budget <= 2) return [...plan.primary];
  if (advanced || budget >= 4) return [...plan.premium];
  return [...plan.enhanced];
}

function applyBlendPreference(peptides: PeptideId[], answers: QuizAnswers, goal: GoalOption): PeptideId[] {
  const preference: BlendPreferenceOption | "" = answers.blendPreference;

  if (goal === "Pain & Injury Recovery") {
    if (preference === "Ready-made blends (convenience)") return unique(["klow", ...peptides.filter((id) => !["bpc-157", "tb-500", "ghk-cu"].includes(id))]);
    if (preference === "Individual peptides (maximum control)") return unique(peptides.filter((id) => id !== "klow").concat(["bpc-157", "tb-500"]));
    if (preference === "Mix of both") return unique(["klow", "bpc-157", "tb-500", ...peptides]);
  }

  if (goal === "Hair Restoration & Skin Health") {
    if (preference === "Ready-made blends (convenience)") return unique(["glow", ...peptides.filter((id) => id !== "ghk-cu")]);
    if (preference === "Individual peptides (maximum control)") return unique(peptides.filter((id) => id !== "glow").concat(["ghk-cu"]));
    if (preference === "Mix of both") return unique(["glow", "ghk-cu", ...peptides]);
  }

  return peptides;
}

function applyRoutePreference(peptides: PeptideId[], answers: QuizAnswers) {
  const route = answers.administrationPreference;
  if (!route || route === "Open to any method") return peptides;
  return unique([...(routeMatch[route] ?? []), ...peptides]);
}

function applyAdjustments(base: PeptideId[], answers: QuizAnswers, goal: GoalOption) {
  const plan = basePlans[goal];
  let peptides = [...base];

  if (answers.priority === "Highest-confidence research first") {
    peptides = unique([...plan.primary, ...peptides.filter((id) => id !== "dsip")]);
  }

  if (answers.priority === "I want the simplest path to evaluate") {
    peptides = unique([...plan.primary]);
  }

  if (answers.priority === "I care most about convenience") {
    peptides = applyBlendPreference(
      peptides,
      {
        ...answers,
        blendPreference: (answers.blendPreference || "Ready-made blends (convenience)") as QuizAnswers["blendPreference"],
      },
      goal,
    );
  }

  if (answers.priority === "I want the most complete stack my budget allows" && answers.budget && budgetRank[answers.budget] >= 3) {
    peptides = unique([...peptides, ...plan.longTermAdds, ...plan.premium]);
  }

  for (const condition of answers.conditions) {
    if (condition === "None of these") continue;
    const adds = plan.conditionAdds[condition];
    if (adds) peptides = unique([...peptides, ...adds]);
  }

  if (answers.lifestyleFactors.includes("High stress") && goal === "Sleep & Recovery") peptides = unique(["selank", ...peptides]);
  if (answers.lifestyleFactors.includes("Outdoor/sun exposure") && goal === "Hair Restoration & Skin Health") peptides = unique(["ghk-cu", ...peptides]);
  if (answers.lifestyleFactors.includes("Regular exercise (3+ days/week)") && goal === "Pain & Injury Recovery") peptides = unique(["tb-500", ...peptides]);
  if (answers.lifestyleFactors.includes("Poor sleep (<6 hours)") && goal === "Longevity & Anti-Aging") peptides = unique(["nad-plus", ...peptides]);
  if (answers.lifestyleFactors.includes("Poor sleep (<6 hours)") && goal === "Body Composition & Fat Loss") peptides = unique(["ipamorelin", ...peptides]);

  if (answers.timeline === "I want a 30-day starting plan") {
    peptides = peptides.filter((id) => !["epitalon", "ss-31"].includes(id));
  }

  if (answers.timeline === "I’m building a long-term optimization plan") {
    peptides = unique([...peptides, ...plan.longTermAdds]);
  }

  peptides = applyBlendPreference(peptides, answers, goal);
  peptides = applyRoutePreference(peptides, answers);

  if (answers.sensitivity === "Very sensitive (start low)") {
    peptides = peptides.filter((id, index) => index < 3 || ["klow", "glow"].includes(id));
  }

  return unique(peptides);
}

function buildRouteAdjustment(id: PeptideId, answers: QuizAnswers) {
  const route = answers.administrationPreference;
  if (!route || route === "Open to any method") return undefined;

  if (route === "Topical cream/serum (targeted application)" && ["ghk-cu", "glow"].includes(id)) {
    return "Because you prefer a targeted topical route, this result leans harder into scalp and skin-friendly options rather than forcing an injection-first conversation.";
  }

  if (route === "Nasal spray (fast absorption, simple)" && ["selank", "semax"].includes(id)) {
    return "Because you prefer a nasal route, this result elevates compounds commonly discussed in intranasal research settings.";
  }

  if (route === "Sublingual drops (easy, no needles)" && ["bpc-157", "nad-plus"].includes(id)) {
    return "Because you prefer a no-needle route, this output prioritizes compounds that are more often discussed in lower-friction educational formats.";
  }

  if (route === "Subcutaneous injection (highest bioavailability)") {
    return "Because you’re comfortable with subcutaneous protocols, the engine did not filter out more bioavailability-forward research options.";
  }

  return peptideProfiles[id].routeNote;
}

function buildPeptideReason(goal: GoalOption, peptideId: PeptideId, answers: QuizAnswers): ResultPeptide {
  const plan = basePlans[goal];
  const profile = peptideProfiles[peptideId];

  return {
    id: peptideId,
    whyChosen:
      plan.rationale[peptideId] ??
      `This compound stayed in the stack because it supports the ${goal.toLowerCase()} pathway you prioritized and still fit your route, budget, and complexity preferences.`,
    dosingRange: profile.researchDosing,
    routeAdjustment: buildRouteAdjustment(peptideId, answers),
    timingSuggestion: profile.timingSuggestion,
    interactionNotes: interactionLibrary[peptideId] ?? ["This compound was included as part of a broader goal-matched stack rather than as a standalone generic pick."],
  };
}

function buildTimeline(goal: GoalOption, peptides: PeptideId[], answers: QuizAnswers): ResultMilestone[] {
  const first = peptideProfiles[peptides[0]]?.name ?? "your primary anchor";
  const second = peptideProfiles[peptides[1]]?.name;
  const rest = peptides.slice(2).map((id) => peptideProfiles[id].name).join(", ");

  return [
    {
      label: "Week 1-2",
      detail: `Start with ${first} as the anchor so the protocol stays interpretable from day one. ${answers.sensitivity === "Very sensitive (start low)" ? "Because you described yourself as very sensitive, a slower and more conservative ramp makes the most sense here." : "The goal in the first two weeks is clarity, not stacking everything at once."}`,
    },
    {
      label: "Week 3-4",
      detail: second
        ? `If the stack still feels aligned, this is the stage where research discussions commonly introduce ${second} to create a second mechanism without making the plan chaotic.`
        : "If your result stayed intentionally simple, this phase is about holding the line rather than adding compounds just because the calendar says to.",
    },
    {
      label: "Month 2-3",
      detail: rest
        ? `The full protocol window is where ${rest} may make sense if your original goal still supports more depth. This keeps expansion purposeful instead of generic.`
        : `For ${goal.toLowerCase()}, a cleaner stack may genuinely be the better long-view play rather than automatically adding more compounds.`,
    },
  ];
}

function buildProtocolCalendar(peptides: PeptideId[]) {
  const first = peptideProfiles[peptides[0]]?.name ?? "Primary compound";
  const second = peptideProfiles[peptides[1]]?.name;
  const extras = peptides.slice(2).map((id) => peptideProfiles[id].name);

  return [
    {
      phase: "Week 1-2: establish the base",
      detail: `Begin with ${first} as the primary research anchor. Keep other variables steady so the first phase actually tells you something useful.`,
    },
    {
      phase: "Week 3-4: add the secondary layer",
      detail: second
        ? `Introduce ${second} only if the original goal still points in the same direction and the protocol complexity still feels justified.`
        : "Hold the base protocol steady and continue observing whether the first layer is enough before graduating to a busier stack.",
    },
    {
      phase: "Month 2-3: complete the personalized stack",
      detail: extras.length
        ? `If the earlier phases still make sense, the stack can expand toward ${extras.join(", ")} as the personalized full-protocol layer.`
        : "Reassess whether a fuller stack is even necessary. Personalized does not always mean more compounds.",
    },
  ];
}

function buildResearchNotes(answers: QuizAnswers, goal: GoalOption, isFull: boolean) {
  const notes = [
    "This tool compiles publicly available research for educational purposes only. It is not medical advice. Consult a qualified healthcare provider before beginning any protocol.",
    "Every dosing mention is framed as published research or community-reported protocol language, not a personal recommendation.",
    "Much of the peptide literature remains preclinical, exploratory, route-specific, or derived from small study populations.",
    `Your result was adjusted for ${goal.toLowerCase()} goals, plus the practical constraints you shared around budget, sensitivity, and preferred administration style.`,
  ];

  if (answers.supplementStack.trim()) notes.push(`Current supplement context considered: ${answers.supplementStack.trim()}.`);
  if (answers.previousExperience.trim()) notes.push(`Previous peptide context considered: ${answers.previousExperience.trim()}.`);
  if (isFull && answers.lifestyleFactors.length) notes.push(`Lifestyle factors shaping the report: ${answers.lifestyleFactors.join(", ")}.`);

  return notes;
}

function buildWarnings(peptides: PeptideId[]) {
  return unique(
    peptides
      .flatMap((id) => peptideProfiles[id].warnings)
      .concat([
        "Stacking multiple GH-axis compounds increases the need to think about glucose regulation, IGF-1 context, and overall protocol complexity.",
        "Blends can simplify logistics, but they can also make it harder to isolate which component is driving a response in a research setting.",
        "If pregnancy, breastfeeding, cancer history, psychiatric medication use, endocrine medication use, or anticoagulation is part of the picture, a qualified healthcare provider should review the protocol context first.",
      ]),
  );
}

function buildCitations(peptides: PeptideId[]) {
  return unique(
    peptides.flatMap((id) => peptideProfiles[id].citations.map((citation) => `${citation.label}${citation.doi ? ` • DOI ${citation.doi}` : ""}`)),
  );
}

export function buildResult(answers: QuizAnswers, isFull: boolean): QuizResult {
  const goal = determineGoal(answers);
  const plan = basePlans[goal];

  let peptides = determineBaseStack(answers, goal);
  peptides = applyAdjustments(peptides, answers, goal);
  peptides = isFull ? peptides.slice(0, 4) : peptides.slice(0, 2);

  const resultPeptides = peptides.map((id) => buildPeptideReason(goal, id, answers));

  return {
    headline: isFull ? `Your personalized ${goal.toLowerCase()} protocol` : `Your personalized ${goal.toLowerCase()} preview`,
    summary: plan.summary,
    stackName: plan.stackName,
    peptides: resultPeptides,
    timeline: buildTimeline(goal, peptides, answers),
    protocolCalendar: buildProtocolCalendar(peptides),
    citations: buildCitations(peptides),
    researchNotes: buildResearchNotes(answers, goal, isFull),
    interactionWarnings: buildWarnings(peptides),
    stackVsGeneric: plan.genericComparison,
    educationalLinks,
    reportIntro:
      "This report is designed to feel like the condensed version of a high-end consultation: clear, practical, research-grounded, and tailored to the signals you gave us instead of recycled one-size-fits-all peptide copy.",
    complianceDisclaimer:
      "This tool compiles publicly available research for educational purposes only. It is not medical advice. Consult a qualified healthcare provider before beginning any protocol.",
    upgradeMessage: isFull
      ? undefined
      : "Unlock the full $147 protocol to see the complete stack, 30/60/90 day calendar, dosing research with citations, timing notes, and interaction guidance.",
  };
}
