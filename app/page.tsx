"use client";
import { useState } from "react";
import { Cloud, Sun } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const [text, setText] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [type, setType] = useState("Real");
  const [resultName, setResultName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!/^[A-Za-z0-9\s]+$/.test(text)) {
      alert("⚠️ Please write your text in English only!");
      return;
    }

    const finalName = text.toUpperCase();
    setResultName(finalName);
    alert(`✅ Video generated: ${finalName} (${type})`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      {/* منظر متحرك بسيط */}
      <div className="flex items-center gap-3 mb-3">
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Sun className="text-yellow-400 w-10 h-10" />
        </motion.div>

        <motion.div
          animate={{ x: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <Cloud className="text-blue-300 w-10 h-10" />
        </motion.div>

        <motion.div
          animate={{ x: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <Cloud className="text-blue-400 w-7 h-7 opacity-80" />
        </motion.div>
      </div>

      <h1 className="text-3xl font-bold mb-6">🎥 AI Video Generator</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-md flex flex-col gap-4"
      >
        {/* Text input */}
        <label className="text-sm font-semibold">Enter Text (English only)</label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="p-3 rounded-md bg-gray-700 text-white outline-none"
          placeholder="Write something..."
          required
        />

        {/* Image input */}
        <label className="text-sm font-semibold">Optional Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="bg-gray-700 text-sm rounded-md p-2"
        />

        {/* Type selection */}
        <label className="text-sm font-semibold">Video Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="p-3 rounded-md bg-gray-700 text-white outline-none"
        >
          <option value="Real">Real</option>
          <option value="Anime">Anime</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Cartoon">Cartoon</option>
        </select>

        {/* Submit button */}
        <button
          type="submit"
          className="mt-4 bg-blue-600 hover:bg-blue-700 p-3 rounded-md font-bold"
        >
          Generate Video
        </button>
      </form>

      {/* Result */}
      {resultName && (
        <div className="mt-6 text-xl font-semibold">
          Generated: <span className="text-blue-400">{resultName}</span>
        </div>
      )}
    </div>
  );
}
