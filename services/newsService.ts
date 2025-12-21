
import { GoogleGenAI } from "@google/genai";
import { NewsCategory, NewsResponse, GroundingSource, NewsStory } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const fetchPositiveNews = async (category: NewsCategory): Promise<NewsResponse> => {
  const model = "gemini-3-flash-preview";
  
  // Refined regional context
  let regionContext = "";
  if (category === NewsCategory.INDIA) regionContext = "specifically in India";
  else if (category === NewsCategory.ASIA) regionContext = "across the Asian continent";
  else if (category === NewsCategory.WORLD) regionContext = "internationally from various countries";
  else regionContext = `regarding ${category}`;

  const prompt = `
    Find 12-15 highly recent (last 3-5 days) POSITIVE and UPLIFTING news stories ${regionContext}.
    
    PRIORITIZE:
    - Scientific/Medical breakthroughs
    - Environmental restoration wins
    - Acts of heroism or community kindness
    - Economic progress or educational milestones
    - Cultural harmony or sports achievements (inspiring only)
    
    SOURCES: Use reputable outlets like Reuters, BBC, The Hindu, Indian Express, AP, or local verified news.
    
    FORMAT each story exactly as:
    [TITLE] Title of story
    [SUMMARY] 2 sentences maximum.
    [SOURCE] Name of publication
    ---
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        // Keeping temperature lower for more factual, faster reporting
        temperature: 0.2,
      },
    });

    const text = response.text || "";
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources: GroundingSource[] = groundingChunks
      .filter((chunk: any) => chunk.web)
      .map((chunk: any) => ({
        uri: chunk.web.uri,
        title: chunk.web.title
      }));

    // Improved parsing for higher volume
    const storyBlocks = text.split('---').filter(block => block.includes('[TITLE]'));
    
    const stories: NewsStory[] = storyBlocks.map((block, index) => {
      const title = block.match(/\[TITLE\](.*?)\n/)?.[1]?.trim() || "Positive Update";
      const summary = block.match(/\[SUMMARY\]([\s\S]*?)\n/)?.[1]?.trim() || "Details of a positive development.";
      const sourceName = block.match(/\[SOURCE\](.*?)$/)?.[1]?.trim() || "News Outlet";
      
      // Match source by keywords in URL if possible, or just use the index
      const source = sources.find(s => 
        s.title.toLowerCase().includes(sourceName.toLowerCase()) || 
        s.uri.toLowerCase().includes(sourceName.toLowerCase().replace(/\s/g, ''))
      ) || sources[index % sources.length];

      return {
        id: `story-${index}-${Date.now()}`,
        title,
        summary,
        sourceUrl: source?.uri || "#",
        sourceTitle: sourceName,
        category,
        publishedAt: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
      };
    });

    return {
      stories,
      rawText: text,
      sources
    };
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
};
