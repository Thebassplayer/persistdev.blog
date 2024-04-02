import InsightRoll from "@/src/components/About/InsightRoll";

const insights = [
  "New articles every week 📚",
  "Learn about the latest technologies 🚀",
  "Discover new ways to improve your workflow 🛠",
  "Stay up to date with the latest trends 📈",
];

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex w-full flex-col items-center justify-between">
      <InsightRoll insights={insights} />
      {children}
    </main>
  );
}
