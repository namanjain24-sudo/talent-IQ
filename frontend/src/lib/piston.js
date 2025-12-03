// Piston API is a service for code execution

const PISTON_API = "https://emkc.org/api/v2/piston";

const LANGUAGE_VERSIONS = {
  javascript: { language: "javascript", version: "18.15.0" },
  python: { language: "python", version: "3.10.0" },
  java: { language: "java", version: "15.0.2" },
};

/**
 * Preprocess code to fix common syntax issues
 * @param {string} language - programming language
 * @param {string} code - source code to preprocess
 * @returns {string} - preprocessed code
 */
function preprocessCode(language, code) {
  // Split into lines and remove trailing whitespace
  let lines = code.split('\n').map(line => line.replace(/\s+$/, ''));
  
  // Handle empty code
  if (lines.length === 1 && lines[0] === '') {
    return '';
  }
  
  // Language-specific preprocessing
  switch (language) {
    case "python":
      return preprocessPythonCode(lines);
    case "javascript":
      return preprocessJavaScriptCode(lines);
    case "java":
      return preprocessJavaCode(lines);
    default:
      return lines.join('\n');
  }
}

/**
 * Preprocess Python code to fix indentation issues
 * @param {string[]} lines - array of code lines
 * @returns {string} - preprocessed code
 */
function preprocessPythonCode(lines) {
  // Convert tabs to spaces (4 spaces per tab)
  lines = lines.map(line => {
    // Replace leading tabs with spaces
    const leadingWhitespace = line.match(/^[\s\t]*/)[0];
    const normalizedIndent = leadingWhitespace.replace(/\t/g, '    ');
    return normalizedIndent + line.trimStart();
  });
  
  // Fix inconsistent indentation
  let indentLevel = 0;
  const indentStack = [0];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim() === '') continue; // Skip empty lines
    
    // Calculate current indentation
    const currentIndent = line.search(/\S/);
    
    // Keywords that increase indentation level
    const indentKeywords = ['def ', 'class ', 'if ', 'elif ', 'else:', 'for ', 'while ', 'try:', 'except', 'finally:', 'with '];
    const shouldIndent = indentKeywords.some(keyword => line.trim().startsWith(keyword));
    
    // Keywords that decrease indentation level
    const dedentKeywords = ['else:', 'elif ', 'except', 'finally:'];
    const shouldDedent = dedentKeywords.some(keyword => line.trim().startsWith(keyword));
    
    // Adjust indentation level
    if (shouldDedent) {
      indentStack.pop();
      indentLevel = indentStack[indentStack.length - 1] || 0;
    }
    
    // Apply correct indentation
    if (currentIndent !== indentLevel * 4) {
      const correctedLine = ' '.repeat(indentLevel * 4) + line.trim();
      lines[i] = correctedLine;
    }
    
    // Increase indentation for next lines if needed
    if (shouldIndent) {
      indentLevel++;
      indentStack.push(indentLevel);
    }
  }
  
  return lines.join('\n');
}

/**
 * Preprocess JavaScript code to fix common syntax issues
 * @param {string[]} lines - array of code lines
 * @returns {string} - preprocessed code
 */
function preprocessJavaScriptCode(lines) {
  // Remove trailing whitespace
  lines = lines.map(line => line.replace(/\s+$/, ''));
  
  // Fix missing semicolons at the end of lines that need them
  lines = lines.map(line => {
    if (line.trim() === '') return line;
    
    // Check if line looks like it should end with a semicolon
    const needsSemicolon = /[^\\s;{}()[\]]$/.test(line.trim());
    const isKeywordLine = /^(if|for|while|switch|function|class|const|let|var)\b/.test(line.trim());
    
    if (needsSemicolon && !isKeywordLine && !line.trim().endsWith('{') && !line.trim().endsWith('}')) {
      return line + ';';
    }
    return line;
  });
  
  return lines.join('\n');
}

/**
 * Preprocess Java code to fix common syntax issues
 * @param {string[]} lines - array of code lines
 * @returns {string} - preprocessed code
 */
function preprocessJavaCode(lines) {
  // Remove trailing whitespace
  lines = lines.map(line => line.replace(/\s+$/, ''));
  
  // Fix missing semicolons at the end of lines that need them
  lines = lines.map(line => {
    if (line.trim() === '') return line;
    
    // Check if line looks like it should end with a semicolon
    const needsSemicolon = /[^\\s;{}()[\]]$/.test(line.trim());
    const isKeywordLine = /^(if|for|while|switch|class|public|private|protected|static|final|void|int|char|boolean|double|float|long|short)\b/.test(line.trim());
    
    if (needsSemicolon && !isKeywordLine && !line.trim().endsWith('{') && !line.trim().endsWith('}')) {
      return line + ';';
    }
    return line;
  });
  
  return lines.join('\n');
}

/**
 * Format error messages for better readability
 * @param {string} language - programming language
 * @param {string} error - raw error message
 * @returns {string} - formatted error message
 */
function formatErrorMessage(language, error) {
  if (!error) return "Unknown error occurred";
  
  // For JavaScript errors, extract line numbers and make more readable
  if (language === "javascript" && error.includes("SyntaxError")) {
    // Extract line number if present
    const lineMatch = error.match(/:(\d+):\d+/);
    if (lineMatch) {
      return `Syntax Error on line ${lineMatch[1]}: ${error.split('\n')[0]}`;
    }
  }
  
  // For Python errors, make them more readable
  if (language === "python" && (error.includes("IndentationError") || error.includes("SyntaxError"))) {
    // Extract line number if present
    const lineMatch = error.match(/line (\d+)/);
    if (lineMatch) {
      return `Syntax Error on line ${lineMatch[1]}: ${error.split('\n')[0]}`;
    }
  }
  
  // For Java errors, extract the main error message
  if (language === "java" && error.includes("error:")) {
    const errorLines = error.split('\n');
    const mainError = errorLines.find(line => line.includes("error:")) || errorLines[0];
    return `Compilation Error: ${mainError.replace(/^\s*.*error:\s*/i, '')}`;
  }
  
  return error;
}

/**
 * @param {string} language - programming language
 * @param {string} code - source code to executed
 * @returns {Promise<{success:boolean, output?:string, error?: string}>}
 */
export async function executeCode(language, code) {
  try {
    const languageConfig = LANGUAGE_VERSIONS[language];

    if (!languageConfig) {
      return {
        success: false,
        error: `Unsupported language: ${language}`,
      };
    }

    // Preprocess the code to fix common syntax issues
    const preprocessedCode = preprocessCode(language, code);

    const response = await fetch(`${PISTON_API}/execute`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language: languageConfig.language,
        version: languageConfig.version,
        files: [
          {
            name: `main.${getFileExtension(language)}`,
            content: preprocessedCode,
          },
        ],
        // Add compile timeout and run timeout to prevent hanging
        compile_timeout: 10000,
        run_timeout: 5000,
      }),
    });

    if (!response.ok) {
      return {
        success: false,
        error: `HTTP error! status: ${response.status}`,
      };
    }

    const data = await response.json();

    const output = data.run?.output || "";
    const stderr = data.run?.stderr || "";
    const compileOutput = data.compile?.stderr || "";

    // Check for compilation errors first
    if (compileOutput) {
      return {
        success: false,
        output: output,
        error: formatErrorMessage(language, compileOutput),
      };
    }

    // Check for runtime errors
    if (stderr) {
      return {
        success: false,
        output: output,
        error: formatErrorMessage(language, stderr),
      };
    }

    return {
      success: true,
      output: output || "Code executed successfully with no output",
    };
  } catch (error) {
    return {
      success: false,
      error: `Failed to execute code: ${error.message}`,
    };
  }
}

function getFileExtension(language) {
  const extensions = {
    javascript: "js",
    python: "py",
    java: "java",
  };

  return extensions[language] || "txt";
}