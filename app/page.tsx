import { QuizWidget } from "@/components/quiz-widget";

type HomePageProps = {
  searchParams: Promise<{
    embed?: string;
  }>;
};

export default async function Home({ searchParams }: HomePageProps) {
  const params = await searchParams;

  return <QuizWidget embed={params.embed === "true"} />;
}
