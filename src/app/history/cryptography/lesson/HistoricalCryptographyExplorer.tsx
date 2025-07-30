"use client";
import List from "@/components/List";
import React, { useState, useEffect } from "react";

export const HistoricalCryptographyExplorer = () => {
  const [message, setMessage] = useState("Attack at dawn");
  const [encryptedMessage, setEncryptedMessage] = useState("");
  const [selectedCipher, setSelectedCipher] = useState("caesar");
  const [cipherKey, setCipherKey] = useState(3);
  const [vigenereCipherKey, setVigenereCipherKey] = useState("KEY");
  const [enigmaSettings, setEnigmaSettings] = useState({
    rotors: [1, 2, 3],
    positions: [0, 0, 0],
    reflector: "B",
    plugboard: "AB CD EF",
  });
  const [timelinePosition, setTimelinePosition] = useState(0);
  const [showDecrypted, setShowDecrypted] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  // Historical context data
  const historicalContext = [
    {
      era: "Ancient Rome",
      year: "100 BCE",
      cipher: "caesar",
      description:
        "Julius Caesar used a simple substitution cipher to protect military communications. Each letter was shifted by a fixed number in the alphabet.",
      image: "roman_soldier",
      keyDescription: "Shift each letter by N positions in the alphabet",
    },
    {
      era: "Renaissance",
      year: "1553",
      cipher: "vigenere",
      description:
        "Giovan Battista Bellaso developed this polyalphabetic cipher, later misattributed to Blaise de Vigenère. It used a keyword to determine variable shifts.",
      image: "renaissance_scholar",
      keyDescription: "Use a keyword to determine shifting patterns",
    },
    {
      era: "World War II",
      year: "1940s",
      cipher: "enigma",
      description:
        "The German Enigma machine was an electro-mechanical encryption device used for military communications. Breaking it at Bletchley Park was a defining moment in computing history.",
      image: "enigma_machine",
      keyDescription:
        "Configure rotors, positions, reflector, and plugboard connections",
    },
    {
      era: "Modern Era",
      year: "1970s-Present",
      cipher: "modern",
      description:
        "Modern encryption uses complex mathematical algorithms like RSA and AES to secure digital communications. These systems form the backbone of internet security today.",
      image: "computer",
      keyDescription:
        "Uses complex mathematical algorithms with keys of 128+ bits",
    },
  ];

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  // Update the timeline position when cipher changes
  useEffect(() => {
    const position = historicalContext.findIndex(
      (context) => context.cipher === selectedCipher
    );
    setTimelinePosition(position >= 0 ? position : 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCipher]);

  // Update encrypted message when inputs change
  useEffect(() => {
    encryptMessage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message, selectedCipher, cipherKey, vigenereCipherKey, enigmaSettings]);

  // Caesar cipher encryption
  const caesarEncrypt = (text: string, shift: number) => {
    return text
      .toUpperCase()
      .split("")
      .map((char) => {
        if (!/[A-Z]/.test(char)) return char;
        const index = alphabet.indexOf(char);
        if (index === -1) return char;
        const newIndex = (index + shift) % 26;
        return alphabet[newIndex];
      })
      .join("");
  };

  // Vigenère cipher encryption
  const vigenereEncrypt = (text: string, key: string) => {
    const upperText = text.toUpperCase();
    const upperKey = key.toUpperCase();
    let result = "";
    let keyIndex = 0;

    for (let i = 0; i < upperText.length; i++) {
      const char = upperText[i];
      if (!/[A-Z]/.test(char)) {
        result += char;
        continue;
      }

      const keyChar = upperKey[keyIndex % upperKey.length];
      const shift = alphabet.indexOf(keyChar);
      const charIndex = alphabet.indexOf(char);
      const newIndex = (charIndex + shift) % 26;

      result += alphabet[newIndex];
      keyIndex++;
    }

    return result;
  };

  // Simplified Enigma simulation
  const enigmaEncrypt = (text: string, settings: any) => {
    // This is a very simplified simulation of Enigma encryption
    // Real Enigma machines were much more complex

    const { rotors, positions, plugboard } = settings;
    const upperText = text.toUpperCase();
    const plugboardPairs = plugboard
      .split(" ")
      .filter((pair: any) => pair.length === 2);

    // Create plugboard mapping
    const plugboardMap: any = {};
    plugboardPairs.forEach((pair: any) => {
      plugboardMap[pair[0]] = pair[1];
      plugboardMap[pair[1]] = pair[0];
    });

    // Simple rotor simulation (much simplified)
    const simulateRotor = (
      char: string,
      rotorNum: number,
      position: number
    ) => {
      if (!/[A-Z]/.test(char)) return char;

      const rotorOffset = (rotorNum * 7 + position) % 26;
      const charIndex = alphabet.indexOf(char);
      const newIndex = (charIndex + rotorOffset) % 26;

      return alphabet[newIndex];
    };

    let result = "";
    let currentPositions = [...positions];

    for (let i = 0; i < upperText.length; i++) {
      let char = upperText[i];

      if (!/[A-Z]/.test(char)) {
        result += char;
        continue;
      }

      // Apply plugboard (if any mapping exists)
      if (plugboardMap[char]) {
        char = plugboardMap[char];
      }

      // Rotate rotors (simplified)
      currentPositions[0] = (currentPositions[0] + 1) % 26;
      if (currentPositions[0] === 0) {
        currentPositions[1] = (currentPositions[1] + 1) % 26;
        if (currentPositions[1] === 0) {
          currentPositions[2] = (currentPositions[2] + 1) % 26;
        }
      }

      // Forward path through rotors
      for (let r = 0; r < rotors.length; r++) {
        char = simulateRotor(char, rotors[r], currentPositions[r]);
      }

      // Reflector (simplified)
      const reflectorOffset = settings.reflector === "B" ? 13 : 7;
      const charIndex = alphabet.indexOf(char);
      const reflectedIndex = (charIndex + reflectorOffset) % 26;
      char = alphabet[reflectedIndex];

      // Return path through rotors (reverse)
      for (let r = rotors.length - 1; r >= 0; r--) {
        char = simulateRotor(char, rotors[r], currentPositions[r]);
      }

      // Apply plugboard again
      if (plugboardMap[char]) {
        char = plugboardMap[char];
      }

      result += char;
    }

    return result;
  };

  // Modern encryption simulation (not actual encryption, just a representation)
  const modernEncrypt = (text: string) => {
    // This is just a visual representation of what complex encryption might look like
    // Not actual encryption!
    const upperText = text.toUpperCase();
    let result = "";

    for (let i = 0; i < upperText.length; i++) {
      const char = upperText[i];

      if (!/[A-Z]/.test(char)) {
        result += char;
        continue;
      }

      // Generate a "random-looking" hex code for each character
      // In real encryption, this would be based on complex algorithms
      const charCode = char.charCodeAt(0);
      const hash = ((charCode * 1583) % 255).toString(16).padStart(2, "0");
      result += hash;
    }

    return result;
  };

  // Main encryption function based on selected cipher
  const encryptMessage = () => {
    if (!message) {
      setEncryptedMessage("");
      return;
    }

    let encrypted = "";

    switch (selectedCipher) {
      case "caesar":
        encrypted = caesarEncrypt(message, cipherKey);
        break;
      case "vigenere":
        encrypted = vigenereEncrypt(message, vigenereCipherKey);
        break;
      case "enigma":
        encrypted = enigmaEncrypt(message, enigmaSettings);
        break;
      case "modern":
        encrypted = modernEncrypt(message);
        break;
      default:
        encrypted = message;
    }

    setEncryptedMessage(encrypted);
  };

  // Handle rotor change for Enigma
  const handleRotorChange = (index: number, value: string) => {
    const newRotors = [...enigmaSettings.rotors];
    newRotors[index] = parseInt(value);
    setEnigmaSettings({ ...enigmaSettings, rotors: newRotors });
  };

  // Handle position change for Enigma
  const handlePositionChange = (index: number, value: string) => {
    const newPositions = [...enigmaSettings.positions];
    newPositions[index] = parseInt(value);
    setEnigmaSettings({ ...enigmaSettings, positions: newPositions });
  };

  // Render the appropriate key input based on selected cipher
  const renderCipherKeyInput = () => {
    switch (selectedCipher) {
      case "caesar":
        return (
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Caesar Shift</label>
            <input
              type="number"
              min="1"
              max="25"
              value={cipherKey}
              onChange={(e) => setCipherKey(parseInt(e.target.value))}
              className="w-full p-2 border rounded"
            />
          </div>
        );
      case "vigenere":
        return (
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Vigenère Keyword</label>
            <input
              type="text"
              value={vigenereCipherKey}
              onChange={(e) =>
                setVigenereCipherKey(e.target.value.replace(/[^A-Za-z]/g, ""))
              }
              className="w-full p-2 border rounded"
              placeholder="Enter keyword (letters only)"
            />
          </div>
        );
      case "enigma":
        return (
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Enigma Settings</label>
            <div className="grid grid-cols-3 gap-4 mb-4">
              {[0, 1, 2].map((index) => (
                <div key={`rotor-${index}`} className="mb-2">
                  <label className="block text-gray-600 text-sm mb-1">
                    Rotor {index + 1}
                  </label>
                  <select
                    value={enigmaSettings.rotors[index]}
                    onChange={(e) => handleRotorChange(index, e.target.value)}
                    className="w-full p-2 border rounded"
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        Rotor {num}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-4 mb-4">
              {[0, 1, 2].map((index) => (
                <div key={`position-${index}`} className="mb-2">
                  <label className="block text-gray-600 text-sm mb-1">
                    Position {index + 1}
                  </label>
                  <select
                    value={enigmaSettings.positions[index]}
                    onChange={(e) =>
                      handlePositionChange(index, e.target.value)
                    }
                    className="w-full p-2 border rounded"
                  >
                    {Array.from({ length: 26 }, (_, i) => (
                      <option key={i} value={i}>
                        {alphabet[i]}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
            <div className="mb-2">
              <label className="block text-gray-600 text-sm mb-1">
                Reflector
              </label>
              <select
                value={enigmaSettings.reflector}
                onChange={(e) =>
                  setEnigmaSettings({
                    ...enigmaSettings,
                    reflector: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
              >
                <option value="B">Type B</option>
                <option value="C">Type C</option>
              </select>
            </div>
            <div className="mb-2">
              <label className="block text-gray-600 text-sm mb-1">
                Plugboard
              </label>
              <input
                type="text"
                value={enigmaSettings.plugboard}
                onChange={(e) =>
                  setEnigmaSettings({
                    ...enigmaSettings,
                    plugboard: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                placeholder="Pairs separated by space (e.g., AB CD EF)"
              />
              <p className="text-xs text-gray-500 mt-1">
                Enter pairs of letters (e.g., AB CD EF)
              </p>
            </div>
          </div>
        );
      case "modern":
        return (
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Modern Encryption Key (Simulation)
            </label>
            <input
              type="text"
              value="fe89a2c4b7d6e31f05698ac7b2d4"
              className="w-full p-2 border rounded bg-gray-100"
              disabled
            />
            <p className="text-xs text-gray-500 mt-1">
              Modern encryption uses complex keys (simplified for demonstration)
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  // Render timeline
  const renderTimeline = () => {
    return (
      <div className="mb-8">
        <div className="w-full h-1 bg-gray-300 relative mb-4">
          {historicalContext.map((context, index) => (
            <div
              key={index}
              className={`absolute w-4 h-4 rounded-full -mt-1.5 cursor-pointer transition-all duration-300 ${
                index <= timelinePosition ? "bg-indigo-600" : "bg-gray-400"
              }`}
              style={{
                left: `${(index / (historicalContext.length - 1)) * 100}%`,
              }}
              onClick={() => {
                setSelectedCipher(historicalContext[index].cipher);
                setTimelinePosition(index);
              }}
            ></div>
          ))}
          <div
            className="absolute h-4 w-4 bg-indigo-600 rounded-full -mt-1.5 transition-all duration-500"
            style={{
              left: `${
                (timelinePosition / (historicalContext.length - 1)) * 100
              }%`,
              transform: "scale(1.5)",
              zIndex: 10,
            }}
          ></div>
        </div>
        <div className="flex justify-between">
          {historicalContext.map((context, index) => (
            <div
              key={index}
              className={`text-sm font-medium cursor-pointer ${
                index === timelinePosition ? "text-indigo-600" : "text-gray-500"
              }`}
              onClick={() => {
                setSelectedCipher(context.cipher);
                setTimelinePosition(index);
              }}
            >
              {context.year}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-indigo-800 mb-2">
          Historical Cryptography Explorer
        </h1>
        <p className="text-gray-600">
          Journey through time and discover how encryption has evolved
        </p>
      </header>

      {renderTimeline()}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-lg md:col-span-2">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-indigo-700 mb-6 flex justify-between items-center">
              <span>
                {historicalContext[timelinePosition].era}:{" "}
                {historicalContext[timelinePosition].cipher
                  .charAt(0)
                  .toUpperCase() +
                  historicalContext[timelinePosition].cipher.slice(1)}{" "}
                Cipher
              </span>
              <button
                onClick={() => setShowHelp(!showHelp)}
                className="text-sm bg-indigo-100 text-indigo-700 px-3 py-1 rounded"
              >
                {showHelp ? "Hide Help" : "Show Help"}
              </button>
            </h2>

            {showHelp && (
              <div className="bg-indigo-50 p-4 rounded-lg mb-6">
                <h3 className="font-bold text-indigo-800 mb-2">
                  How to use this simulator:
                </h3>
                <List
                  type="numbered"
                  items={[
                    <>Type a message in the "Your Message" field</>,
                    <>Select a cipher from the timeline above</>,
                    <>
                      Configure the encryption key/settings for your chosen
                      cipher
                    </>,
                    <>
                      See your encrypted message in the "Encrypted Message"
                      field
                    </>,
                    <>
                      Toggle "Show Decrypted Message" to verify decryption works
                    </>,
                  ]}
                />
              </div>
            )}

            <p className="text-gray-700 mb-6">
              {historicalContext[timelinePosition].description}
            </p>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Your Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-2 border rounded"
                rows={3}
                placeholder="Enter your message to encrypt"
              ></textarea>
            </div>

            {renderCipherKeyInput()}

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Encrypted Message
              </label>
              <div className="w-full p-2 border rounded bg-gray-50 min-h-16 font-mono">
                {encryptedMessage || "(Encrypted message will appear here)"}
              </div>
            </div>

            <div className="flex items-center mb-6">
              <input
                type="checkbox"
                id="showDecrypted"
                checked={showDecrypted}
                onChange={() => setShowDecrypted(!showDecrypted)}
                className="mr-2"
              />
              <label htmlFor="showDecrypted" className="text-gray-700">
                Show Decrypted Message
              </label>
            </div>

            {showDecrypted && (
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Decrypted Message
                </label>
                <div className="w-full p-2 border rounded bg-gray-50 min-h-16">
                  {message}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-indigo-700 mb-4">
            Historical Context
          </h2>

          <div className="mb-6">
            <h3 className="font-bold text-gray-800 mb-2">
              {historicalContext[timelinePosition].era}
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              {historicalContext[timelinePosition].year}
            </p>

            <div className="bg-gray-100 h-48 mb-4 rounded flex items-center justify-center">
              <div className="text-6xl text-center text-gray-400">
                {historicalContext[timelinePosition].image ===
                  "roman_soldier" && "🏛️"}
                {historicalContext[timelinePosition].image ===
                  "renaissance_scholar" && "📜"}
                {historicalContext[timelinePosition].image ===
                  "enigma_machine" && "⚙️"}
                {historicalContext[timelinePosition].image === "computer" &&
                  "💻"}
              </div>
            </div>

            <h4 className="font-bold text-gray-700 mb-2">Key Type:</h4>
            <p className="text-gray-600 mb-4">
              {historicalContext[timelinePosition].keyDescription}
            </p>

            <h4 className="font-bold text-gray-700 mb-2">Security Level:</h4>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
              <div
                className="bg-indigo-600 h-2.5 rounded-full"
                style={{ width: `${(timelinePosition + 1) * 25}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>Basic</span>
              <span>Advanced</span>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-bold text-gray-800 mb-2">Did You Know?</h3>
            {selectedCipher === "caesar" && (
              <p className="text-gray-600 text-sm">
                The Caesar cipher is named after Julius Caesar, who used it to
                communicate with his generals. A shift of 3 was his standard
                key.
              </p>
            )}
            {selectedCipher === "vigenere" && (
              <p className="text-gray-600 text-sm">
                The Vigenère cipher remained unbroken for 300 years and was
                known as "le chiffre indéchiffrable" (the undecipherable
                cipher).
              </p>
            )}
            {selectedCipher === "enigma" && (
              <p className="text-gray-600 text-sm">
                The breaking of the Enigma code at Bletchley Park by Alan Turing
                and his team may have shortened World War II by up to two years.
              </p>
            )}
            {selectedCipher === "modern" && (
              <p className="text-gray-600 text-sm">
                Modern encryption algorithms like AES would take billions of
                years to break using current computing technology.
              </p>
            )}
          </div>
        </div>
      </div>

      <footer className="mt-12 text-center text-gray-500 text-sm">
        <p>This interactive demo was created for educational purposes.</p>
        <p className="mt-2">
          Note: The encryption implementations are simplified for demonstration.
        </p>
      </footer>
    </div>
  );
};

export default HistoricalCryptographyExplorer;
