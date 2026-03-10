export type GoalOption =
  | "Pain Recovery"
  | "Hair Restoration"
  | "Body Composition"
  | "Longevity"
  | "Cognitive Performance"
  | "Sleep & Recovery";

export type ExperienceOption =
  | "Complete beginner"
  | "Some research"
  | "Currently using peptides";

export type PriorityOption =
  | "Fastest results"
  | "Lowest cost"
  | "Most research backing"
  | "Fewest side effects";

export type HealthCondition =
  | "Joint pain"
  | "Hair thinning"
  | "Low energy"
  | "Poor sleep"
  | "Slow recovery"
  | "Gut issues"
  | "Brain fog"
  | "None";

export type AgeRangeOption =
  | "18-30"
  | "31-40"
  | "41-50"
  | "51-60"
  | "60+";

export type BudgetOption =
  | "Under $100"
  | "$100-250"
  | "$250-500"
  | "$500+";

export type DeliveryPreference =
  | "Prefer oral"
  | "Fine with injections"
  | "No preference";

export type TimelineExpectation =
  | "30 days"
  | "60 days"
  | "90 days"
  | "6+ months";

export type QuizAnswers = {
  goal: GoalOption | "";
  experience: ExperienceOption | "";
  priority: PriorityOption | "";
  email: string;
  conditions: HealthCondition[];
  supplements: string;
  ageRange: AgeRangeOption | "";
  budget: BudgetOption | "";
  deliveryPreference: DeliveryPreference | "";
  timeline: TimelineExpectation | "";
  notes: string;
};

export type Citation = {
  label: string;
  doi?: string;
};

export type PeptideId =
  | "bpc-157"
  | "tb-500"
  | "ss-31"
  | "ghk-cu"
  | "glow-blend"
  | "tesamorelin"
  | "ipamorelin"
  | "cjc-1295"
  | "aod-9604"
  | "mots-c"
  | "epitalon"
  | "nad-plus"
  | "selank"
  | "semax"
  | "dsip";

export type PeptideProfile = {
  id: PeptideId;
  name: string;
  slug: string;
  category: "peptide" | "blend" | "cofactor";
  supportLevel: "stronger" | "moderate" | "limited";
  overview: string;
  beginnerAngle: string;
  advancedAngle: string;
  oralBiasNote?: string;
  citations: Citation[];
  educationUrl: string;
  blendDisclosure?: string;
};

export const freeQuestions = [
  {
    id: "goal",
    title: "What is the primary health goal for this research review?",
    options: [
      "Pain Recovery",
      "Hair Restoration",
      "Body Composition",
      "Longevity",
      "Cognitive Performance",
      "Sleep & Recovery",
    ] satisfies GoalOption[],
  },
  {
    id: "experience",
    title: "How experienced are you with peptide research topics?",
    options: [
      "Complete beginner",
      "Some research",
      "Currently using peptides",
    ] satisfies ExperienceOption[],
  },
  {
    id: "priority",
    title: "Which decision filter matters most right now?",
    options: [
      "Fastest results",
      "Lowest cost",
      "Most research backing",
      "Fewest side effects",
    ] satisfies PriorityOption[],
  },
] as const;

export const fullQuestions = [
  {
    id: "conditions",
    title: "Current health conditions",
    description: "Choose all that match the current research context.",
    options: [
      "Joint pain",
      "Hair thinning",
      "Low energy",
      "Poor sleep",
      "Slow recovery",
      "Gut issues",
      "Brain fog",
      "None",
    ] satisfies HealthCondition[],
  },
  {
    id: "supplements",
    title: "Current supplements or protocols",
    description: "Optional context to avoid redundant stack ideas.",
    type: "textarea",
  },
  {
    id: "ageRange",
    title: "Age range",
    options: ["18-30", "31-40", "41-50", "51-60", "60+"] satisfies AgeRangeOption[],
  },
  {
    id: "budget",
    title: "Monthly budget",
    options: [
      "Under $100",
      "$100-250",
      "$250-500",
      "$500+",
    ] satisfies BudgetOption[],
  },
  {
    id: "deliveryPreference",
    title: "Delivery preference",
    options: [
      "Prefer oral",
      "Fine with injections",
      "No preference",
    ] satisfies DeliveryPreference[],
  },
  {
    id: "timeline",
    title: "Timeline expectation",
    options: [
      "30 days",
      "60 days",
      "90 days",
      "6+ months",
    ] satisfies TimelineExpectation[],
  },
  {
    id: "notes",
    title: "Anything else we should know?",
    description: "Optional notes for nuance in the full analysis.",
    type: "textarea",
  },
] as const;

export const peptideProfiles: Record<PeptideId, PeptideProfile> = {
  "bpc-157": {
    id: "bpc-157",
    name: "BPC-157",
    slug: "bpc-157",
    category: "peptide",
    supportLevel: "stronger",
    overview:
      "Research interest often centers on connective tissue signaling, recovery models, and gastrointestinal support pathways in preclinical settings.",
    beginnerAngle:
      "Studies frequently make BPC-157 the simplest entry point when the research goal is recovery-focused rather than highly layered.",
    advancedAngle:
      "In broader recovery stacks, researchers often pair BPC-157 with tissue-repair and mitochondrial-support contexts for more nuance.",
    oralBiasNote:
      "For participants leaning away from injections, educational materials often focus on route-of-administration tradeoffs rather than a single format claim.",
    citations: [
      {
        label: "Seiwerth 2018, Current Pharmaceutical Design",
        doi: "10.2174/1381612824666180412144511",
      },
      {
        label: "Sikiric 2020, Current Pharmaceutical Design",
        doi: "10.2174/1381612826666200219161658",
      },
      {
        label: "Chang 2011, Journal of Applied Physiology",
        doi: "10.1152/japplphysiol.00945.2010",
      },
    ],
    educationUrl: "https://peptidelaunch.com/education/bpc-157",
  },
  "tb-500": {
    id: "tb-500",
    name: "TB-500",
    slug: "tb-500",
    category: "peptide",
    supportLevel: "moderate",
    overview:
      "TB-500 is typically discussed in research settings around cell migration, repair signaling, and recovery-oriented tissue models.",
    beginnerAngle:
      "It is usually added after a core recovery peptide when the research goal expands beyond a single tissue-support angle.",
    advancedAngle:
      "In more advanced stacks, TB-500 is often used to widen the recovery discussion from localized support toward broader system recovery context.",
    citations: [
      {
        label: "Goldstein 2012, Expert Opinion on Biological Therapy",
        doi: "10.1517/14712598.2012.634793",
      },
      {
        label: "Philp 2007, Journal of Cellular Physiology",
        doi: "10.1002/jcp.20687",
      },
      {
        label: "Bock-Marquette 2004, Nature",
        doi: "10.1038/nature03000",
      },
    ],
    educationUrl: "https://peptidelaunch.com/education/tb-500",
  },
  "ss-31": {
    id: "ss-31",
    name: "SS-31",
    slug: "ss-31",
    category: "peptide",
    supportLevel: "moderate",
    overview:
      "SS-31 is commonly framed around mitochondrial function and cellular-energy resilience in research literature.",
    beginnerAngle:
      "Beginners usually see SS-31 as a secondary support layer rather than the first compound explored.",
    advancedAngle:
      "Higher-context protocols often add SS-31 when the research goal includes recovery plus cellular-energy support.",
    citations: [
      {
        label: "Szeto 2014, Pharmaceutical Research",
        doi: "10.1007/s11095-013-1226-7",
      },
      {
        label: "Daubert 2017, Circulation: Heart Failure",
        doi: "10.1161/CIRCHEARTFAILURE.117.004389",
      },
      {
        label: "Karaa 2018, Genetics in Medicine",
        doi: "10.1038/gim.2018.35",
      },
    ],
    educationUrl: "https://peptidelaunch.com/education/ss-31",
  },
  "ghk-cu": {
    id: "ghk-cu",
    name: "GHK-Cu",
    slug: "ghk-cu",
    category: "peptide",
    supportLevel: "stronger",
    overview:
      "GHK-Cu appears often in educational reviews covering skin, follicle, and regenerative signaling in laboratory literature.",
    beginnerAngle:
      "It is a common anchor for straightforward hair-focused research stacks because the literature map is relatively easy to explain.",
    advancedAngle:
      "Advanced reviews often position GHK-Cu as the core around which broader appearance and scalp-support contexts are layered.",
    oralBiasNote:
      "For users avoiding injections, GHK-Cu is typically discussed with topical and cosmetic-context educational notes.",
    citations: [
      {
        label: "Pickart & Margolina 2018, International Journal of Molecular Sciences",
        doi: "10.3390/ijms19071987",
      },
      {
        label: "Pickart 2012, BioMed Research International",
        doi: "10.1155/2012/648108",
      },
      {
        label: "Pickart 2014, BioMed Research International",
        doi: "10.1155/2014/151479",
      },
    ],
    educationUrl: "https://peptidelaunch.com/education/ghk-cu",
  },
  "glow-blend": {
    id: "glow-blend",
    name: "GLOW Blend",
    slug: "glow-blend",
    category: "blend",
    supportLevel: "limited",
    overview:
      "This blend is presented as internal educational positioning built around GHK-Cu-centered appearance-support themes rather than standalone published literature.",
    beginnerAngle:
      "For simpler reviews, GLOW Blend usually stays secondary to GHK-Cu so the rationale remains grounded in the better-known citation set.",
    advancedAngle:
      "In advanced cosmetic-context stacks, GLOW Blend is used to describe how a multi-input protocol might be organized in educational materials.",
    oralBiasNote:
      "When injection avoidance matters, the blend is usually framed in topical or cosmetic-education context only.",
    citations: [
      {
        label: "Pickart & Margolina 2018, International Journal of Molecular Sciences",
        doi: "10.3390/ijms19071987",
      },
      {
        label: "Pickart 2012, BioMed Research International",
        doi: "10.1155/2012/648108",
      },
      {
        label: "Pickart 2014, BioMed Research International",
        doi: "10.1155/2014/151479",
      },
    ],
    educationUrl: "https://peptidelaunch.com/education/glow-blend",
    blendDisclosure:
      "Blend rationale is internal educational positioning anchored to the GHK-Cu literature above.",
  },
  tesamorelin: {
    id: "tesamorelin",
    name: "Tesamorelin",
    slug: "tesamorelin",
    category: "peptide",
    supportLevel: "stronger",
    overview:
      "Tesamorelin is often referenced in body-composition discussions involving growth-hormone signaling and adiposity-related outcomes in research settings.",
    beginnerAngle:
      "For a body-composition review, Tesamorelin is often one of the clearer literature-backed anchors to discuss first.",
    advancedAngle:
      "Advanced analyses may compare Tesamorelin with other GH-axis tools for a more tailored stack design conversation.",
    citations: [
      {
        label: "Falutz 2007, New England Journal of Medicine",
        doi: "10.1056/NEJMoa064318",
      },
      {
        label: "Stanley & Grinspoon 2012, Expert Opinion on Pharmacotherapy",
        doi: "10.1517/14656566.2012.717851",
      },
      {
        label: "Koutkia 2010, Clinical Infectious Diseases",
        doi: "10.1086/650534",
      },
    ],
    educationUrl: "https://peptidelaunch.com/education/tesamorelin",
  },
  ipamorelin: {
    id: "ipamorelin",
    name: "Ipamorelin",
    slug: "ipamorelin",
    category: "peptide",
    supportLevel: "moderate",
    overview:
      "Ipamorelin is frequently included in GH-secretagogue research conversations focused on body-composition and recovery signaling.",
    beginnerAngle:
      "It commonly appears as a companion piece to a primary body-composition anchor rather than as a standalone concept for beginners.",
    advancedAngle:
      "Advanced stacks use Ipamorelin to add nuance around GH-pulse style signaling in educational comparisons.",
    citations: [
      {
        label: "Raun 1998, European Journal of Endocrinology",
        doi: "10.1530/eje.0.1390552",
      },
      {
        label: "Gobburu 1999, Pharmaceutical Research",
        doi: "10.1023/A:1011947611357",
      },
      {
        label: "Johansen 1999, Growth Hormone & IGF Research",
        doi: "10.1054/ghir.1999.0090",
      },
    ],
    educationUrl: "https://peptidelaunch.com/education/ipamorelin",
  },
  "cjc-1295": {
    id: "cjc-1295",
    name: "CJC-1295",
    slug: "cjc-1295",
    category: "peptide",
    supportLevel: "moderate",
    overview:
      "CJC-1295 is usually discussed as a GH-axis research tool, especially in educational comparisons with other body-composition support peptides.",
    beginnerAngle:
      "For beginners, it is often kept as an alternate to simplify stack complexity.",
    advancedAngle:
      "Advanced users often see CJC-1295 as a way to refine the GH-axis portion of a larger body-composition stack.",
    citations: [
      {
        label: "Teichman 2006, Journal of Clinical Endocrinology & Metabolism",
        doi: "10.1210/jc.2005-1532",
      },
      {
        label: "Ionescu 2006, Journal of Clinical Endocrinology & Metabolism",
        doi: "10.1210/jc.2006-1226",
      },
    ],
    educationUrl: "https://peptidelaunch.com/education/cjc-1295",
  },
  "aod-9604": {
    id: "aod-9604",
    name: "AOD-9604",
    slug: "aod-9604",
    category: "peptide",
    supportLevel: "moderate",
    overview:
      "AOD-9604 is often reviewed in the context of adiposity-related research and body-composition educational discussions.",
    beginnerAngle:
      "Beginners usually encounter AOD-9604 as an optional add-on rather than the foundation of a stack.",
    advancedAngle:
      "In more layered analyses, AOD-9604 can widen the body-composition discussion beyond one GH-axis mechanism.",
    citations: [
      {
        label: "Ng 2000, Obesity Research",
      },
      {
        label: "Heffernan 2006, Obesity Research Clinical Practice",
      },
      {
        label: "Kemp 2009, Journal of Endocrinology",
      },
    ],
    educationUrl: "https://peptidelaunch.com/education/aod-9604",
  },
  "mots-c": {
    id: "mots-c",
    name: "MOTS-C",
    slug: "mots-c",
    category: "peptide",
    supportLevel: "stronger",
    overview:
      "MOTS-C is frequently discussed in metabolic flexibility, exercise adaptation, and healthy-aging research settings.",
    beginnerAngle:
      "For longevity-focused reviews, MOTS-C provides a relatively coherent foundation before adding more speculative layers.",
    advancedAngle:
      "Advanced stacks often use MOTS-C as the metabolic anchor around which mitochondrial and healthy-aging ideas are organized.",
    citations: [
      {
        label: "Lee 2015, Cell Metabolism",
        doi: "10.1016/j.cmet.2015.02.009",
      },
      {
        label: "Reynolds 2021, Cell Metabolism",
        doi: "10.1016/j.cmet.2021.03.001",
      },
      {
        label: "Kim 2018, PNAS",
        doi: "10.1073/pnas.1811989115",
      },
    ],
    educationUrl: "https://peptidelaunch.com/education/mots-c",
  },
  epitalon: {
    id: "epitalon",
    name: "Epitalon",
    slug: "epitalon",
    category: "peptide",
    supportLevel: "moderate",
    overview:
      "Epitalon usually appears in healthy-aging and longevity discussions with emphasis on exploratory literature rather than settled conclusions.",
    beginnerAngle:
      "It is typically introduced as a secondary longevity concept after a stronger metabolic anchor is established.",
    advancedAngle:
      "Advanced stacks use Epitalon to broaden the educational discussion toward aging-related signaling themes.",
    citations: [
      {
        label: "Khavinson 2003, Bulletin of Experimental Biology and Medicine",
      },
      {
        label: "Anisimov 2003, Bulletin of Experimental Biology and Medicine",
      },
      {
        label: "Khavinson 2020, Drugs & Aging",
      },
    ],
    educationUrl: "https://peptidelaunch.com/education/epitalon",
  },
  "nad-plus": {
    id: "nad-plus",
    name: "NAD+",
    slug: "nad-plus",
    category: "cofactor",
    supportLevel: "stronger",
    overview:
      "NAD+ pathway support is a common thread in educational reviews of energy metabolism, cognitive resilience, and healthy-aging research.",
    beginnerAngle:
      "For beginners, NAD+ is often easier to understand as a context layer rather than a highly specialized stack centerpiece.",
    advancedAngle:
      "Advanced analyses often use NAD+ to connect metabolic, cognitive, and longevity goals into one coherent framework.",
    oralBiasNote:
      "For non-injection preferences, NAD+ support conversations usually expand toward oral precursor and lifestyle-context education.",
    citations: [
      {
        label: "Yoshino 2021, Science",
        doi: "10.1126/science.abe9985",
      },
      {
        label: "Rajman 2018, Cell Metabolism",
        doi: "10.1016/j.cmet.2018.02.011",
      },
      {
        label: "Covarrubias 2021, Nature Reviews Molecular Cell Biology",
        doi: "10.1038/s41580-020-00313-x",
      },
    ],
    educationUrl: "https://peptidelaunch.com/education/nad-plus",
  },
  selank: {
    id: "selank",
    name: "Selank",
    slug: "selank",
    category: "peptide",
    supportLevel: "moderate",
    overview:
      "Selank is commonly referenced in research-oriented discussions involving stress response, calm focus, and sleep-adjacent recovery context.",
    beginnerAngle:
      "It is a practical anchor for cognitive and sleep-related educational reviews because the framing is straightforward.",
    advancedAngle:
      "Advanced stacks often pair Selank with nootropic or recovery-support compounds to widen the discussion without overcomplicating the base rationale.",
    citations: [
      {
        label: "Zozulya 2008, Bulletin of Experimental Biology and Medicine",
      },
      {
        label: "Andreeva 2010, Neuroscience and Behavioral Physiology",
      },
      {
        label: "Volkova 2016, Bulletin of Experimental Biology and Medicine",
      },
    ],
    educationUrl: "https://peptidelaunch.com/education/selank",
  },
  semax: {
    id: "semax",
    name: "Semax",
    slug: "semax",
    category: "peptide",
    supportLevel: "moderate",
    overview:
      "Semax is typically positioned in educational content around cognition, neurotrophic signaling, and mental-performance research contexts.",
    beginnerAngle:
      "For beginners, Semax usually serves as the clearest cognitive-performance companion to Selank.",
    advancedAngle:
      "Advanced users often use Semax to deepen the stack's neurocognitive angle while pairing it with metabolic support context.",
    citations: [
      {
        label: "Ashmarin 1997, Neuroscience and Behavioral Physiology",
      },
      {
        label: "Levitskaya 2008, Bulletin of Experimental Biology and Medicine",
      },
      {
        label: "Grivennikov 2007, Russian Journal of Bioorganic Chemistry",
      },
    ],
    educationUrl: "https://peptidelaunch.com/education/semax",
  },
  dsip: {
    id: "dsip",
    name: "DSIP",
    slug: "dsip",
    category: "peptide",
    supportLevel: "limited",
    overview:
      "DSIP is included only as a contextual sleep-related research note because the available literature base here is limited.",
    beginnerAngle:
      "For beginners, DSIP is best framed as background context rather than a primary recommendation.",
    advancedAngle:
      "Advanced sleep-focused reviews may mention DSIP as a literature gap area rather than a high-confidence stack anchor.",
    citations: [
      {
        label: "Limited available literature in this tool; presented as contextual research note only",
      },
    ],
    educationUrl: "https://peptidelaunch.com/education/dsip",
  },
};
