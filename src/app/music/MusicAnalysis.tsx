"use client";
import React, { useState, useEffect } from "react";
import * as Tone from "tone";

interface Note {
  note: string;
  label: string;
  type: "white" | "black";
}

interface Analysis {
  mood: string;
  details: string;
}

export const MusicMoodAnalyzer: React.FC = () => {
  const [notes, setNotes] = useState<string[]>([]);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [synth, setSynth] = useState<Tone.Synth | null>(null);

  // Define piano keys - one octave for simplicity
  const pianoKeys: Note[] = [
    { note: "C4", label: "C", type: "white" },
    { note: "C#4", label: "C#", type: "black" },
    { note: "D4", label: "D", type: "white" },
    { note: "D#4", label: "D#", type: "black" },
    { note: "E4", label: "E", type: "white" },
    { note: "F4", label: "F", type: "white" },
    { note: "F#4", label: "F#", type: "black" },
    { note: "G4", label: "G", type: "white" },
    { note: "G#4", label: "G#", type: "black" },
    { note: "A4", label: "A", type: "white" },
    { note: "A#4", label: "A#", type: "black" },
    { note: "B4", label: "B", type: "white" },
    { note: "C5", label: "C", type: "white" },
  ];

  // Initialize the synth
  useEffect(() => {
    const newSynth = new Tone.Synth().toDestination();
    setSynth(newSynth);

    return () => {
      newSynth.dispose();
    };
  }, []);

  // Play a note
  const playNote = (note: string) => {
    if (synth) {
      synth.triggerAttackRelease(note, "8n");
      setNotes([...notes, note]);
    }
  };

  // Play the sequence
  const playSequence = async () => {
    if (notes.length === 0) return;

    setIsPlaying(true);
    await Tone.start();

    const now = Tone.now();
    notes.forEach((note, index) => {
      synth?.triggerAttackRelease(note, "8n", now + index * 0.5);
    });

    setTimeout(() => setIsPlaying(false), notes.length * 500);
  };

  // Clear the notes
  const clearNotes = () => {
    setNotes([]);
    setAnalysis(null);
  };

  // Analyze the melody
  const analyzeMelody = () => {
    if (notes.length < 3) {
      setAnalysis({
        mood: "Need at least 3 notes for analysis",
        details: "Try adding more notes to your melody",
      });
      return;
    }

    // Extract just the note names without octave for analysis
    const noteNames = notes.map((note) => note.replace(/\d/g, ""));

    // Check for major/minor tendency
    const majorNotes = ["C", "E", "G", "F", "A", "D", "B"];
    const minorNotes = ["C", "D#", "G", "G#", "A#", "D", "F"];

    let majorCount = 0;
    let minorCount = 0;

    noteNames.forEach((note) => {
      if (majorNotes.includes(note)) majorCount++;
      if (minorNotes.includes(note)) minorCount++;
    });

    // Calculate intervals between consecutive notes
    const intervals = [];
    for (let i = 0; i < notes.length - 1; i++) {
      const currentNote = Tone.Frequency(notes[i]).toMidi();
      const nextNote = Tone.Frequency(notes[i + 1]).toMidi();
      intervals.push(nextNote - currentNote);
    }

    // Count rising vs falling intervals
    const risingIntervals = intervals.filter((interval) => interval > 0).length;
    const fallingIntervals = intervals.filter(
      (interval) => interval < 0
    ).length;

    // Large intervals (more than 4 semitones) can indicate dramatic emotion
    const largeIntervals = intervals.filter(
      (interval) => Math.abs(interval) > 4
    ).length;

    // Analyze the results
    let mood = "";
    let details = "";

    // Determine basic mood based on major/minor tendency
    if (majorCount > minorCount) {
      mood = "Happy/Bright";
      details =
        "Your melody tends toward major tonality, creating a bright, positive mood.";
    } else if (minorCount > majorCount) {
      mood = "Sad/Melancholic";
      details =
        "Your melody has minor tonality characteristics, evoking more melancholic emotions.";
    } else {
      mood = "Balanced/Neutral";
      details =
        "Your melody balances major and minor elements, creating an emotionally complex feeling.";
    }

    // Refine based on intervals
    if (risingIntervals > fallingIntervals * 2) {
      mood += ", Uplifting";
      details +=
        " The predominantly rising intervals create a sense of uplift and optimism.";
    } else if (fallingIntervals > risingIntervals * 2) {
      mood += ", Somber";
      details +=
        " The predominantly falling intervals create a sense of descent or resignation.";
    }

    if (largeIntervals > notes.length / 3) {
      mood += ", Dramatic";
      details +=
        " The large interval jumps create drama and emotional intensity.";
    }

    setAnalysis({ mood, details });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Music Mood Analyzer
      </h1>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">
          Play notes to create a melody:
        </h2>
        <div className="flex relative h-40 mb-4 justify-center">
          {pianoKeys.map((key, index) => (
            <div
              key={index}
              className={`
                ${
                  key.type === "white"
                    ? "bg-white border border-gray-300 w-12 h-40 relative z-0"
                    : "bg-black w-8 h-24 absolute z-10"
                } 
                ${key.type === "black" ? `-ml-4 mt-0` : ""}
                cursor-pointer hover:bg-blue-100 flex items-end justify-center
                ${notes.includes(key.note) ? "bg-blue-200" : ""}
              `}
              style={{
                left: key.type === "black" ? `${index * 48 - 16}px` : "",
                marginLeft: key.type === "black" ? "" : "0",
              }}
              onClick={() => playNote(key.note)}
            >
              <span
                className={`mb-2 ${
                  key.type === "black" ? "text-white" : "text-black"
                }`}
              >
                {key.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Your melody:</h2>
        <div className="bg-white p-4 rounded shadow mb-4 min-h-16">
          {notes.length > 0
            ? notes.join(" - ")
            : "No notes yet. Click the piano keys above to add notes."}
        </div>

        <div className="flex space-x-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
            onClick={playSequence}
            disabled={isPlaying || notes.length === 0}
          >
            {isPlaying ? "Playing..." : "Play Melody"}
          </button>

          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400"
            onClick={analyzeMelody}
            disabled={notes.length === 0}
          >
            Analyze Mood
          </button>

          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-400"
            onClick={clearNotes}
            disabled={notes.length === 0}
          >
            Clear
          </button>
        </div>
      </div>

      {analysis && (
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Mood Analysis:</h2>
          <p className="text-xl font-bold text-purple-600 mb-2">
            {analysis.mood}
          </p>
          <p>{analysis.details}</p>
          <div className="mt-4 p-3 bg-blue-50 rounded">
            <p className="text-sm text-gray-700">
              <strong>Music Theory Insight:</strong> Major scales (like C major:
              C-D-E-F-G-A-B) tend to sound bright and happy, while minor scales
              (like A minor: A-B-C-D-E-F-G) often evoke sadness or melancholy.
              Rising intervals can create tension or excitement, while falling
              intervals may suggest release or calm.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicMoodAnalyzer;
