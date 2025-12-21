
import React from 'react';
import { NewsStory } from '../types';
import { ExternalLink, CheckCircle2 } from 'lucide-react';

interface NewsCardProps {
  story: NewsStory;
}

const NewsCard: React.FC<NewsCardProps> = ({ story }) => {
  // Extract domain for a cleaner look
  const getDomain = (url: string) => {
    try {
      const domain = new URL(url).hostname.replace('www.', '');
      return domain;
    } catch {
      return story.sourceTitle;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group">
      <div className="p-5 flex-grow">
        <div className="flex items-center justify-between mb-3">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-100 uppercase tracking-wider">
            {story.category}
          </span>
          <span className="text-[10px] font-medium text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full">
            {story.publishedAt}
          </span>
        </div>
        
        <h3 className="text-lg font-bold text-slate-900 mb-3 leading-tight group-hover:text-amber-600 transition-colors">
          {story.title}
        </h3>
        
        <p className="text-slate-600 text-sm leading-relaxed">
          {story.summary}
        </p>
      </div>
      
      <div className="px-5 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center flex-shrink-0 shadow-sm">
            <span className="text-xs font-black text-amber-500">{story.sourceTitle.charAt(0)}</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[11px] font-bold text-slate-800 truncate flex items-center gap-1">
              {story.sourceTitle}
              <CheckCircle2 size={10} className="text-blue-500 flex-shrink-0" />
            </span>
            <span className="text-[10px] text-slate-400 truncate">{getDomain(story.sourceUrl)}</span>
          </div>
        </div>
        
        <a 
          href={story.sourceUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-full transition-all"
          title="Open source"
        >
          <ExternalLink size={16} />
        </a>
      </div>
    </div>
  );
};

export default NewsCard;
