import { useState } from "react";
import "./tailwind.css";

function App() {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    const table = createTable(text);
    setInput(text);
    setOutput(table);
  };

  const createTable = (text: string): string => {
    const lines = text.split("\n");
    const resultLines: string[] = [];

    for (const row of lines) {
      const cells = row.split(" ").filter((s) => s.trim() !== "");
      if (cells.length === 0) continue;
      for (let i = 0; i < cells.length; i++) {
        if (cells[i] === "\\empty") cells[i] = "";
      }
      const line = `${cells.join(" & ")}  \\\\`;
      resultLines.push(line);
    }

    return resultLines.join("\n");
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output);
      alert("クリップボードにコピーしました！");
    } catch (err) {
      console.error("コピーに失敗しました:", err);
      alert("コピーに失敗しました");
    }
  };

  return (
    <div className="max-w-x1 mx-auto p-4">
      {/* 説明 */}
      <div className="mb-6 bg-indigo-50 p-4 rounded-md shadow-md">
        <p className="text-lg font-semibold text-semibold-800 mb-2">使い方</p>
        <p className="text-indigo-700 leading-relaxed">
          スペース区切りの値から LaTeX の表を作成する Web アプリです。
          <br />
          スペースは項目の区切り、改行は行の区切りとして扱われます。
          <br />
          空白のセルを挿入したい場合は、
          <code className="bg-indigo-100 px-1 rounded">\empty </code>
          を入力してください。
        </p>
      </div>
      {/* 入力 */}
      <div className="mb-6">
        <label
          htmlFor="inputArea"
          className="block text-sm font-medium text-indigo-700 mb-2"
        >
          表にしたいデータを入力
        </label>
        <textarea
          id="inputArea"
          className="block w-full h-32 px-3 py-2 border border-indigo-300 rounded-md text-indigo-900 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 resize-none"
          onChange={handleInput}
          value={input}
        ></textarea>
      </div>
      {/* 出力 */}
      <div>
        <label
          htmlFor="outputArea"
          className="block text-sm font-medium text-indigo-700 mb-2"
        >
          出力
        </label>
        <textarea
          id="outputArea"
          className="block w-full h-32 px-3 py-2 border border-indigo-200 bg-indigo-50 text-indigo-800 rounded-md resize-none "
          value={output}
          readOnly
        ></textarea>
        <button
          className="mt-4 px-4 py-2 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-colors"
          onClick={copyToClipboard}
        >
          Copy
        </button>
      </div>
    </div>
  );
}

export default App;
