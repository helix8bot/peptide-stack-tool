export type GoalOption =
  | "Pain & Injury Recovery"
  | "Hair Restoration & Skin Health"
  | "Body Composition & Fat Loss"
  | "Longevity & Anti-Aging"
  | "Cognitive Performance & Focus"
  | "Sleep & Recovery";

export type ExperienceOption =
  | "Brand new — I want a simple starting point"
  | "I’ve been researching and want a smarter plan"
  | "I’ve explored a few compounds already"
  | "I’m experienced and comfortable with more nuance";

export type PriorityOption =
  | "Highest-confidence research first"
  | "I want the simplest path to evaluate"
  | "I care most about convenience"
  | "I want the most complete stack my budget allows";

export type HealthCondition =
  | "Chronic joint or tendon discomfort"
  | "Hair thinning or shedding"
  | "Low energy or fatigue"
  | "Poor sleep quality"
  | "Slow workout recovery"
  | "Digestive stress or gut sensitivity"
  | "Brain fog or poor focus"
  | "Visible skin aging or texture changes"
  | "Weight management resistance"
  | "None of these";

export type AgeRangeOption = "18-30" | "31-40" | "41-50" | "51-60" | "60+";

export type BudgetOption =
  | "Under $100"
  | "$100-200"
  | "$200-350"
  | "$350-500"
  | "$500+";

export type BlendPreferenceOption =
  | "Individual peptides (maximum control)"
  | "Ready-made blends (convenience)"
  | "Mix of both"
  | "Not sure";

export type AdministrationPreferenceOption =
  | "Sublingual drops (easy, no needles)"
  | "Nasal spray (fast absorption, simple)"
  | "Topical cream/serum (targeted application)"
  | "Subcutaneous injection (highest bioavailability)"
  | "Open to any method";

export type SensitivityOption =
  | "Very sensitive (start low)"
  | "Average"
  | "High tolerance (comfortable with standard protocols)";

export type LifestyleFactor =
  | "Regular exercise (3+ days/week)"
  | "High stress"
  | "Poor sleep (<6 hours)"
  | "Sedentary work"
  | "Active job"
  | "Outdoor/sun exposure";

export type TimelineExpectation =
  | "I want a 30-day starting plan"
  | "I’m thinking in 60-90 day phases"
  | "I’m building a long-term optimization plan";

export type QuizAnswers = {
  goal: GoalOption | "";
  experience: ExperienceOption | "";
  priority: PriorityOption | "";
  email: string;
  conditions: HealthCondition[];
  ageRange: AgeRangeOption | "";
  budget: BudgetOption | "";
  blendPreference: BlendPreferenceOption | "";
  administrationPreference: AdministrationPreferenceOption | "";
  supplementStack: string;
  previousExperience: string;
  sensitivity: SensitivityOption | "";
  lifestyleFactors: LifestyleFactor[];
  timeline: TimelineExpectation | "";
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
  | "tesamorelin"
  | "ipamorelin"
  | "cjc-1295"
  | "aod-9604"
  | "mots-c"
  | "epitalon"
  | "nad-plus"
  | "selank"
  | "semax"
  | "dsip"
  | "klow"
  | "glow";

export type PeptideProfile = {
  id: PeptideId;
  name: string;
  category: "peptide" | "blend" | "cofactor";
  whatItDoes: string;
  researchDosing?: string;
  routeNote?: string;
  timingSuggestion?: string;
  warnings: string[];
  productNote?: string;
  citations: Citation[];
};

export const freeQuestions = [
  {
    id: "goal",
    title: "What are you hoping to improve first?",
    subtitle: "Your main goal helps us anchor the stack around the research category most likely to fit your situation.",
    options: [
      "Pain & Injury Recovery",
      "Hair Restoration & Skin Health",
      "Body Composition & Fat Loss",
      "Longevity & Anti-Aging",
      "Cognitive Performance & Focus",
      "Sleep & Recovery",
    ] satisfies GoalOption[],
  },
  {
    id: "experience",
    title: "How familiar are you with peptides right now?",
    subtitle: "Your experience level helps us keep the result appropriately simple, balanced, or more advanced.",
    options: [
      "Brand new — I want a simple starting point",
      "I’ve been researching and want a smarter plan",
      "I’ve explored a few compounds already",
      "I’m experienced and comfortable with more nuance",
    ] satisfies ExperienceOption[],
  },
  {
    id: "priority",
    title: "What matters most in your recommendation?",
    subtitle: "We ask this so the output can lean toward confidence, convenience, simplicity, or a more complete stack.",
    options: [
      "Highest-confidence research first",
      "I want the simplest path to evaluate",
      "I care most about convenience",
      "I want the most complete stack my budget allows",
    ] satisfies PriorityOption[],
  },
] as const;

export const fullQuestions = [
  {
    id: "conditions",
    type: "multi" as const,
    title: "Which of these are part of the picture for you right now?",
    subtitle: "These signals help us prioritize the mechanisms that deserve the most attention in your protocol.",
    options: [
      "Chronic joint or tendon discomfort",
      "Hair thinning or shedding",
      "Low energy or fatigue",
      "Poor sleep quality",
      "Slow workout recovery",
      "Digestive stress or gut sensitivity",
      "Brain fog or poor focus",
      "Visible skin aging or texture changes",
      "Weight management resistance",
      "None of these",
    ] satisfies HealthCondition[],
  },
  {
    id: "ageRange",
    type: "single" as const,
    title: "Which age range best fits you?",
    subtitle: "Age doesn’t decide everything, but it helps contextualize recovery pace, cosmetic goals, and protocol expectations.",
    options: ["18-30", "31-40", "41-50", "51-60", "60+"] satisfies AgeRangeOption[],
  },
  {
    id: "budget",
    type: "single" as const,
    title: "What monthly budget feels realistic for this research plan?",
    subtitle: "We use budget to avoid giving you a one-size-fits-all stack that looks great on paper but feels unrealistic in real life.",
    options: ["Under $100", "$100-200", "$200-350", "$350-500", "$500+"] satisfies BudgetOption[],
  },
  {
    id: "blendPreference",
    type: "single" as const,
    title: "Do you prefer individual peptides or ready-made blends?",
    subtitle: "This helps us decide whether to spotlight component-level control or convenience-first blend options like KLOW or GLOW.",
    options: [
      "Individual peptides (maximum control)",
      "Ready-made blends (convenience)",
      "Mix of both",
      "Not sure",
    ] satisfies BlendPreferenceOption[],
  },
  {
    id: "administrationPreference",
    type: "single" as const,
    title: "Which administration style feels most realistic for you?",
    subtitle: "Route matters because it changes what kinds of protocols make sense to highlight first.",
    options: [
      "Sublingual drops (easy, no needles)",
      "Nasal spray (fast absorption, simple)",
      "Topical cream/serum (targeted application)",
      "Subcutaneous injection (highest bioavailability)",
      "Open to any method",
    ] satisfies AdministrationPreferenceOption[],
  },
  {
    id: "supplementStack",
    type: "text" as const,
    title: "List any supplements you currently take",
    subtitle: "This gives us context for overlap, stacking complexity, and how conservative the protocol should feel.",
    placeholder: "Example: magnesium glycinate, omega-3s, vitamin D, collagen, creatine…",
  },
  {
    id: "previousExperience",
    type: "text" as const,
    title: "Have you explored any peptides before? Which ones, and how did they go?",
    subtitle: "Past response matters. Good recommendations should build on what your body and routine have already tolerated.",
    placeholder: "Example: researched BPC-157, tried GHK-Cu serum, didn’t like injections, felt great on nasal peptides…",
  },
  {
    id: "sensitivity",
    type: "single" as const,
    title: "How would you describe your sensitivity to new supplements or compounds?",
    subtitle: "This helps us frame a gentler ramp or a more standard protocol cadence in the report.",
    options: [
      "Very sensitive (start low)",
      "Average",
      "High tolerance (comfortable with standard protocols)",
    ] satisfies SensitivityOption[],
  },
  {
    id: "lifestyleFactors",
    type: "multi" as const,
    title: "Which lifestyle factors are most relevant right now?",
    subtitle: "These factors affect recovery, inflammation, sleep quality, skin exposure, and how aggressive a protocol should look.",
    options: [
      "Regular exercise (3+ days/week)",
      "High stress",
      "Poor sleep (<6 hours)",
      "Sedentary work",
      "Active job",
      "Outdoor/sun exposure",
    ] satisfies LifestyleFactor[],
  },
  {
    id: "timeline",
    type: "single" as const,
    title: "What kind of timeline are you planning around?",
    subtitle: "We ask this so the report can separate a clean 30-day starting plan from a longer 60/90-day buildout.",
    options: [
      "I want a 30-day starting plan",
      "I’m thinking in 60-90 day phases",
      "I’m building a long-term optimization plan",
    ] satisfies TimelineExpectation[],
  },
] as const;

export const administrationMeta: Record<AdministrationPreferenceOption, { pros: string; cons: string }> = {
  "Sublingual drops (easy, no needles)": {
    pros: "Easy, familiar, and low-friction for beginners.",
    cons: "Not every peptide is commonly researched in this format.",
  },
  "Nasal spray (fast absorption, simple)": {
    pros: "Simple and often preferred for nootropic-style protocols.",
    cons: "Works best for a narrower set of compounds.",
  },
  "Topical cream/serum (targeted application)": {
    pros: "Great when the goal is localized skin or scalp support.",
    cons: "Not ideal for every systemic goal.",
  },
  "Subcutaneous injection (highest bioavailability)": {
    pros: "Most commonly discussed in published peptide protocol literature.",
    cons: "Highest friction if you dislike needles or complex routines.",
  },
  "Open to any method": {
    pros: "Gives the engine freedom to match the strongest fit first.",
    cons: "May surface both simple and higher-friction options.",
  },
};

export const peptideProfiles: Record<PeptideId, PeptideProfile> = {
  "bpc-157": {
    id: "bpc-157",
    name: "BPC-157",
    category: "peptide",
    whatItDoes:
      "BPC-157 is commonly studied for connective-tissue signaling, fibroblast migration, angiogenesis support, and gut-associated repair pathways in preclinical research.",
    researchDosing:
      "Based on published research and community-reported protocols, the most commonly studied dosing range for BPC-157 is roughly 200-500 mcg per day in educational human-equivalent discussions, while preclinical literature frequently cites ~10 mcg/kg depending on route and model.",
    routeNote: "Often discussed in oral and injectable research contexts, with route-specific differences that should stay educational.",
    timingSuggestion: "Recovery-oriented research protocols commonly discuss splitting exposure earlier in the day and later in the day around the area or system being studied.",
    warnings: [
      "Human safety data remains limited.",
      "Angiogenesis-sensitive contexts, pregnancy, cancer history, active infection, or anticoagulation deserve extra caution.",
    ],
    citations: [
      { label: "Seiwerth S, et al. Curr Pharm Des. 2018;24(18):1990-2001", doi: "10.2174/1381612824666180412144511" },
      { label: "Sikiric P, et al. Curr Pharm Des. 2020;26(25):2979-3007", doi: "10.2174/1381612826666200219161658" },
      { label: "Chang CH, et al. J Appl Physiol. 2011;110(3):774-780", doi: "10.1152/japplphysiol.00945.2010" },
    ],
  },
  "tb-500": {
    id: "tb-500",
    name: "TB-500",
    category: "peptide",
    whatItDoes:
      "TB-500 is studied for cell migration, tissue remodeling, angiogenesis, and recovery signaling in musculoskeletal and wound-healing models.",
    researchDosing:
      "Based on published research and community-reported protocols, the most commonly studied dosing range for TB-500 is roughly 2-10 mg per week in research-style summaries, with many educational discussions centering on 2-5 mg twice weekly during an initial loading phase.",
    timingSuggestion: "Research discussions usually frame TB-500 as a broader weekly recovery signal rather than a same-hour performance compound.",
    warnings: [
      "Human data is limited and much of the literature is preclinical.",
      "Use extra caution in malignancy, pregnancy, abnormal angiogenesis, or concurrent experimental immunomodulator contexts.",
    ],
    citations: [
      { label: "Goldstein AL, et al. Expert Opin Biol Ther. 2012;12(1):37-51", doi: "10.1517/14712598.2012.634793" },
      { label: "Philp D, et al. J Cell Physiol. 2007;208(1):195-200", doi: "10.1002/jcp.20687" },
      { label: "Bock-Marquette I, et al. Nature. 2004;432(7016):466-472", doi: "10.1038/nature03000" },
    ],
  },
  "ss-31": {
    id: "ss-31",
    name: "SS-31 (Elamipretide)",
    category: "peptide",
    whatItDoes: "SS-31 is a mitochondria-targeted peptide studied for cardiolipin binding, oxidative stress reduction, and mitochondrial membrane resilience.",
    researchDosing:
      "Based on published research and community-reported protocols, the most commonly studied dosing range for SS-31 is highly protocol-specific and tied to investigational contexts rather than a single standardized community range.",
    timingSuggestion: "Energy-support research discussions often place mitochondrial compounds earlier in the day, though published protocols vary by study design.",
    warnings: ["Investigational context only.", "Pregnancy, malignancy, and interaction data remain limited."],
    citations: [
      { label: "Szeto HH. Pharm Res. 2014;31(8):1961-1969", doi: "10.1007/s11095-013-1226-7" },
      { label: "Daubert MA, et al. Circ Heart Fail. 2017;10(12):e004389", doi: "10.1161/CIRCHEARTFAILURE.117.004389" },
      { label: "Karaa A, et al. Genet Med. 2018;20(12):1594-1602", doi: "10.1038/gim.2018.35" },
    ],
  },
  "ghk-cu": {
    id: "ghk-cu",
    name: "GHK-Cu",
    category: "peptide",
    whatItDoes:
      "GHK-Cu is studied for collagen remodeling, fibroblast signaling, antioxidant activity, scalp biology, and skin-quality support.",
    researchDosing:
      "Based on published research and community-reported protocols, the most commonly studied dosing range for GHK-Cu varies by topical concentration and protocol design; cosmetic and scalp research usually centers on concentration-driven formulations rather than one universal dose.",
    routeNote: "Often best framed in topical or cosmetic-style discussions when hair or skin is the main goal.",
    timingSuggestion: "Hair and skin research protocols commonly position GHK-Cu in consistent daytime or evening topical routines rather than acute timing windows.",
    warnings: [
      "Local irritation and broader copper exposure context matter.",
      "Human intervention data remains limited outside cosmetic applications.",
    ],
    citations: [
      { label: "Pickart L, Margolina A. Int J Mol Sci. 2018;19(7):1987", doi: "10.3390/ijms19071987" },
      { label: "Pickart L, et al. BioMed Res Int. 2012;2012:648108", doi: "10.1155/2012/648108" },
      { label: "Pickart L, et al. BioMed Res Int. 2014;2014:151479", doi: "10.1155/2014/151479" },
    ],
  },
  tesamorelin: {
    id: "tesamorelin",
    name: "Tesamorelin",
    category: "peptide",
    whatItDoes: "Tesamorelin is a synthetic GHRH analog studied clinically for GH pulse support and downstream IGF-1 effects, especially in visceral adiposity literature.",
    researchDosing:
      "Based on published research and community-reported protocols, the most commonly studied dosing range for Tesamorelin is 2 mg once daily in the clinical literature, with broader research summaries sometimes discussing 1-2 mg per day depending on context.",
    timingSuggestion: "Growth-hormone-axis research protocols are commonly studied on an empty stomach and often placed before bed or away from carbohydrate-heavy meals.",
    warnings: ["Watch IGF-1 elevation, glucose tolerance, active malignancy, pregnancy, and concurrent GH-axis compounds."],
    citations: [
      { label: "Falutz J, et al. N Engl J Med. 2007;357:2359-2370", doi: "10.1056/NEJMoa064318" },
      { label: "Stanley TL, Grinspoon SK. Expert Opin Pharmacother. 2012;13(14):2155-2166", doi: "10.1517/14656566.2012.717851" },
      { label: "Koutkia P, et al. Clin Infect Dis. 2010;50(5):729-735", doi: "10.1086/650534" },
    ],
  },
  ipamorelin: {
    id: "ipamorelin",
    name: "Ipamorelin",
    category: "peptide",
    whatItDoes: "Ipamorelin is a ghrelin receptor agonist studied for amplifying growth-hormone pulses with a more selective profile than older GHRPs.",
    researchDosing:
      "Based on published research and community-reported protocols, the most commonly studied dosing range for Ipamorelin is protocol-specific microgram dosing, most often discussed in the low-hundreds-of-micrograms range within GH-axis research settings.",
    timingSuggestion: "Growth-hormone peptides are commonly researched on an empty stomach before bed or separated from meals when a cleaner GH pulse is the goal.",
    warnings: ["GH/IGF-axis effects can matter for glucose regulation, malignancy, pregnancy, and stacking with other secretagogues."],
    citations: [
      { label: "Raun K, et al. Eur J Endocrinol. 1998;139(5):552-561", doi: "10.1530/eje.0.1390552" },
      { label: "Gobburu JV, et al. Pharm Res. 1999;16(9):1412-1416", doi: "10.1023/A:1011947611357" },
      { label: "Johansen PB, et al. Growth Horm IGF Res. 1999;9(2):106-113", doi: "10.1054/ghir.1999.0090" },
    ],
  },
  "cjc-1295": {
    id: "cjc-1295",
    name: "CJC-1295",
    category: "peptide",
    whatItDoes: "CJC-1295 is a GHRH analog studied for pituitary GH release and IGF-1 elevation, with DAC and no-DAC variants behaving differently.",
    researchDosing:
      "Based on published research and community-reported protocols, the most commonly studied dosing range for CJC-1295 depends on DAC status, with no-DAC protocols studied more frequently and DAC protocols studied less frequently because of longer persistence.",
    timingSuggestion: "GH-axis stacks commonly position CJC-1295 around evening or fasting windows, though scheduling varies by DAC versus no-DAC design.",
    warnings: ["GH-axis cautions apply: glucose issues, edema context, malignancy, and overlap with other secretagogues."],
    citations: [
      { label: "Teichman SL, et al. J Clin Endocrinol Metab. 2006;91(3):799-805", doi: "10.1210/jc.2005-1532" },
      { label: "Ionescu M, Frohman LA. J Clin Endocrinol Metab. 2006;91(12):4792-4797", doi: "10.1210/jc.2006-1226" },
    ],
  },
  "aod-9604": {
    id: "aod-9604",
    name: "AOD-9604",
    category: "peptide",
    whatItDoes: "AOD-9604 is a modified hGH fragment studied for lipolysis and fat-metabolism signaling without the full anabolic GH profile.",
    researchDosing:
      "Based on published research and community-reported protocols, the most commonly studied dosing range for AOD-9604 is variable across obesity and fragment-literature summaries, with protocol-specific dosing rather than one universally accepted range.",
    timingSuggestion: "Body-composition research discussions often place fragment-based protocols earlier in the day or around fasted windows, depending on the study model.",
    warnings: ["Long-term data is limited.", "Endocrine disorders, metabolic polypharmacy, pregnancy, and malignancy deserve caution."],
    citations: [
      { label: "Ng FM, et al. Obes Res. 2000;8(7):529-537" },
      { label: "Heffernan MA, et al. hGH fragment literature summaries" },
      { label: "Kemp M, et al. J Endocrinol. 2009" },
    ],
  },
  "mots-c": {
    id: "mots-c",
    name: "MOTS-C",
    category: "peptide",
    whatItDoes: "MOTS-C is a mitochondrial-derived peptide studied for AMPK activation, metabolic stress adaptation, insulin sensitivity, and exercise-mimetic signaling.",
    researchDosing:
      "Based on published research and community-reported protocols, the most commonly studied dosing range for MOTS-C in educational discussions is around 5-10 mg in intermittent research contexts, although human literature remains early.",
    timingSuggestion: "Metabolic and mitochondrial research protocols often place MOTS-C earlier in the day or around training days rather than late evening.",
    warnings: ["Human data remains limited.", "Glucose-lowering therapies, intense training stress, pregnancy, and cachexia contexts deserve caution."],
    citations: [
      { label: "Lee C, et al. Cell Metab. 2015;21(3):443-454", doi: "10.1016/j.cmet.2015.02.009" },
      { label: "Reynolds JC, et al. Cell Metab. 2021;33(4):805-815.e7", doi: "10.1016/j.cmet.2021.03.001" },
      { label: "Kim KH, et al. Proc Natl Acad Sci USA. 2018;115(48):12375-12380", doi: "10.1073/pnas.1811989115" },
    ],
  },
  epitalon: {
    id: "epitalon",
    name: "Epitalon",
    category: "peptide",
    whatItDoes: "Epitalon is a synthetic tetrapeptide studied for circadian regulation, telomerase-related hypotheses, and healthy-aging exploration.",
    researchDosing:
      "Based on published research and community-reported protocols, the most commonly studied dosing range for Epitalon is cycle-based and highly protocol-specific in small human and regional literature rather than standardized across modern trials.",
    timingSuggestion: "Longevity and circadian research discussions typically frame Epitalon in structured cycles rather than indefinite daily background use.",
    warnings: ["Human data is small and region-specific.", "Keep anti-aging language exploratory, not definitive."],
    citations: [
      { label: "Khavinson VKh, et al. Bull Exp Biol Med. 2003;135(5):509-512" },
      { label: "Khavinson V, et al. Neuro Endocrinol Lett. 2002;23 Suppl 1:44-47" },
      { label: "Anisimov VN, et al. Exp Gerontol. 2003;38(1-2):41-46", doi: "10.1016/S0531-5565(02)00174-0" },
    ],
  },
  "nad-plus": {
    id: "nad-plus",
    name: "NAD+",
    category: "cofactor",
    whatItDoes: "NAD+ is a central redox cofactor studied for mitochondrial energy production, DNA repair, sirtuin activity, and cellular bioenergetics.",
    researchDosing:
      "Based on published research and community-reported protocols, the most commonly studied dosing range for NAD+ depends heavily on route and product format, with educational materials often referring to 500 mg and 1,000 mg research strengths rather than a single universal schedule.",
    timingSuggestion: "Energy-support discussions often place NAD+ earlier in the day because some people report it feels more activating than evening-friendly.",
    warnings: ["Clinical use can involve flushing or nausea depending on route.", "Polypharmacy, methylation context, and cancer-metabolism discussions require care."],
    citations: [
      { label: "Yoshino J, et al. Science. 2021;372(6547):1224-1229", doi: "10.1126/science.abe9985" },
      { label: "Rajman L, Chwalek K, Sinclair DA. Cell Metab. 2018;27(3):529-547", doi: "10.1016/j.cmet.2018.02.011" },
      { label: "Covarrubias AJ, et al. Nat Rev Mol Cell Biol. 2021;22:119-141", doi: "10.1038/s41580-020-00313-x" },
    ],
  },
  selank: {
    id: "selank",
    name: "Selank",
    category: "peptide",
    whatItDoes: "Selank is a tuftsin-derived peptide studied for calm-focus support, GABAergic modulation, stress resilience, and neuroimmune signaling.",
    researchDosing:
      "Based on published research and community-reported protocols, the most commonly studied dosing range for Selank is often discussed around 250-500 mcg in intranasal research contexts, though protocol details vary.",
    routeNote: "Often favored when someone wants a low-friction, non-injection-first cognition or calm-support option.",
    timingSuggestion: "Calm-focus protocols are commonly researched in the morning or early afternoon, while more relaxing use-cases are sometimes discussed later in the day.",
    warnings: ["Western safety data is sparse.", "Sedatives, anxiolytics, psychiatric polypharmacy, and pregnancy require caution."],
    citations: [
      { label: "Zozulya AA, et al. Bull Exp Biol Med. 2008;146(3):334-338" },
      { label: "Andreeva LA, et al. Neurosci Behav Physiol. 2010;40(7):745-748" },
      { label: "Volkova A, et al. Bull Exp Biol Med. 2016;161(4):470-473" },
    ],
  },
  semax: {
    id: "semax",
    name: "Semax",
    category: "peptide",
    whatItDoes: "Semax is an ACTH(4-10)-derived peptide studied for BDNF-related signaling, attention support, and neurotrophic activity.",
    researchDosing:
      "Based on published research and community-reported protocols, the most commonly studied dosing range for Semax is often discussed around 200-600 mcg in intranasal research settings, with protocol specifics varying across the literature.",
    routeNote: "Usually introduced as an intranasal option when the goal is focus without an injection-first plan.",
    timingSuggestion: "Focus-oriented Semax research is commonly discussed earlier in the day rather than late evening.",
    warnings: ["Safety literature outside Russian clinical practice is limited.", "Stimulants, psychiatric medications, seizure history, and pregnancy require caution."],
    citations: [
      { label: "Ashmarin IP, et al. Neurosci Behav Physiol. 1997;27(4):409-413" },
      { label: "Levitskaya NG, et al. Bull Exp Biol Med. 2008;146(3):322-325" },
      { label: "Grivennikov IA, Dolotov OV. Russ J Bioorg Chem. 2007;33(6):589-598" },
    ],
  },
  dsip: {
    id: "dsip",
    name: "DSIP",
    category: "peptide",
    whatItDoes: "DSIP is a sleep-adjacent peptide often mentioned in recovery circles, though the evidence base is thinner than many other compounds in this tool.",
    researchDosing:
      "Based on published research and community-reported protocols, the most commonly studied dosing range for DSIP is not well standardized, so it should remain contextual rather than central.",
    timingSuggestion: "When it appears in sleep-oriented research discussions, it is usually framed close to evening or bedtime windows.",
    warnings: ["Keep DSIP contextual because the literature support is relatively thin."],
    citations: [{ label: "Limited literature support in the master reference; contextual only" }],
  },
  klow: {
    id: "klow",
    name: "KLOW Blend",
    category: "blend",
    whatItDoes: "KLOW is a recovery-oriented blend that combines BPC-157, TB-500, GHK-Cu, and KPV for a broader healing and inflammation-support framework.",
    researchDosing:
      "Based on published research and community-reported protocols, the most commonly studied dosing range for KLOW is best understood by looking at the underlying component literature for BPC-157, TB-500, GHK-Cu, and KPV rather than treating the blend as a standalone studied protocol.",
    timingSuggestion: "Blend-oriented recovery protocols are commonly framed around consistency first, then timing the components according to the primary recovery goal.",
    productNote: "KLOW blend ($175) contains BPC-157, TB-500, GHK-Cu, and KPV.",
    warnings: ["Blend language should stay educational and tied to the component research rather than overstating direct blend-specific evidence."],
    citations: [{ label: "Component rationale drawn from BPC-157, TB-500, and GHK-Cu literature in the master reference" }],
  },
  glow: {
    id: "glow",
    name: "GLOW Blend",
    category: "blend",
    whatItDoes: "GLOW is a hair-and-skin-forward blend concept positioned around GHK-Cu-led scalp, dermal, and appearance support research.",
    researchDosing:
      "Based on published research and community-reported protocols, the most commonly studied dosing range for GLOW is best interpreted through the concentration and timing literature of its underlying cosmetic and peptide components rather than as a standalone clinical protocol.",
    timingSuggestion: "Hair and skin blend routines are commonly researched as consistent daily cosmetic-style protocols rather than sporadic use.",
    productNote: "GLOW blend is prioritized when the goal is hair or skin support and the user prefers convenience-first blends.",
    warnings: ["Keep blend language cosmetic, educational, and research-oriented."],
    citations: [{ label: "Pickart GHK-Cu literature underpins the blend rationale" }],
  },
};
