import { Select } from "antd";
import { BookOpenIcon, LightbulbIcon } from "lucide-react";

const ProblemDescription = ({ problem, currentProblemId, onProblemChange, allProblems }) => {
  return (
    <div className="h-full flex flex-col">
      {/* Problem selector */}
      <div className="p-4 border-b border-base-300">
        <Select
          showSearch
          placeholder="Select a problem"
          optionFilterProp="children"
          onChange={onProblemChange}
          value={currentProblemId}
          className="w-full"
          options={allProblems.map((p) => ({
            value: p.id,
            label: `${p.title} (${p.difficulty})`,
          }))}
        />
      </div>

      {/* Problem content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto">
          {/* Title and difficulty */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">{problem.title}</h1>
            <div className="flex items-center gap-2">
              <span className="badge badge-lg">
                {problem.difficulty}
              </span>
              <span className="text-base-content/70">{problem.category}</span>
            </div>
          </div>

          {/* Description */}
          <div className="prose prose-invert max-w-none mb-8">
            <p className="text-lg">{problem.description.text}</p>
            
            {problem.description.notes && problem.description.notes.length > 0 && (
              <div className="mt-4 p-4 bg-base-200 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <LightbulbIcon className="size-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <h3 className="font-semibold">Notes:</h3>
                </div>
                <ul className="list-disc pl-5 space-y-1">
                  {problem.description.notes.map((note, index) => (
                    <li key={index} className="text-base-content/80">{note}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Examples */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Examples</h2>
            <div className="space-y-6">
              {problem.examples && problem.examples.map((example, index) => (
                <div key={index} className="card bg-base-200">
                  <div className="card-body p-4">
                    <h3 className="font-semibold mb-2">Example {index + 1}:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-1 flex items-center gap-1">
                          <span className="badge badge-sm badge-primary">Input</span>
                        </h4>
                        <pre className="bg-base-300 p-3 rounded text-sm overflow-x-auto">
                          {example.input}
                        </pre>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1 flex items-center gap-1">
                          <span className="badge badge-sm badge-success">Output</span>
                        </h4>
                        <pre className="bg-base-300 p-3 rounded text-sm overflow-x-auto">
                          {example.output}
                        </pre>
                      </div>
                    </div>
                    {example.explanation && (
                      <div className="mt-2">
                        <h4 className="font-medium mb-1 flex items-center gap-1">
                          <BookOpenIcon className="size-4" />
                          <span>Explanation:</span>
                        </h4>
                        <p className="text-base-content/80">{example.explanation}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Constraints */}
          {problem.constraints && problem.constraints.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Constraints</h2>
              <ul className="list-disc pl-5 space-y-1">
                {problem.constraints.map((constraint, index) => (
                  <li key={index} className="text-base-content/80">{constraint}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProblemDescription;