import {
  peptideProfiles,
  type BudgetOption,
  type GoalOption,
  type PeptideId,
  type QuizAnswers,
} from "@/lib/quiz-data";

export type ResultPeptide = {
  id: PeptideId;
  reason: string;
  contextNote?: string;
};

export type ResultMilestone = {
  label: string;
  detail: string;
};

export type QuizResult = {
  headline: string;
  summary: string;
  stackName: string;
  peptides: ResultPeptide[];
  timeline: ResultMilestone[];
  researchNotes: string[];
  stackingGuide?: string[];
  reviewCadence: string;
};

const goalBaseMap: Record<
  GoalOption,
  {
    stackName: string;
    intro: string;
    peptides: PeptideId[];
    expandedPeptides: PeptideId[];
    notes: string[];
  }
> = {
  "Pain Recovery": {
    stackName: "Recovery Signaling Stack",
    intro:
      "This profile leans on recovery and tissue-support research themes, with mitochondrial support added when the context supports a broader stack.",
    peptides: ["bpc-157", "tb-500"],
    expandedPeptides: ["bpc-157", "tb-500", "ss-31"],
    notes: [
      "Research suggests recovery-oriented stacks are often built around connective-tissue and repair-signaling themes rather than a single endpoint.",
      "When the questionnaire points to broader fatigue or slower recovery, mitochondrial-support context becomes more relevant.",
    ],
  },
  "Hair Restoration": {
    stackName: "Follicle Support Stack",
    intro:
      "This profile centers on cosmetic and follicle-support research themes, anchored by GHK-Cu with blend positioning kept clearly educational.",
    peptides: ["ghk-cu", "glow-blend"],
    expandedPeptides: ["ghk-cu", "glow-blend", "nad-plus"],
    notes: [
      "Studies indicate GHK-Cu is the strongest literature anchor in this tool for skin and follicle-support discussion.",
      "Zinc and biotin context can be mentioned as background support considerations, but the core stack here remains peptide-centered and educational.",
    ],
  },
  "Body Composition": {
    stackName: "Metabolic Composition Stack",
    intro:
      "This profile emphasizes GH-axis and adiposity-related research themes, starting with a tighter two-piece foundation before expanding.",
    peptides: ["tesamorelin", "ipamorelin"],
    expandedPeptides: ["tesamorelin", "ipamorelin", "aod-9604", "cjc-1295"],
    notes: [
      "Research settings often separate a simpler GH-axis stack from a more layered body-composition approach.",
      "For advanced users, CJC-1295 functions as a comparison or refinement layer rather than a mandatory addition.",
    ],
  },
  Longevity: {
    stackName: "Healthy Aging Stack",
    intro:
      "This profile uses metabolic and healthy-aging research themes, with mitochondrial support layered in for higher-context cases.",
    peptides: ["mots-c", "epitalon", "nad-plus"],
    expandedPeptides: ["mots-c", "epitalon", "nad-plus", "ss-31"],
    notes: [
      "Research suggests longevity-oriented stacks work best when the rationale stays anchored to metabolism and cellular-energy themes.",
      "Epitalon is kept in exploratory context, with language reflecting a more limited certainty level than the metabolic anchors.",
    ],
  },
  "Cognitive Performance": {
    stackName: "Cognitive Resilience Stack",
    intro:
      "This profile focuses on calm-focus and neurocognitive research themes, with metabolic support added when the questionnaire shows broader energy strain.",
    peptides: ["selank", "semax"],
    expandedPeptides: ["selank", "semax", "nad-plus"],
    notes: [
      "Studies indicate Selank and Semax make the cleanest base pairing for educational cognitive reviews in this reference set.",
      "NAD+ context is added when low energy or broader healthy-aging goals appear in the questionnaire.",
    ],
  },
  "Sleep & Recovery": {
    stackName: "Recovery Rhythm Stack",
    intro:
      "This profile balances calm-focus and sleep-adjacent recovery themes, with DSIP kept explicitly contextual because the literature support is limited in this tool.",
    peptides: ["selank", "dsip"],
    expandedPeptides: ["selank", "dsip", "mots-c"],
    notes: [
      "Research suggests Selank offers the clearest foundation here, while DSIP remains a limited-literature note rather than a high-confidence anchor.",
      "MOTS-C is added when the intake implies energy, resilience, or longer-run recovery themes beyond simple sleep support.",
    ],
  },
};

const budgetRank: Record<BudgetOption, number> = {
  "Under $100": 1,
  "$100-250": 2,
  "$250-500": 3,
  "$500+": 4,
};

function uniquePeptides(items: PeptideId[]) {
  return Array.from(new Set(items));
}

function peptideReason(goal: GoalOption, peptideId: PeptideId, answers: QuizAnswers) {
  const profile = peptideProfiles[peptideId];
  const isBeginner = answers.experience === "Complete beginner";
  const preferenceNote =
    answers.deliveryPreference === "Prefer oral" && profile.oralBiasNote
      ? profile.oralBiasNote
      : undefined;

  const goalSpecificReason: Record<GoalOption, Partial<Record<PeptideId, string>>> = {
    "Pain Recovery": {
      "bpc-157":
        "Research suggests BPC-157 is a common anchor when the goal centers on connective-tissue and recovery signaling.",
      "tb-500":
        "TB-500 broadens the stack toward cell-migration and repair-context themes that often appear alongside recovery research.",
      "ss-31":
        "SS-31 adds mitochondrial-support context when the intake points to slower recovery or low cellular-energy resilience.",
    },
    "Hair Restoration": {
      "ghk-cu":
        "Studies indicate GHK-Cu is the clearest literature-backed anchor in this tool for follicle and appearance-support discussion.",
      "glow-blend":
        "GLOW Blend is included as an educational way to organize a broader cosmetic-context stack, while keeping GHK-Cu as the research anchor.",
      "nad-plus":
        "NAD+ is added when the full quiz suggests broader aging or energy context around hair-focused goals.",
    },
    "Body Composition": {
      tesamorelin:
        "Tesamorelin serves as the primary GH-axis anchor here because the literature set is comparatively established.",
      ipamorelin:
        "Ipamorelin complements the stack by extending the GH-secretagogue discussion without changing the overall body-composition focus.",
      "aod-9604":
        "AOD-9604 adds an adiposity-related angle when higher budget or more advanced context supports a layered stack.",
      "cjc-1295":
        "CJC-1295 appears here as a refinement layer for experienced users reviewing GH-axis alternatives in research settings.",
    },
    Longevity: {
      "mots-c":
        "MOTS-C is the metabolic anchor for this longevity profile because studies often focus on exercise adaptation and healthy-aging pathways.",
      epitalon:
        "Epitalon widens the healthy-aging discussion, while the language stays exploratory and educational.",
      "nad-plus":
        "NAD+ helps connect energy metabolism and healthy-aging context into one coherent educational framework.",
      "ss-31":
        "SS-31 is added for higher-context longevity profiles that benefit from a mitochondrial-support lens.",
    },
    "Cognitive Performance": {
      selank:
        "Selank anchors the stack around calm-focus and stress-response research themes that fit cognitive-performance goals.",
      semax:
        "Semax extends the stack into neurocognitive and mental-performance research context.",
      "nad-plus":
        "NAD+ is added when broader energy resilience seems relevant to the cognitive-performance goal.",
    },
    "Sleep & Recovery": {
      selank:
        "Selank acts as the foundation because it fits both sleep-adjacent calm-focus and recovery-oriented educational framing.",
      dsip:
        "DSIP is included only as contextual sleep research, with an explicit note that the literature base here is limited.",
      "mots-c":
        "MOTS-C is added when the profile suggests that deeper recovery support may depend on metabolic resilience as well.",
    },
  };

  return {
    reason:
      goalSpecificReason[goal][peptideId] ??
      (isBeginner ? profile.beginnerAngle : profile.advancedAngle),
    contextNote: preferenceNote,
  };
}

function buildTimeline(answers: QuizAnswers): ResultMilestone[] {
  const timelineAnchor = answers.timeline || "90 days";
  const anchorMessage: Record<string, string> = {
    "30 days":
      "Use the first 30 days as a literature-baseline window focused on tolerance, logistics, and basic response notes.",
    "60 days":
      "A 60-day expectation supports one early review plus one follow-up trend check before drawing any stronger conclusions.",
    "90 days":
      "A 90-day expectation fits a standard research review cadence with baseline, midpoint, and end-of-cycle observations.",
    "6+ months":
      "A 6+ month expectation suggests treating the first 90 days as the initial review phase before any longer-run education plan.",
  };

  return [
    {
      label: "Day 30 review",
      detail:
        anchorMessage[timelineAnchor] +
        " Log observed themes, friction points, and whether the stack still fits the original goal.",
    },
    {
      label: "Day 60 review",
      detail:
        "Compare notes against the first month. In research settings, this is where stack simplicity, budget fit, and delivery preference are worth reassessing.",
    },
    {
      label: "Day 90 review",
      detail:
        "Conclude the initial research cycle and decide whether the stack remains appropriate, should be simplified, or should expand into a more advanced protocol.",
    },
  ];
}

function buildResearchNotes(answers: QuizAnswers, isFull: boolean) {
  const notes = [
    "Educational use only. This tool summarizes published and exploratory research themes and does not prescribe treatment, dosing, or outcomes.",
    "Where literature is thin, the result explicitly labels those sections as contextual or exploratory rather than settled.",
  ];

  if (answers.deliveryPreference === "Prefer oral") {
    notes.push(
      "Because oral preference was selected, the stack commentary leans toward route-of-administration education and topical/oral context where relevant, without making equivalence claims.",
    );
  }

  if (answers.conditions.includes("None")) {
    notes.push(
      "No active condition flags were selected, so the stack stays broader and goal-led rather than symptom-led.",
    );
  } else if (answers.conditions.length > 0) {
    notes.push(
      `Questionnaire context included: ${answers.conditions.join(
        ", ",
      )}. Those signals were used only to shape educational emphasis.`,
    );
  }

  if (isFull && answers.supplements.trim()) {
    notes.push(
      "Existing supplements/protocols were considered to reduce unnecessary overlap in the educational stack outline.",
    );
  }

  return notes;
}

function buildStackingGuide(peptides: PeptideId[], answers: QuizAnswers) {
  const guide = [
    "Start with the 2 highest-confidence pieces of the stack and keep the review lens narrow before adding optional layers.",
    "Track goal-specific notes weekly using the same metrics each time so the 30/60/90 day reviews stay comparable.",
  ];

  if (peptides.length > 2) {
    guide.push(
      "Layer any tertiary or quaternary compounds only after the base stack rationale remains clear and the budget still fits the intended research scope.",
    );
  }

  if (answers.priority === "Lowest cost") {
    guide.push(
      "Because cost sensitivity was selected, simplify aggressively before expanding; a clean two-piece review often produces a clearer educational signal than a crowded stack.",
    );
  }

  if (answers.priority === "Fewest side effects") {
    guide.push(
      "Because lower side-effect concern was prioritized, the guide favors simpler stacks and slower expansion of variables during the research review period.",
    );
  }

  return guide;
}

export function buildResult(answers: QuizAnswers, isFull: boolean): QuizResult {
  const goalConfig = goalBaseMap[answers.goal as GoalOption];
  const budgetValue = answers.budget ? budgetRank[answers.budget] : 2;
  const isBeginner = answers.experience === "Complete beginner";
  const isAdvanced = answers.experience === "Currently using peptides";
  const wantsSimplicity =
    isBeginner ||
    answers.priority === "Lowest cost" ||
    answers.priority === "Fewest side effects" ||
    budgetValue <= 2;

  let peptides = isFull ? goalConfig.expandedPeptides : goalConfig.peptides;

  if (wantsSimplicity) {
    peptides = goalConfig.peptides;
  }

  if (isFull && isAdvanced && budgetValue >= 3) {
    peptides = goalConfig.expandedPeptides;
  }

  if (answers.goal === "Hair Restoration" && budgetValue <= 2) {
    peptides = ["ghk-cu", "glow-blend"];
  }

  if (answers.goal === "Sleep & Recovery" && wantsSimplicity) {
    peptides = ["selank", "dsip"];
  }

  if (
    answers.goal === "Cognitive Performance" &&
    isFull &&
    (answers.conditions.includes("Low energy") || answers.conditions.includes("Brain fog"))
  ) {
    peptides = uniquePeptides([...peptides, "nad-plus"]);
  }

  if (
    answers.goal === "Pain Recovery" &&
    isFull &&
    (answers.conditions.includes("Slow recovery") || answers.conditions.includes("Low energy"))
  ) {
    peptides = uniquePeptides([...peptides, "ss-31"]);
  }

  if (answers.goal === "Body Composition" && wantsSimplicity) {
    peptides = ["tesamorelin", "ipamorelin"];
  }

  if (answers.deliveryPreference === "Prefer oral") {
    if (answers.goal === "Body Composition") {
      peptides = peptides.filter((id) => id !== "cjc-1295");
    }
    if (answers.goal === "Hair Restoration") {
      peptides = uniquePeptides(["ghk-cu", "glow-blend", ...peptides]).slice(0, 3);
    }
  }

  const resultPeptides = peptides.slice(0, isFull ? 4 : 3).map((id) => {
    const rationale = peptideReason(answers.goal as GoalOption, id, answers);
    return { id, ...rationale };
  });

  const stackComplexity = resultPeptides.length <= 2 ? "focused" : "expanded";
  const stackName = `${goalConfig.stackName} (${stackComplexity})`;

  return {
    headline: isFull
      ? `Full ${answers.goal} research stack analysis`
      : `${answers.goal} starter stack preview`,
    summary:
      goalConfig.intro +
      (isFull
        ? " The full analysis adds stack sequencing, broader context notes, and a longer review plan."
        : " This preview keeps the stack simple until more intake detail is provided."),
    stackName,
    peptides: resultPeptides,
    timeline: buildTimeline(answers),
    researchNotes: buildResearchNotes(answers, isFull).concat(goalConfig.notes),
    stackingGuide: isFull ? buildStackingGuide(resultPeptides.map((item) => item.id), answers) : undefined,
    reviewCadence:
      answers.timeline || "90 days",
  };
}
