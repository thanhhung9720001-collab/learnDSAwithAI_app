import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause, SkipForward, RotateCcw, Settings2, Code2, Info } from 'lucide-react';
import { Algorithm, Step, CodeSnippets } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

const ARRAY_SIZE = 12;
const MIN_VAL = 10;
const MAX_VAL = 100;

interface Props {
  algorithm: Algorithm;
  key?: string;
}

export default function AlgorithmVisualizer({ algorithm }: Props) {
  const [initialArray, setInitialArray] = useState<number[]>([]);
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(600);
  const [codeLang, setCodeLang] = useState<keyof CodeSnippets>('python');
  const [searchTarget, setSearchTarget] = useState<number | null>(null);
  const { t, language } = useLanguage();

  const generateNewArray = useCallback(() => {
    let newArr = Array.from({ length: ARRAY_SIZE }, () => 
      Math.floor(Math.random() * (MAX_VAL - MIN_VAL + 1)) + MIN_VAL
    );
    if (algorithm.requiresSorted) {
      newArr.sort((a, b) => a - b);
    }
    setInitialArray(newArr);

    if (algorithm.type === 'search') {
      const pickExisting = Math.random() < 0.7;
      const target = pickExisting 
        ? newArr[Math.floor(Math.random() * newArr.length)] 
        : Math.floor(Math.random() * (MAX_VAL - MIN_VAL + 1)) + MIN_VAL;
      setSearchTarget(target);
    } else {
      setSearchTarget(null);
    }

    setCurrentStepIdx(0);
    setIsPlaying(false);
  }, [algorithm.id, algorithm.type, algorithm.requiresSorted]);

  useEffect(() => {
    generateNewArray();
  }, [generateNewArray, algorithm.id]);

  useEffect(() => {
    if (initialArray.length === 0) return;
    const newSteps = algorithm.generateSteps(initialArray, language, codeLang, searchTarget ?? undefined);
    setSteps(newSteps);
    setCurrentStepIdx(0);
  }, [initialArray, algorithm, language, codeLang, searchTarget]);

  useEffect(() => {
    let timer: any;
    if (isPlaying && currentStepIdx < steps.length - 1) {
      timer = setTimeout(() => {
        setCurrentStepIdx(prev => prev + 1);
      }, speed);
    } else if (currentStepIdx >= steps.length - 1) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStepIdx, speed, steps.length]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  
  const stepForward = () => {
    if (currentStepIdx < steps.length - 1) {
      setCurrentStepIdx(prev => prev + 1);
      setIsPlaying(false);
    }
  };

  const handleReset = () => {
    generateNewArray();
  };

  const currentStep = steps[currentStepIdx] || {
    array: initialArray,
    activeIndices: [],
    sortedIndices: [],
    isSwapping: false,
    activeLines: [],
    explanation: t('preparing')
  };

  const getBarColor = (index: number) => {
    if (currentStep.foundIndex !== undefined && currentStep.foundIndex === index) return 'bg-lime-400 ring-2 ring-lime-300 ring-offset-2';
    if (algorithm.type === 'search' && currentStep.activeIndices.includes(index)) return 'bg-amber-400 ring-2 ring-amber-300';
    if (currentStep.sortedIndices.includes(index)) return 'bg-emerald-500';
    if (currentStep.isSwapping && currentStep.activeIndices.includes(index)) return 'bg-red-500';
    if (index === currentStep.minIdx || index === currentStep.pivotIdx) return 'bg-sky-400 ring-2 ring-sky-300 ring-offset-2';
    if (currentStep.activeIndices.includes(index)) return 'bg-sky-300';
    if (currentStep.range && (index < currentStep.range[0] || index > currentStep.range[1])) return 'bg-slate-100 opacity-40';
    return 'bg-slate-300';
  };

  const codeText = algorithm.codes[codeLang] || algorithm.codes.python;
  const CODE_LINES = codeText.split('\n');

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header & Controls */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{algorithm.name}</h1>
          <p className="text-slate-500 mt-1">{t('simSubtitle')}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button 
            onClick={togglePlay}
            disabled={currentStepIdx >= steps.length - 1}
            className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-xl transition-colors disabled:opacity-50 shadow-sm"
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            {isPlaying ? t('btnPause') : t('btnPlay')}
          </button>
          <button 
            onClick={stepForward}
            disabled={isPlaying || currentStepIdx >= steps.length - 1}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl transition-colors border border-slate-200 disabled:opacity-50"
          >
            <SkipForward size={18} />
            {t('btnNext')}
          </button>
          <button 
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl transition-colors border border-slate-200"
          >
            <RotateCcw size={18} />
            {t('btnReset')}
          </button>
          
          <div className="flex items-center gap-3 ml-2 pl-4 border-l border-slate-200">
            <Settings2 size={18} className="text-slate-400" />
            <div className="flex flex-col w-24">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{t('speed')}</label>
              <input 
                type="range" 
                min="50" 
                max="1000" 
                step="50"
                value={1050 - speed} 
                onChange={(e) => setSpeed(1050 - Number(e.target.value))}
                className="accent-slate-800 h-1.5 cursor-pointer bg-slate-200 rounded-lg appearance-none"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Canvas Area */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Info size={16} /> {t('visualChart')}
            </h2>
            <div className="text-xs font-mono text-slate-400">
              {t('step')}: {currentStepIdx + 1} / {steps.length}
            </div>
          </div>
          
          {/* Legend */}
          <div className="flex flex-wrap gap-4 mb-4 text-xs text-slate-500 font-medium">
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div> {t('legendUnsorted')}</div>
            {algorithm.type === 'sort' && <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-sky-400 ring-1 ring-sky-300 ring-offset-1"></div> {t('legendPivot')}</div>}
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-sky-300"></div> {t('legendComparing')}</div>
            {algorithm.type === 'sort' && <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-500"></div> {t('legendSwapping')}</div>}
            {algorithm.type === 'sort' && <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div> {t('legendSorted')}</div>}
            {algorithm.type === 'search' && <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-lime-400 ring-1 ring-lime-300 ring-offset-1"></div> {t('foundText')}</div>}
          </div>

          {algorithm.type === 'search' && (
            <div className="flex items-center gap-3 mb-4 bg-amber-50 text-amber-800 p-3 rounded-lg border border-amber-200">
              <label htmlFor="search-target" className="font-semibold text-sm">{t('targetLabel')}</label>
              <input 
                id="search-target"
                type="number"
                value={searchTarget ?? ''}
                disabled={isPlaying}
                onChange={(e) => {
                  const val = e.target.value;
                  setSearchTarget(val === '' ? null : Number(val));
                }}
                className="w-20 px-2 py-1 bg-white border border-amber-300 rounded text-amber-900 font-bold focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-60"
              />
              {algorithm.requiresSorted && (
                <span className="text-xs ml-auto opacity-75">{t('requiresSortedNote')}</span>
              )}
            </div>
          )}

          {/* Bars Container */}
          <div className="flex-1 flex items-end justify-center gap-2 md:gap-3 h-64 md:h-80 min-h-[300px] border-b border-slate-100 pb-2">
            {currentStep.array.map((val, idx) => (
              <div key={idx} className="relative flex flex-col justify-end items-center group flex-1 max-w-[3rem] h-full">
                <div 
                  className={`w-full rounded-t-sm transition-all duration-200 ease-out relative flex justify-center ${getBarColor(idx)}`}
                  style={{ height: `${(val / MAX_VAL) * 100}%` }}
                >
                  <span className={`absolute -top-6 text-[10px] font-bold transition-colors duration-200
                    ${currentStep.activeIndices.includes(idx) ? 'text-slate-900' : 'text-slate-400'}
                  `}>
                    {val}
                  </span>
                </div>
                <span className="absolute -bottom-6 text-[10px] font-mono text-slate-400">
                  {idx}
                </span>
              </div>
            ))}
          </div>
          
          {/* Auxiliary Array for Counting Sort */}
          {currentStep.auxiliaryArray && (
            <div className="mt-12 p-4 bg-slate-50 rounded-xl border border-slate-100">
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">{t('countArray')}</h3>
              <div className="flex gap-1 overflow-x-auto pb-2">
                {currentStep.auxiliaryArray.map((count, idx) => (
                  <div key={idx} className="flex flex-col items-center min-w-[2rem]">
                    <div className={`w-full py-1 text-center text-xs font-bold rounded ${count > 0 ? 'bg-sky-100 text-sky-700' : 'bg-white text-slate-300 border border-slate-100'}`}>
                      {count}
                    </div>
                    <span className="text-[9px] text-slate-400 mt-1">{idx}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Progress Bar */}
          <div className="mt-8 pt-4 border-t border-slate-50 flex items-center gap-4">
            <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-slate-800 transition-all duration-200"
                style={{ width: `${steps.length > 0 ? (currentStepIdx / (steps.length - 1)) * 100 : 0}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Logic & Code Panel */}
        <div className="flex flex-col gap-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex-1 flex flex-col">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Info size={16} /> {t('explanation')}
            </h2>
            <div className="flex-1 flex flex-col">
              <p className="text-slate-700 text-base leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100 min-h-[100px]">
                {currentStep.explanation}
              </p>
            </div>
          </div>

          <div className="bg-[#0f172a] rounded-2xl shadow-lg border border-slate-800 overflow-hidden flex flex-col">
            <div className="bg-slate-900 px-4 py-3 flex items-center justify-between border-b border-slate-800">
              <span className="text-slate-400 text-[10px] font-bold tracking-widest uppercase flex items-center gap-2">
                <Code2 size={14} /> SOURCE CODE
              </span>
              <select 
                value={codeLang} 
                onChange={(e) => setCodeLang(e.target.value as keyof CodeSnippets)}
                className="bg-slate-800 text-slate-300 text-xs font-mono px-2 py-1 rounded outline-none border border-slate-700 hover:border-slate-600 focus:ring-1 focus:ring-sky-500 transition-all cursor-pointer"
              >
                <option value="python">Python</option>
                <option value="javascript">JavaScript</option>
                <option value="cpp">C++</option>
                <option value="java">Java</option>
              </select>
            </div>
            <div className="p-4 overflow-x-auto text-xs font-mono leading-relaxed">
              {CODE_LINES.map((line, idx) => {
                const lineNumber = idx + 1;
                const isActive = currentStep.activeLines.includes(lineNumber);
                return (
                  <div 
                    key={idx} 
                    className={`flex rounded transition-colors duration-150 ${
                      isActive ? 'bg-sky-900/40 text-sky-100' : 'text-slate-500'
                    }`}
                  >
                    <span className={`w-6 text-right pr-2 select-none opacity-40`}>
                      {lineNumber}
                    </span>
                    <span className="whitespace-pre">
                      {line}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
