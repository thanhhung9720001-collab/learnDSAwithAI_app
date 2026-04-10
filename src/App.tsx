/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BarChart3, ChevronRight, Github, Menu, X, Globe } from 'lucide-react';
import { ALGORITHMS } from './algorithms';
import AlgorithmVisualizer from './components/AlgorithmVisualizer';
import { useLanguage } from './contexts/LanguageContext';

export default function App() {
  const [selectedAlgoId, setSelectedAlgoId] = useState(ALGORITHMS[0].id);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { t, language, setLanguage } = useLanguage();

  const selectedAlgo = ALGORITHMS.find(a => a.id === selectedAlgoId) || ALGORITHMS[0];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-900">
      
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b border-slate-200 p-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="bg-slate-900 p-1.5 rounded-lg">
            <BarChart3 className="text-white" size={20} />
          </div>
          <span className="font-bold tracking-tight">AlgoViz</span>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setLanguage(language === 'vi' ? 'en' : 'vi')} 
            className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-bold"
          >
            <Globe size={14} /> {language.toUpperCase()}
          </button>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-slate-600">
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-72 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-full flex flex-col p-6">
          <div className="hidden md:flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="bg-slate-900 p-2 rounded-xl shadow-lg shadow-slate-200">
                <BarChart3 className="text-white" size={24} />
              </div>
              <div>
                <h1 className="font-bold text-xl tracking-tight">AlgoViz</h1>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{t('subtitle')}</p>
              </div>
            </div>
            
            <button 
              onClick={() => setLanguage(language === 'vi' ? 'en' : 'vi')} 
              className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors text-xs font-bold shrink-0 shadow-sm"
              title="Change Language"
            >
              <Globe size={14} /> {language.toUpperCase()}
            </button>
          </div>

          <nav className="flex-1 space-y-4 overflow-y-auto pb-4">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 px-3">{t('sortingGroup')}</p>
              <div className="space-y-1">
                {ALGORITHMS.filter(a => a.type === 'sort').map((algo) => (
                  <button
                    key={algo.id}
                    onClick={() => {
                      setSelectedAlgoId(algo.id);
                      setIsSidebarOpen(false);
                    }}
                    className={`
                      w-full flex items-center justify-between px-4 py-2.5 rounded-xl transition-all duration-200 group text-sm
                      ${selectedAlgoId === algo.id 
                        ? 'bg-slate-900 text-white shadow-md shadow-slate-200' 
                        : 'text-slate-600 hover:bg-slate-100'}
                    `}
                  >
                    <span className="font-medium">{algo.name}</span>
                    <ChevronRight size={16} className={`transition-transform duration-200 ${selectedAlgoId === algo.id ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'}`} />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 px-3 mt-4">{t('searchingGroup')}</p>
              <div className="space-y-1">
                {ALGORITHMS.filter(a => a.type === 'search').map((algo) => (
                  <button
                    key={algo.id}
                    onClick={() => {
                      setSelectedAlgoId(algo.id);
                      setIsSidebarOpen(false);
                    }}
                    className={`
                      w-full flex items-center justify-between px-4 py-2.5 rounded-xl transition-all duration-200 group text-sm
                      ${selectedAlgoId === algo.id 
                        ? 'bg-slate-900 text-white shadow-md shadow-slate-200' 
                        : 'text-slate-600 hover:bg-slate-100'}
                    `}
                  >
                    <span className="font-medium">{algo.name}</span>
                    <ChevronRight size={16} className={`transition-transform duration-200 ${selectedAlgoId === algo.id ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'}`} />
                  </button>
                ))}
              </div>
            </div>
          </nav>

          <div className="mt-auto pt-6 border-t border-slate-100">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-slate-900 transition-colors text-sm font-medium"
            >
              <Github size={18} />
              <span>{t('sourceCode')}</span>
            </a>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 lg:p-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <AlgorithmVisualizer key={`${selectedAlgo.id}-${language}`} algorithm={selectedAlgo} />
          
          {/* Footer Info */}
          <footer className="mt-12 pt-8 border-t border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-8 text-slate-500">
            <div>
              <h4 className="text-slate-900 font-bold text-sm mb-3">{t('aboutTab')}</h4>
              <p className="text-sm leading-relaxed">
                {t('aboutText')}
              </p>
            </div>
            <div>
              <h4 className="text-slate-900 font-bold text-sm mb-3">{t('usageTab')}</h4>
              <ul className="text-sm space-y-2">
                <li>• {t('usageStep1')}</li>
                <li>• {t('usageStep2')}</li>
                <li>• {t('usageStep3')}</li>
              </ul>
            </div>
            <div>
              <h4 className="text-slate-900 font-bold text-sm mb-3">{t('complexityTab')}</h4>
              <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs font-mono">
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span>{t('avgTime')}</span>
                  <span className="text-sky-600 font-bold">{selectedAlgo.complexities?.time || 'N/A'}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>{t('memory')}</span>
                  <span className="text-emerald-600 font-bold">{selectedAlgo.complexities?.space || 'N/A'}</span>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </main>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
