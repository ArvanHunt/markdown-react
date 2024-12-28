import React, { useState, useEffect } from "react";
import { marked } from "marked";

const examples = `
# Header 1
## Header 2
### Header 3
#### Header 4
##### Header 5
###### Header 6

---

**Bold Text**

*Italic Text*

~~Strikethrough~~

**_Bold and Italic_**

---

1. First item
2. Second item
3. Third item

---

- Item 1
- Item 2
  - Sub-item 1
  - Sub-item 2

---

[Click here to visit Google](https://www.google.com)

![Image of React Logo](https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg)

---

Here is an example of \`inline code\`.

\`\`\`javascript
function greet() {
  console.log("Hello, world!");
}
greet();
\`\`\`

---

> This is a blockquote. You can use it to highlight quotes or important text.

---

| Name       | Age | Profession  |
|------------|-----|-------------|
| John Doe   | 25  | Developer   |
| Jane Smith | 30  | Designer    |
`;

const App = () => {
  const [markdown, setMarkdown] = useState(() => {
    return localStorage.getItem("markdown") || "# Welcome to Markdown Previewer";
  });

  const [theme, setTheme] = useState("light");

  const handleMarkdownChange = (e) => {
    setMarkdown(e.target.value);
  };

  const handleClear = () => {
    setMarkdown("");
  };

  const handleDownload = () => {
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "markdown.md";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleLoadExamples = () => {
    setMarkdown(examples);
  };

  // Save markdown to localStorage
  useEffect(() => {
    localStorage.setItem("markdown", markdown);
  }, [markdown]);

  return (
    <div className={`min-h-screen ${theme === "light" ? "bg-gray-100" : "bg-gray-900"} p-5`}>
      <h1 className={`text-4xl font-bold text-center mb-5 ${theme === "light" ? "text-blue-600" : "text-blue-300"}`}>
        Markdown Previewer
      </h1>

      {/* Theme Toggle */}
      <div className="text-center mb-5">
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className={`px-4 py-2 rounded shadow-sm ${
            theme === "light"
              ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
              : "bg-gray-700 text-white hover:bg-gray-600"
          }`}
        >
          Toggle Theme: {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Markdown Input */}
        <div>
          <h2 className={`text-2xl font-semibold mb-3 ${theme === "light" ? "text-blue-500" : "text-blue-300"}`}>
            Markdown Input
          </h2>
          <textarea
            value={markdown}
            onChange={handleMarkdownChange}
            className={`w-full h-80 p-3 border rounded-lg shadow-sm focus:outline-none ${
              theme === "light"
                ? "bg-white text-gray-800 focus:ring-2 focus:ring-blue-400"
                : "bg-gray-800 text-white focus:ring-2 focus:ring-blue-600"
            }`}
          />
          <div className="flex gap-3 mt-3">
            <button
              onClick={handleClear}
              className={`px-4 py-2 rounded ${
                theme === "light"
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-red-600 text-white hover:bg-red-700"
              }`}
            >
              Clear
            </button>
            <button
              onClick={handleLoadExamples}
              className={`px-4 py-2 rounded ${
                theme === "light"
                  ? "bg-yellow-500 text-white hover:bg-yellow-600"
                  : "bg-yellow-600 text-white hover:bg-yellow-700"
              }`}
            >
              Examples
            </button>
            <button
              onClick={handleDownload}
              className={`px-4 py-2 rounded ${
                theme === "light"
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              Download
            </button>
          </div>
        </div>

        {/* Preview Pane */}
        <div>
          <h2 className={`text-2xl font-semibold mb-3 ${theme === "light" ? "text-blue-500" : "text-blue-300"}`}>
            Preview
          </h2>
          <div
            className={`w-full h-80 p-3 border rounded-lg shadow-sm overflow-y-auto ${
              theme === "light" ? "bg-white text-gray-800" : "bg-gray-800 text-white"
            }`}
            dangerouslySetInnerHTML={{ __html: marked.parse(markdown) }}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
