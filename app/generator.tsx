'use client';

import React, { useState, useEffect } from 'react';
import { Volume2, Power } from 'lucide-react';

const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const chordTypes = ['', 'm', '7', 'm7', 'maj7', '6'];

const diatonicChords: { [key: string]: number[] } = {
  major: [0, 2, 4, 5, 7, 9, 11],
  minor: [0, 2, 3, 5, 7, 8, 10]
};

const ChordSequenceGenerator: React.FC = () => {
  const [tonality, setTonality] = useState('C');
  const [mode, setMode] = useState<'major' | 'minor'>('major');
  const [sequence, setSequence] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPoweredOn, setIsPoweredOn] = useState(false);

  const generateSequence = () => {
    if (!isPoweredOn) return;
    setIsGenerating(true);
    const length = Math.floor(Math.random() * 5) + 2; // 2-6 chords
    const scale = diatonicChords[mode];
    const rootIndex = notes.indexOf(tonality);

    const newSequence = Array.from({ length }, () => {
      const scaleIndex = Math.floor(Math.random() * scale.length);
      const noteIndex = (rootIndex + scale[scaleIndex]) % 12;
      const note = notes[noteIndex];
      const type = chordTypes[Math.floor(Math.random() * chordTypes.length)];
      return `${note}${type}`;
    });

    setSequence([]);
    setTimeout(() => {
      setSequence(newSequence);
      setIsGenerating(false);
    }, 1000);
  };

  useEffect(() => {
    if (isPoweredOn) generateSequence();
  }, [tonality, mode, isPoweredOn]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-700 to-gray-900 p-6 flex flex-col items-center justify-center font-mono">
      <div className="bg-gray-800 w-full max-w-3xl p-8 rounded-lg shadow-2xl border-t-4 border-b-4 border-yellow-500">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-yellow-500">Vintage Chord Generator</h1>
          <button
            onClick={() => setIsPoweredOn(!isPoweredOn)}
            className={`rounded-full p-2 transition-colors duration-300 ${
              isPoweredOn ? 'bg-green-500' : 'bg-red-500'
            }`}
          >
            <Power className="text-white" />
          </button>
        </div>

        <div className="bg-gray-900 p-4 rounded mb-6">
          <div className="flex justify-between items-center mb-4">
            <label className="text-yellow-500">Tonality</label>
            <div className="relative">
              <select
                value={tonality}
                onChange={(e) => setTonality(e.target.value)}
                disabled={!isPoweredOn}
                className="appearance-none bg-gray-700 text-yellow-500 px-4 py-2 pr-8 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                {notes.map((note) => (
                  <option key={note} value={note}>{note}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-yellow-500">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <label className="text-yellow-500">Mode</label>
            <div className="relative">
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value as 'major' | 'minor')}
                disabled={!isPoweredOn}
                className="appearance-none bg-gray-700 text-yellow-500 px-4 py-2 pr-8 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <option value="major">Major</option>
                <option value="minor">Minor</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-yellow-500">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 p-4 rounded mb-6 flex items-center justify-between">
          <button
            onClick={generateSequence}
            disabled={!isPoweredOn || isGenerating}
            className={`bg-yellow-500 text-gray-900 px-4 py-2 rounded font-bold transition-opacity duration-300 ${
              !isPoweredOn || isGenerating ? 'opacity-50 cursor-not-allowed' : 'hover:bg-yellow-400'
            }`}
          >
            {isGenerating ? 'Generating...' : 'Generate Sequence'}
          </button>
          <div className={`w-4 h-4 rounded-full ${isGenerating ? 'bg-red-500' : 'bg-green-500'}`}></div>
        </div>

        <div className="bg-gray-900 p-4 rounded">
          <div className="text-yellow-500 mb-2">Chord Sequence:</div>
          <div className="flex justify-between items-center space-x-2">
            {sequence.map((chord, index) => (
              <div key={index} className="flex-1">
                <div className="bg-gray-700 text-yellow-500 p-2 rounded text-center">
                  {chord}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChordSequenceGenerator;
