import React, { useState } from "react";

export default function KeigoConverter() {
  const [inputText, setInputText] = useState("");
  const [recipient, setRecipient] = useState("顧客");
  const [bulletPoints, setBulletPoints] = useState("");
  const [outputText, setOutputText] = useState("");

  const handleConvert = async () => {
    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer YOUR_OPENAI_API_KEY`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        prompt: `以下の内容を${recipient}向けの適切な敬語に変換してください。\n\n入力文: ${inputText}\n箇条書き: ${bulletPoints}\n\n出力文:`,
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    setOutputText(data.choices[0].text.trim());
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputText);
    alert("コピーしました！");
  };

  return (
    <div className="p-4 max-w-lg mx-auto bg-white shadow rounded-xl">
      <h1 className="text-xl font-bold mb-4">敬語変換ツール</h1>
      <textarea
        className="w-full p-2 border rounded mb-2"
        placeholder="相手から送られた文章（空白可）"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <select
        className="w-full p-2 border rounded mb-2"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      >
        <option value="顧客">顧客</option>
        <option value="上司">上司</option>
      </select>
      <textarea
        className="w-full p-2 border rounded mb-2"
        placeholder="メッセージ、返答の内容を箇条書きで入力"
        value={bulletPoints}
        onChange={(e) => setBulletPoints(e.target.value)}
      />
      <button
        className="w-full bg-blue-500 text-white py-2 rounded mb-2"
        onClick={handleConvert}
      >
        敬語に変換
      </button>
      <textarea
        className="w-full p-2 border rounded mb-2"
        readOnly
        value={outputText}
      />
      <button
        className="w-full bg-green-500 text-white py-2 rounded"
        onClick={copyToClipboard}
      >
        コピー
      </button>
    </div>
  );
}