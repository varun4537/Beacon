
import React, { useState, useEffect, useCallback } from 'react';
import { NewsCategory, NewsStory, GroundingSource } from './types';
import { fetchPositiveNews } from './services/newsService';
import Header from './components/Header';
import NewsCard from './components/NewsCard';
import CategoryFilter from './components/CategoryFilter';
import { Loader2, RefreshCw, Info, Globe, MapPin, Newspaper } from 'lucide-react';

const App: React.FC = () => {
  const [stories, setStories] = useState<NewsStory[]>([]);
  const [sources, setSources] = useState<GroundingSource[]>([]);
  const [category, setCategory] = useState<NewsCategory>(NewsCategory.INDIA);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadNews = useCallback(async (selectedCategory: NewsCategory) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchPositiveNews(selectedCategory);
      setStories(response.stories);
      setSources(response.sources);
    } catch (err) {
      setError("We're experiencing heavy traffic fetching the latest sunshine. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNews(category);
  }, [category, loadNews]);

  return (
    <div className="min-h-screen bg-[#fcfcfd] flex flex-col selection:bg-amber-100 selection:text-amber-900">
      <Header />
      
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Region & Context Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-amber-600 font-bold text-xs uppercase tracking-widest mb-2">
              <span className="w-8 h-[1px] bg-amber-600"></span>
              Verified Positive News
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
              What's going <span className="text-amber-500 italic">well</span> in {category}?
            </h2>
            <p className="text-slate-500 text-lg">
              Sourcing from verified outlets to bring you progress, breakthroughs, and human kindness.
            </p>
          </div>
          
          <div className="flex gap-2 bg-white p-1 rounded-2xl border border-slate-200 shadow-sm h-fit">
            <button 
              onClick={() => loadNews(category)}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all disabled:opacity-50"
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
              {loading ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
        </div>

        {/* Global/Regional Navigation */}
        <div className="mb-8 overflow-x-auto pb-2 no-scrollbar border-b border-slate-200">
          <CategoryFilter activeCategory={category} onCategoryChange={setCategory} />
        </div>

        {/* Loading State with Skeleton-like feel */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 bg-white rounded-3xl border border-slate-100 shadow-inner">
            <div className="relative">
              <div className="absolute inset-0 bg-amber-400 blur-xl opacity-20 animate-pulse"></div>
              <Loader2 className="animate-spin text-amber-500 relative z-10" size={48} />
            </div>
            <p className="mt-6 text-slate-500 font-bold tracking-wide uppercase text-xs">Curating uplifting headlines from {category}...</p>
            <p className="mt-2 text-slate-400 text-sm">Real-time search takes a moment to verify quality.</p>
          </div>
        ) : error ? (
          <div className="bg-white border-2 border-red-50 p-10 rounded-3xl text-center shadow-xl shadow-red-50/50">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
               <Info className="text-red-500" />
            </div>
            <p className="text-slate-900 font-bold text-xl mb-2">Oops! Something went wrong.</p>
            <p className="text-slate-500 mb-6 max-w-md mx-auto">{error}</p>
            <button 
              onClick={() => loadNews(category)}
              className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
            >
              Retry Search
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {stories.length > 0 ? (
                stories.map((story) => (
                  <NewsCard key={story.id} story={story} />
                ))
              ) : (
                <div className="col-span-full py-20 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                   <Newspaper className="mx-auto text-slate-300 mb-4" size={40} />
                   <p className="text-slate-500 font-medium">No new headlines found for this region right now.</p>
                </div>
              )}
            </div>

            {/* Source Transparency Footer Section */}
            {sources.length > 0 && (
              <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-2xl">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                  <div>
                    <h4 className="text-xl font-bold mb-2 flex items-center gap-2">
                      <Globe className="text-amber-400" size={24} />
                      Verified Source Network
                    </h4>
                    <p className="text-slate-400 text-sm max-w-xl">
                      Beacon uses Google Search Grounding to cross-reference multiple verified outlets including Reuters, BBC, The Hindu, and localized news agencies to ensure factual accuracy.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {sources.slice(0, 8).map((source, i) => (
                    <a 
                      key={i} 
                      href={source.uri} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-xs font-bold text-slate-300 transition-all truncate max-w-[200px]"
                    >
                      {source.title.split('-')[0].split('|')[0].trim()}
                    </a>
                  ))}
                  {sources.length > 8 && (
                    <span className="px-4 py-2 bg-slate-800/50 rounded-xl text-xs font-bold text-slate-500">
                      +{sources.length - 8} more sources
                    </span>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-400 rounded-xl flex items-center justify-center">
                <span className="text-white font-black text-xl italic">B</span>
              </div>
              <span className="font-bold text-slate-900 tracking-tight">Beacon</span>
            </div>
            <div className="text-sm text-slate-400 text-center md:text-right">
              <p>Powered by Gemini 2.0 Flash with Real-time Search</p>
              <p className="mt-1">Filtering the world for what matters most.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
