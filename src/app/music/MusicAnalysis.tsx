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
  const [transpose, setTranspose] = useState(0); // Transpose the melody by this many semitones

  // Add keyboard event listener for backspace
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Backspace' && notes.length > 0) {
        removeLastNote();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [notes]);

  // Remove last note function
  const removeLastNote = () => {
    setNotes(notes.slice(0, -1));
    setAnalysis(null);
  };

  // Define white and black keys separately for correct rendering
  const whiteKeys: Note[] = [
    { note: "C4", label: "C", type: "white" },
    { note: "D4", label: "D", type: "white" },
    { note: "E4", label: "E", type: "white" },
    { note: "F4", label: "F", type: "white" },
    { note: "G4", label: "G", type: "white" },
    { note: "A4", label: "A", type: "white" },
    { note: "B4", label: "B", type: "white" },
    { note: "C5", label: "C", type: "white" },
  ];
  const blackKeys: (Note | null)[] = [
    { note: "C#4", label: "C#", type: "black" },
    { note: "D#4", label: "D#", type: "black" },
    null, // E, F
    { note: "F#4", label: "F#", type: "black" },
    { note: "G#4", label: "G#", type: "black" },
    { note: "A#4", label: "A#", type: "black" },
    null, // B, C
  ];

  // Initialize the synth
  useEffect(() => {
    const newSynth = new Tone.Synth().toDestination();
    setSynth(newSynth);

    return () => {
      newSynth.dispose();
    };
  }, []);

  // Transpose a note by the given number of semitones
  const transposeNote = (note: string, semitones: number): string => {
    return Tone.Frequency(note).transpose(semitones).toNote();
  };

  // Play a note
  const playNote = (note: string) => {
    if (synth) {
      const transposedNote = transposeNote(note, transpose);
      synth.triggerAttackRelease(transposedNote, "8n");
      setNotes([...notes, note]); // Store original note, not transposed
    }
  };

  // Play notes with specified speed
  const playNotes = async (speed: number = 0.5) => {
    if (notes.length === 0) return;

    setIsPlaying(true);
    await Tone.start();

    const now = Tone.now();
    notes.forEach((note, index) => {
      // Transpose the note by the transpose value
      const transposedNote = transposeNote(note, transpose);
      synth?.triggerAttackRelease(transposedNote, "8n", now + index * speed);
    });

    setTimeout(() => setIsPlaying(false), notes.length * speed * 1000);
  };

  // Play melody
  const playSequence = () => playNotes(0.5);

  // Play notes as a chord (essentially just a faster melody)
  const playAsChord = () => playNotes(0.05);

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
    <div className="space-y-8">
      <div className="p-6 max-w-2xl mx-auto bg-gray-100 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Music Mood Analyzer 🎶
        </h1>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">
            Play notes to create a melody:
          </h2>

          {/* Transpose slider */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Transpose: {transpose > 0 ? `+${transpose}` : transpose} semitones
            </label>
            <input
              type="range"
              min="-12"
              max="12"
              value={transpose}
              onChange={(e) => setTranspose(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>


          <div className="flex justify-center">
            <div className="relative" style={{ width: `${whiteKeys.length * 48}px`, height: '160px' }}>
              {/* White keys */}
              <div className="flex">
                {whiteKeys.map((key, idx) => (
                  <div
                    key={key.note}
                    className={`bg-white border border-gray-300 w-12 h-40 relative z-0 cursor-pointer hover:bg-blue-100 flex items-end justify-center ${notes.includes(key.note) ? "bg-blue-200" : ""}`}
                    onClick={() => playNote(key.note)}
                  >
                    <span className="mb-2 text-black">{key.label}</span>
                  </div>
                ))}
              </div>
              {/* Black keys */}
              {blackKeys.map((key, idx) =>
                key ? (
                  <div
                    key={key.note}
                    className={`bg-black w-8 h-24 absolute z-10 cursor-pointer flex items-end justify-center rounded-b-md ${notes.includes(key.note) ? "bg-blue-800" : ""}`}
                    style={{
                      left: `${(idx + 1) * 48 - 16}px`, // position black between white keys
                      top: 0, // and above the white keys
                    }}
                    onClick={() => playNote(key.note)}
                  >
                    <span className="mb-2 text-white">{key.label}</span>
                  </div>
                ) : null
              )}
            </div>
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
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:bg-gray-400 relative group"
              onClick={playAsChord}
              disabled={isPlaying || notes.length < 3}
            >
              Play as Chord
              {notes.length < 3 && (
                <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Chords have at least 3 notes
                </span>
              )}
            </button>

            <button
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400 relative group"
              onClick={analyzeMelody}
              disabled={notes.length < 3}
            >
              Analyze Melody
              {notes.length < 3 && (
                <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Add at least 3 notes for analysis
                </span>
              )}
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



      {/* Instructions */}
      <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-lg">

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">How to Use This Tool 🎹</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Creating Melodies:</strong> Click the piano keys to add notes to your sequence. Each note will play when clicked.</li>
            <li><strong>Editing:</strong> Press Backspace to remove the last note you added.</li>
            <li><strong>Playing:</strong> Click "Play Melody" to hear your sequence. The notes will play in order with equal timing.</li>
            <li><strong>Analysis:</strong> Add at least 3 notes and click "Analyze Melody" to get insights about the mood and characteristics of your melody.</li>
            <li><strong>Starting Over:</strong> Use the "Clear" button to remove all notes and start a new melody.</li>
          </ul>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Key Takeaways</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Music theory helps us understand why certain combinations of notes create specific emotional responses.</li>
            <li>The relationship between notes (intervals) is as important as the individual notes themselves, with different intervals producing different cadences.</li>
            <li>Even simple melodies can convey a complex array of emotions through subtleties in their structure, progression, and composition.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MusicMoodAnalyzer;
