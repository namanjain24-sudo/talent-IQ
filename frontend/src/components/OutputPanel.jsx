import { TerminalIcon } from "lucide-react";

const OutputPanel = ({ output }) => {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 p-4 border-b border-base-300">
        <TerminalIcon className="size-5" />
        <h2 className="font-semibold">Output</h2>
      </div>

      {/* Output Content */}
      <div className="flex-1 overflow-auto p-4 bg-base-200">
        {output === null ? (
          <div className="h-full flex items-center justify-center text-base-content/50">
            <p>Run your code to see the output here</p>
          </div>
        ) : (
          <pre className="whitespace-pre-wrap font-mono text-sm">
            {output.success ? (
              <div>
                <div className="mb-2">
                  <span className="text-success font-medium">✓ Code executed successfully</span>
                </div>
                <div className="bg-base-300 p-3 rounded">
                  <span className="text-base-content/70">Output:</span>
                  <div className="mt-1">{output.output}</div>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-2">
                  <span className="text-error font-medium">✗ Code execution failed</span>
                </div>
                <div className="bg-error/20 p-3 rounded">
                  <span className="text-base-content/70">Error:</span>
                  <div className="mt-1 text-error">{output.error}</div>
                </div>
              </div>
            )}
          </pre>
        )}
      </div>
    </div>
  );
};

export default OutputPanel;