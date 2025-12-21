
import React from 'react';
import { Sun } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-yellow-400 p-2 rounded-xl shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M12 2v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="M20 12h2"/><path d="m19.07 4.93-1.41 1.41"/><path d="M15.89 16.75 12 11"/><path d="m8.11 16.75 3.89-5.75"/><path d="M12 11v11"/><path d="m3 12 2 0"/><path d="m16.24 16.24 1.41 1.41"/><path d="m3.93 15.07 1.41-1.41"/><path d="m7.76 16.24-1.41 1.41"/></svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Beacon</h1>
            <p className="text-xs text-slate-500 font-medium tracking-widest uppercase">The Positive News Portal</p>
          </div>
        </div>
        
        <div className="hidden md:block">
          <span className="text-sm font-medium text-slate-600 italic">
            "Spreading light, one headline at a time."
          </span>
        </div>

        <div className="flex items-center gap-4">
           <button className="text-sm font-semibold bg-slate-900 text-white px-4 py-2 rounded-full hover:bg-slate-800 transition-colors">
            About
           </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
