"use client";
import React, { useState, useEffect } from "react";

const EmojiTranslator = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState<any[]>([]);
  const [speed, setSpeed] = useState(50);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentWord, setCurrentWord] = useState("");
  const [currentEmoji, setCurrentEmoji] = useState("");
  const [showDictionary, setShowDictionary] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // This is our dictionary data structure - a JavaScript object that maps words to emojis
  const emojiDictionary: Record<string, string> = {
    // Emotions
    happy: "😊",
    sad: "😢",
    angry: "😠",
    excited: "🤩",
    love: "❤️",
    laugh: "😂",
    cry: "😭",
    smile: "😁",
    confused: "😕",
    worry: "😟",

    // Nature
    sun: "☀️",
    moon: "🌙",
    star: "⭐",
    cloud: "☁️",
    rain: "🌧️",
    snow: "❄️",
    tree: "🌳",
    flower: "🌸",
    mountain: "⛰️",
    ocean: "🌊",

    // Animals
    dog: "🐶",
    cat: "🐱",
    bird: "🐦",
    fish: "🐠",
    tiger: "🐯",
    lion: "🦁",
    monkey: "🐒",
    snake: "🐍",
    elephant: "🐘",
    turtle: "🐢",

    // Food
    pizza: "🍕",
    burger: "🍔",
    taco: "🌮",
    sushi: "🍣",
    apple: "🍎",
    banana: "🍌",
    cake: "🍰",
    cookie: "🍪",
    coffee: "☕",
    ice: "🧊",

    // Activities
    run: "🏃",
    swim: "🏊",
    dance: "💃",
    sing: "🎤",
    read: "📚",
    write: "✍️",
    cook: "👨‍🍳",
    sleep: "😴",
    work: "💼",
    play: "🎮",

    // Objects
    car: "🚗",
    bike: "🚲",
    phone: "📱",
    computer: "💻",
    book: "📖",
    pen: "🖊️",
    house: "🏠",
    money: "💰",
    clock: "🕒",
    gift: "🎁",

    // Places
    home: "🏡",
    school: "🏫",
    office: "🏢",
    store: "🏪",
    hospital: "🏥",
    restaurant: "🍽️",
    park: "🏞️",
    beach: "🏖️",
    city: "🌆",
    country: "🏞️",

    // Common words/greetings
    hello: "👋",
    goodbye: "👋",
    yes: "✅",
    no: "❌",
    please: "🙏",
    thanks: "🙏",
    sorry: "😔",
    good: "👍",
    bad: "👎",
    wow: "😲",
  };

  // Translate text to emojis
  const translateText = () => {
    setIsAnimating(true);
    setOutputText([]);

    // Split input text into words and process each word
    const words = inputText.split(/\s+/);
    let currentIndex = 0;

    const processNextWord = () => {
      if (currentIndex < words.length) {
        const word = words[currentIndex].toLowerCase().replace(/[.,!?;:]/g, ""); // Remove punctuation

        // Set current word being processed (for animation)
        setCurrentWord(word);

        // Look up word in dictionary
        const emoji = emojiDictionary[word] || words[currentIndex];

        // Set current emoji being processed (for animation)
        setCurrentEmoji(emoji);

        // Add to output
        setOutputText((prev) => [
          ...prev,
          { word: words[currentIndex], emoji },
        ]);

        // Move to next word
        currentIndex++;

        // Schedule next word processing based on speed
        setTimeout(processNextWord, 1000 - speed * 9);
      } else {
        // Animation complete
        setIsAnimating(false);
        setCurrentWord("");
        setCurrentEmoji("");
      }
    };

    processNextWord();
  };

  // Clear all text
  const clearText = () => {
    setInputText("");
    setOutputText([]);
    setCurrentWord("");
    setCurrentEmoji("");
    setIsAnimating(false);
  };

  // Filter dictionary for search
  const filteredDictionary = Object.entries(emojiDictionary).filter(([word]) =>
    word.includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-2 text-center text-purple-700">
        Emoji Translator
      </h2>

      <div className="bg-white bg-opacity-70 p-3 mb-4 rounded-lg shadow-sm">
        <h3 className="font-bold text-purple-700 mb-2">
          Dictionaries in Computer Science
        </h3>
        <p className="text-gray-700 text-sm mb-2">
          A <span className="font-bold text-purple-700">dictionary</span> is a
          fundamental data structure that stores data as{" "}
          <span className="font-bold">key-value pairs</span>.
        </p>
        <p className="text-gray-700 text-sm mb-2">
          Think of it like a real dictionary: you look up a word (the key) to
          find its definition (the value). In our translator:
        </p>
        <ul className="text-gray-700 text-sm list-disc pl-5 mb-2">
          <li>Keys are words like "happy" or "dog"</li>
          <li>Values are the corresponding emojis like "😊" or "🐶"</li>
        </ul>
        <p className="text-gray-700 text-sm">
          Dictionaries are also called hash tables, maps, or associative arrays
          in different programming languages.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Input and Output */}
        <div className="flex-1">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Enter your text:
            </label>
            <textarea
              className="w-full p-3 border rounded-lg shadow-sm"
              rows={4}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type something like: I am happy to see my dog at home"
              disabled={isAnimating}
            />
          </div>

          <div className="flex gap-2 mb-4">
            <button
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
              onClick={translateText}
              disabled={!inputText || isAnimating}
            >
              Translate
            </button>
            <button
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              onClick={clearText}
              disabled={isAnimating}
            >
              Clear
            </button>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Translation Speed: {speed}%
            </label>
            <input
              type="range"
              min="10"
              max="100"
              value={speed}
              onChange={(e) => setSpeed(parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Output Display */}
          <div className="bg-white p-4 rounded-lg shadow-sm min-h-40 border">
            <h3 className="font-bold text-gray-700 mb-3">Translated Output:</h3>

            {/* Animation of current word being processed */}
            {isAnimating && (
              <div className="mb-4 p-3 bg-purple-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-1">
                    Looking up in dictionary...
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <div className="font-mono bg-purple-200 px-2 py-1 rounded">
                      "{currentWord}"
                    </div>
                    <div className="text-gray-500">→</div>
                    <div className="text-3xl">{currentEmoji}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Final output */}
            <div className="text-2xl leading-loose">
              {outputText.map((item, index) => (
                <React.Fragment key={index}>
                  <span className="inline-block" title={item.word}>
                    {item.emoji === item.word ? item.word : item.emoji}
                  </span>
                  {index < outputText.length - 1 && " "}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Dictionary Viewer */}
        <div className="flex-1">
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-gray-700">Emoji Dictionary:</h3>
              <button
                className="text-sm text-blue-600 hover:text-blue-800 underline"
                onClick={() => setShowDictionary(!showDictionary)}
              >
                {showDictionary ? "Hide Dictionary" : "Show Dictionary"}
              </button>
            </div>

            {showDictionary && (
              <>
                <div className="mb-3">
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    placeholder="Search dictionary..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="p-3 bg-gray-50 rounded-lg font-mono text-sm overflow-y-auto max-h-96">
                  <p className="text-gray-700 mb-2">emojiDictionary = {"{"}</p>
                  <div className="ml-4">
                    {filteredDictionary.map(([word, emoji], index) => (
                      <div key={word} className="mb-1">
                        <span className="text-purple-700">"{word}"</span>
                        <span className="text-gray-500">: </span>
                        <span className="text-red-500">"{emoji}"</span>
                        {index < filteredDictionary.length - 1 && (
                          <span className="text-gray-500">,</span>
                        )}
                      </div>
                    ))}
                  </div>
                  <p className="text-gray-700 mt-2">{"}"}</p>
                </div>

                <div className="mt-4 bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                  <h4 className="font-bold text-gray-700 mb-2">
                    Dictionary Operations & Uses:
                  </h4>
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <h5 className="font-semibold text-gray-700 mb-1">
                        Efficiency:
                      </h5>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>
                          <span className="font-mono bg-gray-100 px-1">
                            lookup
                          </span>
                          : O(1) - Find values instantly
                        </li>
                        <li>
                          <span className="font-mono bg-gray-100 px-1">
                            insert
                          </span>
                          : O(1) - Add new pairs instantly
                        </li>
                        <li>
                          <span className="font-mono bg-gray-100 px-1">
                            delete
                          </span>
                          : O(1) - Remove pairs instantly
                        </li>
                        <li>
                          <span className="font-mono bg-gray-100 px-1">
                            space
                          </span>
                          : O(n) - Storage grows linearly
                        </li>
                      </ul>
                    </div>
                    <div className="flex-1">
                      <h5 className="font-semibold text-gray-700 mb-1">
                        Common Uses:
                      </h5>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>Caching (storing calculated results)</li>
                        <li>Database indexing</li>
                        <li>Counting frequencies (votes, word counts)</li>
                        <li>Symbol tables in programming languages</li>
                        <li>Fast data retrieval by unique identifiers</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-yellow-200">
                    <h5 className="font-semibold text-gray-700 mb-1">
                      How It Works Internally:
                    </h5>
                    <p className="text-sm text-gray-700 mb-1">
                      Dictionaries use a{" "}
                      <span className="font-semibold">hash function</span> that
                      converts keys into array indices:
                    </p>
                    <ol className="text-sm text-gray-700 list-decimal ml-5 space-y-1">
                      <li>The key is processed by a hash function</li>
                      <li>
                        The function outputs a memory location (hash code)
                      </li>
                      <li>The value is stored at that location</li>
                      <li>
                        To retrieve, the same hash function finds the location
                      </li>
                    </ol>
                  </div>
                </div>
              </>
            )}

            {!showDictionary && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="font-mono text-sm text-gray-700">
                  <p>const emojiDictionary = {"{"}</p>
                  <p className="ml-4">
                    <span className="text-purple-700">"happy"</span>
                    <span className="text-gray-500">: </span>
                    <span className="text-red-500">"😊"</span>,
                  </p>
                  <p className="ml-4">
                    <span className="text-purple-700">"sad"</span>
                    <span className="text-gray-500">: </span>
                    <span className="text-red-500">"😢"</span>,
                  </p>
                  <p className="ml-4">
                    <span className="text-gray-400">
                      // ...more words and emojis...
                    </span>
                  </p>
                  <p>{"}"}</p>
                </div>

                <div className="mt-4 bg-blue-50 p-3 rounded-lg text-gray-700 text-sm">
                  <p className="font-bold mb-1">How Dictionaries Work:</p>
                  <ol className="list-decimal ml-5 space-y-1">
                    <li>We look up each word in our dictionary</li>
                    <li>
                      If the word exists as a key, we return its emoji value
                    </li>
                    <li>If not found, we keep the original word</li>
                    <li>This lookup is very fast - O(1) constant time!</li>
                  </ol>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 bg-white bg-opacity-70 p-3 rounded-lg text-sm text-gray-700">
        <p className="font-bold">Try these examples:</p>
        <ul className="list-disc ml-5 mt-1">
          <li>I am happy to see my dog at home</li>
          <li>The cat and fish play in the sun</li>
          <li>Please give me a cookie and coffee</li>
        </ul>
      </div>
    </div>
  );
};

export default EmojiTranslator;
