import { Select, Button, Spin } from "antd";
import { PlayIcon } from "lucide-react";

const CodeEditorPanel = ({
  selectedLanguage,
  code,
  isRunning,
  onLanguageChange,
  onCodeChange,
  onRunCode,
}) => {
  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 border-b border-base-300">
        <div className="flex items-center gap-4">
          <div>
            <label className="label">
              <span className="label-text font-medium">Language:</span>
            </label>
            <Select
              value={selectedLanguage}
              onChange={(value) => onLanguageChange({ target: { value } })}
              className="w-32"
              options={[
                { value: "javascript", label: "JavaScript" },
                { value: "python", label: "Python" },
                { value: "java", label: "Java" },
              ]}
            />
          </div>
        </div>
        <Button
          type="primary"
          icon={<PlayIcon className="size-4" />}
          onClick={onRunCode}
          loading={isRunning}
          className="flex items-center"
        >
          Run Code
        </Button>
      </div>

      {/* Code Editor Area */}
      <div className="flex-1 overflow-hidden">
        <textarea
          value={code}
          onChange={(e) => onCodeChange(e.target.value)}
          className="w-full h-full p-4 font-mono text-sm bg-base-200 resize-none focus:outline-none"
          spellCheck="false"
        />
      </div>
    </div>
  );
};

export default CodeEditorPanel;