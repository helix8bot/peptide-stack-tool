"use client";

import { useMemo, useState, useTransition } from "react";
import {
  freeQuestions,
  fullQuestions,
  peptideProfiles,
  type DeliveryPreference,
  type QuizAnswers,
} from "@/lib/quiz-data";
import { buildResult } from "@/lib/recommendations";

type QuizWidgetProps = {
  embed?: boolean;
};

type Stage =
  | "intro"
  | "free"
  | "email"
  | "freeResult"
  | "paywall"
  | "full"
  | "fullResult";

const initialAnswers: QuizAnswers = {
  goal: "",
  experience: "",
  priority: "",
  email: "",
  conditions: [],
  supplements: "",
  ageRange: "",
  budget: "",
  deliveryPreference: "",
  timeline: "",
  notes: "",
};

const leadEndpoint = "https://services.leadconnectorhq.com/hooks/peptide-stack-free";
const embedCode =
  '<iframe src="https://peptide-stack-tool.vercel.app?embed=true" width="100%" height="800" frameborder="0"></iframe>';

function classNames(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

function progressValue(stage: Stage, freeStep: number, fullStep: number) {
  if (stage === "intro") return 8;
  if (stage === "free") return 12 + freeStep * 12;
  if (stage === "email") return 48;
  if (stage === "freeResult") return 58;
  if (stage === "paywall") return 66;
  if (stage === "full") return 68 + fullStep * 4;
  return 100;
}

function deliveryLabel(preference: DeliveryPreference | "") {
  if (preference === "Prefer oral") {
    return "Oral/topical-friendly educational notes prioritized";
  }

  if (preference === "Fine with injections") {
    return "No route simplification applied";
  }

  return "Balanced route-of-administration context";
}

export function QuizWidget({ embed = false }: QuizWidgetProps) {
  const [stage, setStage] = useState<Stage>("intro");
  const [answers, setAnswers] = useState<QuizAnswers>(initialAnswers);
  const [freeStep, setFreeStep] = useState(0);
  const [fullStep, setFullStep] = useState(0);
  const [leadStatus, setLeadStatus] = useState<"idle" | "submitting" | "submitted" | "offline">(
    "idle",
  );
  const [leadError, setLeadError] = useState("");
  const [copied, setCopied] = useState(false);
  const [isPending, startTransition] = useTransition();

  const freeResult = useMemo(() => {
    if (!answers.goal || !answers.experience || !answers.priority) {
      return null;
    }

    return buildResult(answers, false);
  }, [answers]);

  const fullResult = useMemo(() => {
    if (
      !answers.goal ||
      !answers.experience ||
      !answers.priority ||
      !answers.ageRange ||
      !answers.budget ||
      !answers.deliveryPreference ||
      !answers.timeline
    ) {
      return null;
    }

    return buildResult(answers, true);
  }, [answers]);

  const currentFreeQuestion = freeQuestions[freeStep];
  const currentFullQuestion = fullQuestions[fullStep];
  const progress = progressValue(stage, freeStep, fullStep);

  async function submitLead() {
    const email = answers.email.trim();
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!validEmail) {
      setLeadError("Enter a valid email to unlock the starter stack.");
      return;
    }

    setLeadError("");
    setLeadStatus("submitting");

    const payload = {
      email,
      quizType: "free-lite",
      submittedAt: new Date().toISOString(),
      answers: {
        goal: answers.goal,
        experience: answers.experience,
        priority: answers.priority,
      },
    };

    try {
      const response = await fetch(leadEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      setLeadStatus(response.ok ? "submitted" : "offline");
    } catch {
      setLeadStatus("offline");
    } finally {
      setStage("freeResult");
    }
  }

  function resetQuiz() {
    setAnswers(initialAnswers);
    setStage("intro");
    setFreeStep(0);
    setFullStep(0);
    setLeadStatus("idle");
    setLeadError("");
  }

  function renderChoiceButton(option: string, selected: boolean, onClick: () => void) {
    return (
      <button
        key={option}
        type="button"
        onClick={onClick}
        className={classNames(
          "min-h-20 rounded-2xl border px-4 py-4 text-left text-sm font-medium transition-all duration-300 sm:px-5 sm:text-base",
          selected
            ? "border-teal-600 bg-teal-50 text-slate-900 shadow-[0_12px_30px_rgba(13,148,136,0.12)]"
            : "border-slate-200 bg-white text-slate-700 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_10px_24px_rgba(15,23,42,0.08)]",
        )}
      >
        {option}
      </button>
    );
  }

  function renderHeader() {
    if (embed) return null;

    return (
      <header className="print-hidden border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 py-6 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.24em] text-teal-700">
                PeptideLaunch Research Education
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-[#1B2A4A] sm:text-4xl">
                Personalized peptide stack quiz widget
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
                A client-side, RUO-safe quiz that turns high-level goals into a cleaner research stack preview and an expanded full analysis.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm lg:max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                Embed code
              </p>
              <code className="mt-3 block overflow-x-auto rounded-2xl bg-slate-900 px-4 py-3 text-xs leading-6 text-slate-100">
                {embedCode}
              </code>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    startTransition(async () => {
                      await navigator.clipboard.writeText(embedCode);
                      setCopied(true);
                      window.setTimeout(() => setCopied(false), 1600);
                    })
                  }
                  className="rounded-full bg-[#1B2A4A] px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  {isPending ? "Copying..." : copied ? "Copied" : "Copy iframe"}
                </button>
                <p className="text-xs text-slate-500">
                  Use `?embed=true` to hide page chrome and show only the quiz flow.
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  function renderIntro() {
    return (
      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)] sm:p-8">
          <div className="inline-flex rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-teal-700">
            Free Lite + Full Upgrade
          </div>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[#1B2A4A] sm:text-4xl">
            Educational peptide stack recommendations in under 3 minutes
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            The free flow asks 3 questions, captures email, and returns a starter research stack. The full flow adds intake detail, a fuller stacking guide, citation cards, and a printable browser PDF view.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              "Mobile-friendly 375px layout",
              "Iframe-ready embed mode",
              "Client-side only with no API routes",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-5 text-sm font-medium text-slate-700"
              >
                {item}
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => setStage("free")}
              className="rounded-full bg-[#1B2A4A] px-6 py-3 text-base font-semibold text-white transition hover:bg-slate-800"
            >
              Start free assessment
            </button>
            <button
              type="button"
              onClick={() => {
                setStage("paywall");
                setFreeStep(0);
              }}
              className="rounded-full border border-slate-300 px-6 py-3 text-base font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
            >
              Preview full upgrade
            </button>
          </div>
        </div>

        <aside className="rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#1B2A4A_0%,#24385e_100%)] p-6 text-white shadow-[0_24px_60px_rgba(27,42,74,0.22)] sm:p-8">
          <h3 className="text-lg font-semibold tracking-tight">What this widget returns</h3>
          <div className="mt-6 space-y-4">
            {[
              "2-4 peptide stack mapped to the selected goal",
              "Research-safe rationale for each peptide",
              "30 / 60 / 90 day review cadence",
              "2-3 literature citations per peptide",
              "Printable full-results browser PDF button",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-white/15 bg-white/5 px-4 py-4 text-sm leading-6 text-slate-100">
                {item}
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs leading-6 text-slate-300">
            Compliance note: copy stays educational, research-oriented, and avoids prescription, dosing, or outcome guarantees.
          </p>
        </aside>
      </section>
    );
  }

  function renderFreeQuestion() {
    return (
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)] sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700">
          Free Lite Question {freeStep + 1} of {freeQuestions.length}
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#1B2A4A] sm:text-3xl">
          {currentFreeQuestion.title}
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {currentFreeQuestion.options.map((option) =>
            renderChoiceButton(
              option,
              answers[currentFreeQuestion.id] === option,
              () => {
                setAnswers((current) => ({ ...current, [currentFreeQuestion.id]: option }));

                if (freeStep === freeQuestions.length - 1) {
                  setStage("email");
                  return;
                }

                setFreeStep((value) => value + 1);
              },
            ),
          )}
        </div>
        <div className="mt-8 flex justify-between">
          <button
            type="button"
            onClick={() => {
              if (freeStep === 0) {
                setStage("intro");
                return;
              }

              setFreeStep((value) => value - 1);
            }}
            className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Back
          </button>
          <p className="text-sm text-slate-500">Large targets optimized for mobile and desktop.</p>
        </div>
      </section>
    );
  }

  function renderEmailGate() {
    return (
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)] sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700">
          Unlock free results
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#1B2A4A] sm:text-3xl">
          Enter email to view the starter stack preview
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
          The form makes a best-effort JSON post to the lead hook, then continues even if the external service is unavailable.
        </p>
        <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_auto]">
          <input
            type="email"
            value={answers.email}
            onChange={(event) =>
              setAnswers((current) => ({ ...current, email: event.target.value }))
            }
            placeholder="you@example.com"
            className="min-h-14 rounded-2xl border border-slate-300 px-4 text-base text-slate-900 outline-none transition focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
          />
          <button
            type="button"
            onClick={submitLead}
            disabled={leadStatus === "submitting"}
            className="min-h-14 rounded-2xl bg-[#1B2A4A] px-6 text-base font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {leadStatus === "submitting" ? "Submitting..." : "Show free results"}
          </button>
        </div>
        {leadError ? <p className="mt-3 text-sm text-rose-600">{leadError}</p> : null}
        <div className="mt-8 flex justify-between">
          <button
            type="button"
            onClick={() => setStage("free")}
            className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Back
          </button>
          <p className="text-sm text-slate-500">Lead capture is best-effort and fails gracefully.</p>
        </div>
      </section>
    );
  }

  function renderResult(resultType: "free" | "full") {
    const result = resultType === "free" ? freeResult : fullResult;
    if (!result) return null;

    return (
      <section className="space-y-6">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)] sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700">
                {resultType === "free" ? "Free starter result" : "Full stack analysis"}
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#1B2A4A] sm:text-3xl">
                {result.headline}
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
                {result.summary}
              </p>
            </div>
            <div className="rounded-3xl bg-slate-50 px-5 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Current lens
              </p>
              <p className="mt-2 text-lg font-semibold text-[#1B2A4A]">{result.stackName}</p>
              <p className="mt-1 text-sm text-slate-600">{deliveryLabel(answers.deliveryPreference)}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)] sm:p-8">
              <h3 className="text-xl font-semibold text-[#1B2A4A]">Personalized stack recommendation</h3>
              <div className="mt-6 grid gap-4">
                {result.peptides.map((item) => {
                  const profile = peptideProfiles[item.id];

                  return (
                    <article
                      key={item.id}
                      className="rounded-3xl border border-slate-200 bg-slate-50 p-5 transition-all duration-300 hover:shadow-[0_12px_24px_rgba(15,23,42,0.08)]"
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <h4 className="text-lg font-semibold text-[#1B2A4A]">{profile.name}</h4>
                          <p className="mt-2 text-sm leading-6 text-slate-600">{item.reason}</p>
                          {item.contextNote ? (
                            <p className="mt-2 text-sm leading-6 text-teal-800">{item.contextNote}</p>
                          ) : null}
                          {profile.blendDisclosure ? (
                            <p className="mt-2 text-xs leading-6 text-slate-500">{profile.blendDisclosure}</p>
                          ) : null}
                        </div>
                        <span className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                          {profile.supportLevel} support
                        </span>
                      </div>
                      <div className="mt-5 rounded-2xl border border-white bg-white p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                          Research citations
                        </p>
                        <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
                          {profile.citations.map((citation) => (
                            <li key={citation.label}>
                              {citation.label}
                              {citation.doi ? ` • DOI ${citation.doi}` : ""}
                            </li>
                          ))}
                        </ul>
                        <a
                          href={profile.educationUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-4 inline-flex text-sm font-semibold text-teal-700 transition hover:text-teal-800"
                        >
                          Learn more
                        </a>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

            {resultType === "full" && result.stackingGuide ? (
              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)] sm:p-8">
                <h3 className="text-xl font-semibold text-[#1B2A4A]">Detailed stacking guide</h3>
                <div className="mt-5 grid gap-3">
                  {result.stackingGuide.map((note) => (
                    <div
                      key={note}
                      className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-700"
                    >
                      {note}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)] sm:p-8">
              <h3 className="text-xl font-semibold text-[#1B2A4A]">Protocol timeline</h3>
              <div className="mt-5 space-y-4">
                {result.timeline.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm font-semibold text-[#1B2A4A]">{item.label}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)] sm:p-8">
              <h3 className="text-xl font-semibold text-[#1B2A4A]">Research-context notes</h3>
              <div className="mt-5 grid gap-3">
                {result.researchNotes.map((note) => (
                  <div
                    key={note}
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-700"
                  >
                    {note}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#f8fafc_0%,#eef6f6_100%)] p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)] sm:p-8">
              <h3 className="text-xl font-semibold text-[#1B2A4A]">Questionnaire summary</h3>
              <div className="mt-5 space-y-3 text-sm leading-6 text-slate-700">
                <p><span className="font-semibold text-[#1B2A4A]">Goal:</span> {answers.goal}</p>
                <p><span className="font-semibold text-[#1B2A4A]">Experience:</span> {answers.experience}</p>
                <p><span className="font-semibold text-[#1B2A4A]">Priority:</span> {answers.priority}</p>
                {answers.ageRange ? <p><span className="font-semibold text-[#1B2A4A]">Age range:</span> {answers.ageRange}</p> : null}
                {answers.budget ? <p><span className="font-semibold text-[#1B2A4A]">Budget:</span> {answers.budget}</p> : null}
                {answers.timeline ? <p><span className="font-semibold text-[#1B2A4A]">Review cadence:</span> {result.reviewCadence}</p> : null}
                {answers.conditions.length > 0 ? (
                  <p><span className="font-semibold text-[#1B2A4A]">Conditions:</span> {answers.conditions.join(", ")}</p>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <div className="print-hidden flex flex-col gap-3 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_24px_60px_rgba(15,23,42,0.08)] sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <p className="text-sm font-semibold text-[#1B2A4A]">
              {resultType === "free"
                ? "Unlock the full stack to see deeper intake-based nuance."
                : "Use the browser print dialog to save this analysis as a PDF."}
            </p>
            <p className="mt-1 text-sm text-slate-600">
              {leadStatus === "offline"
                ? "Lead hook was unavailable, but the free result still rendered locally."
                : "All recommendations remain educational and research-framed."}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            {resultType === "free" ? (
              <button
                type="button"
                onClick={() => setStage("paywall")}
                className="rounded-full bg-teal-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-700"
              >
                View full stack analysis
              </button>
            ) : (
              <button
                type="button"
                onClick={() => window.print()}
                className="rounded-full bg-teal-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-700"
              >
                Download PDF
              </button>
            )}
            <button
              type="button"
              onClick={resetQuiz}
              className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Start over
            </button>
          </div>
        </div>
      </section>
    );
  }

  function renderPaywall() {
    return (
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)] sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700">Upgrade</p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#1B2A4A] sm:text-3xl">
          Want the complete personalized protocol? Get your full stack analysis for $147.
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
          The full flow adds intake detail, expanded stack nuance, a detailed stacking guide, route-of-administration context, and a browser PDF save option. Payment is not implemented here; unlocking is local for UX review.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            "Adds 7 more intake questions",
            "Upgrades to 2-4 peptide analysis",
            "Includes print/save PDF workflow",
          ].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-5 text-sm font-medium text-slate-700"
            >
              {item}
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => {
              setStage("full");
              setFullStep(0);
            }}
            className="rounded-full bg-[#1B2A4A] px-6 py-3 text-base font-semibold text-white transition hover:bg-slate-800"
          >
            Continue to full analysis
          </button>
          <button
            type="button"
            onClick={() => setStage(freeResult ? "freeResult" : "intro")}
            className="rounded-full border border-slate-300 px-6 py-3 text-base font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Back
          </button>
        </div>
      </section>
    );
  }

  function renderFullQuestion() {
    if (!currentFullQuestion) return null;

    const isTextArea = "type" in currentFullQuestion && currentFullQuestion.type === "textarea";
    const isMultiSelect = currentFullQuestion.id === "conditions";
    const currentValue = answers[currentFullQuestion.id];

    return (
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)] sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700">
          Full analysis question {fullStep + 1} of {fullQuestions.length}
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#1B2A4A] sm:text-3xl">
          {currentFullQuestion.title}
        </h2>
        {"description" in currentFullQuestion && currentFullQuestion.description ? (
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            {currentFullQuestion.description}
          </p>
        ) : null}

        {isTextArea ? (
          <div className="mt-8">
            <textarea
              value={String(currentValue)}
              onChange={(event) =>
                setAnswers((current) => ({
                  ...current,
                  [currentFullQuestion.id]: event.target.value,
                }))
              }
              rows={5}
              placeholder="Add any relevant research context here..."
              className="w-full rounded-[1.5rem] border border-slate-300 px-4 py-4 text-base text-slate-900 outline-none transition focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
            />
          </div>
        ) : (
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {"options" in currentFullQuestion &&
              currentFullQuestion.options.map((option) => {
                const selected = isMultiSelect
                  ? Array.isArray(currentValue) &&
                    currentValue.includes(option as (typeof answers.conditions)[number])
                  : currentValue === option;

                return renderChoiceButton(option, selected, () => {
                  if (isMultiSelect) {
                    const selectedOption = option as (typeof answers.conditions)[number];

                    setAnswers((current) => {
                      const currentSelections = current.conditions;
                      let nextSelections = currentSelections.includes(selectedOption)
                        ? currentSelections.filter((item) => item !== selectedOption)
                        : [...currentSelections, selectedOption];

                      if (selectedOption === "None") {
                        nextSelections = ["None"];
                      } else {
                        nextSelections = nextSelections.filter((item) => item !== "None");
                      }

                      return {
                        ...current,
                        conditions: nextSelections,
                      };
                    });
                    return;
                  }

                  setAnswers((current) => ({ ...current, [currentFullQuestion.id]: option }));
                });
              })}
          </div>
        )}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() => {
              if (fullStep === 0) {
                setStage("paywall");
                return;
              }

              setFullStep((value) => value - 1);
            }}
            className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Back
          </button>
          <button
            type="button"
            onClick={() => {
              if (fullStep === fullQuestions.length - 1) {
                setStage("fullResult");
                return;
              }

              setFullStep((value) => value + 1);
            }}
            className="rounded-full bg-[#1B2A4A] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            {fullStep === fullQuestions.length - 1 ? "See full results" : "Continue"}
          </button>
        </div>
      </section>
    );
  }

  function renderFooter() {
    if (embed) return null;

    return (
      <footer className="print-hidden border-t border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-5 py-8 text-sm leading-7 text-slate-600 sm:px-8 lg:px-10">
          <p>
            Disclaimer: This tool is for educational and research-use-only context. It does not provide medical advice, diagnosis, treatment, or dosing guidance.
          </p>
          <p>
            Visual system: white, navy `#1B2A4A`, teal `#0D9488`, clean grays, Inter, responsive card-based layout.
          </p>
        </div>
      </footer>
    );
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fbfc_0%,#eef3f8_100%)] text-slate-900">
      {renderHeader()}
      <main className={classNames("mx-auto w-full", embed ? "max-w-5xl p-4 sm:p-6" : "max-w-6xl px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12")}>
        <div className="print-hidden mb-6 rounded-full border border-slate-200 bg-white p-2 shadow-sm">
          <div className="flex items-center justify-between px-3 pb-2 pt-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            <span>Quiz progress</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 rounded-full bg-slate-100">
            <div
              className="h-2 rounded-full bg-[linear-gradient(90deg,#0D9488_0%,#1B2A4A_100%)] transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="transition-all duration-300">
          {stage === "intro" ? renderIntro() : null}
          {stage === "free" ? renderFreeQuestion() : null}
          {stage === "email" ? renderEmailGate() : null}
          {stage === "freeResult" ? renderResult("free") : null}
          {stage === "paywall" ? renderPaywall() : null}
          {stage === "full" ? renderFullQuestion() : null}
          {stage === "fullResult" ? renderResult("full") : null}
        </div>
      </main>
      {renderFooter()}
    </div>
  );
}
