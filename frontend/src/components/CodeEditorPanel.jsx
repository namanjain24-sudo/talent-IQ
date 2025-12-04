import { Select, Button } from "antd";
import { PlayIcon } from "lucide-react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/themes/prism.css";

const CodeEditorPanel = ({
  selectedLanguage,
  code,
  isRunning,
  onLanguageChange,
  onCodeChange,
  onRunCode,
}) => {
  // Get the appropriate Prism language parser
  const getLanguageParser = (language) => {
    switch (language) {
      case "javascript":
        return languages.javascript;
      case "python":
        return languages.python;
      case "java":
        return languages.java;
      default:
        return languages.javascript;
    }
  };

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
        <Editor
          value={code}
          onValueChange={onCodeChange}
          highlight={(code) => highlight(code, getLanguageParser(selectedLanguage), selectedLanguage)}
          className="w-full h-full font-mono text-sm bg-base-200 resize-none focus:outline-none"
          textareaClassName="focus:outline-none"
          padding={16}
          style={{
            minHeight: "100%",
            fontFamily: '"Fira code", "Fira Mono", monospace',
          }}
          // Enable better editing features
          tabSize={2}
          insertSpaces={true}
          ignoreTabKey={false}
        />
      </div>
    </div>
  );
};

export default CodeEditorPanel;