
# Beacon: The Positive News Portal

Beacon is a modern news aggregator application that focuses exclusively on uplifting, inspiring, and positive stories from around the world. Powered by Google's Gemini API with real-time Google Search Grounding, it filters out the noise of daily tragedy and conflict to highlight human progress, scientific breakthroughs, and community resilience.

## Features

- **AI-Curated Positivity**: Utilizes `gemini-3-flash-preview` to intelligently scan and select only positive news stories, filtering out political strife and negative sensationalism.
- **Real-Time Verification**: Uses Google Search Grounding to ensure all stories are recent (within the last 3-5 days) and backed by verified sources.
- **Regional Focus**: Dedicated news feeds for **India**, **Asia**, and **Global** headlines, alongside thematic categories like **Environment**, **Science**, and **Human Interest**.
- **Transparent Sourcing**: Every story card clearly displays the publication source (e.g., Reuters, The Hindu, BBC) with direct links to the original articles.
- **Modern UI/UX**: A clean, responsive interface built with React and Tailwind CSS, featuring masonry-style grids and smooth transitions.

## Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **AI & Data**: Google GenAI SDK (`@google/genai`), Gemini 1.5 Flash Model
- **Icons**: Lucide React
- **Font**: Outfit & Playfair Display (via Google Fonts)

## How It Works

1.  **Prompt Engineering**: The app sends specific prompts to the Gemini model requesting a set number of "positive" stories based on "Solutions Journalism" principles.
2.  **Search Grounding**: The model uses the `googleSearch` tool to retrieve real-time data from the web.
3.  **Parsing & Rendering**: The raw text response and grounding metadata are parsed to extract titles, summaries, and source URLs, which are then rendered into interactive news cards.
