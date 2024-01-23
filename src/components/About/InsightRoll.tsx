type InsightRollProps = {
  insights: string[];
};

const InsightRoll = ({ insights }: InsightRollProps) => {
  return (
    <div className="w-full bg-accent text-light whitespace-nowrap overflow-hidden">
      <div className="w-full flex py-3 capitalize items-center justify-center font-semibold tracking-wider text-base animate-roll">
        {insights.map(insight => (
          <div key={insight}>
            {insight}
            <span className="px-2">|</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InsightRoll;
