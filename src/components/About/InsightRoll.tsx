type InsightRollProps = {
  insights: string[];
};

const InsightRoll = ({ insights }: InsightRollProps) => {
  return (
    <div className="w-full overflow-hidden whitespace-nowrap bg-accent text-light">
      <div className="flex w-full animate-roll items-center justify-center py-3 text-base font-semibold capitalize tracking-wider">
        {insights.map((insight) => (
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
