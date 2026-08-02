import { cn } from "~/lib/utils";

const JobMatch = ({
                      matchScore,
                      matchedKeywords,
                      missingKeywords,
                      summary,
                  }: {
    matchScore: number;
    matchedKeywords: string[];
    missingKeywords: string[];
    summary: string;
}) => {
    const topMissing = missingKeywords[0];
    const restMissing = missingKeywords.slice(1);

    return (
        <div
            className={cn(
                "rounded-2xl shadow-md w-full bg-gradient-to-b to-light-white p-8 flex flex-col gap-4",
                matchScore > 69
                    ? "from-green-100"
                    : matchScore > 49
                        ? "from-yellow-100"
                        : "from-red-100"
            )}
        >
            <div className="flex flex-row gap-4 items-center">
                <img
                    src={
                        matchScore > 69
                            ? "/icons/ats-good.svg"
                            : matchScore > 49
                                ? "/icons/ats-warning.svg"
                                : "/icons/ats-bad.svg"
                    }
                    alt="Job Match"
                    className="w-10 h-10"
                />
                <p className="text-2xl font-semibold">
                    Job Match Score - {matchScore}/100
                </p>
            </div>

            {/* Progress bar */}
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                    className={cn(
                        "h-full rounded-full transition-all duration-700",
                        matchScore > 69
                            ? "bg-green-500"
                            : matchScore > 49
                                ? "bg-yellow-500"
                                : "bg-red-500"
                    )}
                    style={{ width: `${Math.min(matchScore, 100)}%` }}
                />
            </div>

            <div className="flex flex-col gap-2">
                <p className="font-medium text-xl">
                    How well does your resume match this job description?
                </p>
                <p className="text-lg text-gray-500">{summary}</p>

                {matchedKeywords.length > 0 && (
                    <div className="flex flex-col gap-2 mt-2">
                        <p className="font-medium text-lg">Matched Keywords</p>
                        <div className="flex flex-wrap gap-2">
                            {matchedKeywords.map((keyword, index) => (
                                <span
                                    key={index}
                                    className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full"
                                >
                                    {keyword}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {missingKeywords.length > 0 && (
                    <div className="flex flex-col gap-2 mt-2">
                        <p className="font-medium text-lg">Missing Keywords</p>
                        <div className="flex flex-wrap gap-2">
                            {topMissing && (
                                <span className="text-sm bg-red-200 text-red-800 font-semibold px-3 py-1 rounded-full border border-red-400">
                                    ⚠ {topMissing}
                                </span>
                            )}
                            {restMissing.map((keyword, index) => (
                                <span
                                    key={index}
                                    className="text-sm bg-red-100 text-red-700 px-3 py-1 rounded-full"
                                >
                                    {keyword}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {missingKeywords.length > 0 && (
                    <p className="text-sm text-gray-500 italic mt-2">
                        💡 Tip: Adding these missing keywords naturally into your
                        experience or skills section could significantly boost your
                        match score.
                    </p>
                )}
            </div>
        </div>
    );
};

export default JobMatch;