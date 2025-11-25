# Smart Recipe Generator

## Live Demo:- https://smart-recipe-generator-delta-one.vercel.app/

A modern, intelligent recipe application that helps you decide what to cook based on the ingredients you have. Powered by Next.js and Google's Gemini API.

## Features

### Smart Ingredient Input

- **Manual Entry**: Easily add ingredients to your pantry list.
- **AI Image Analysis**: Upload a photo of your fridge or pantry, and let Google Gemini AI automatically identify ingredients for you.

### Intelligent Recipe Matching

- **Fuzzy Matching**: Our robust algorithm matches your ingredients against our recipe database, handling singular/plural forms and partial matches.
- **Match Percentage**: See exactly how well a recipe matches your available ingredients.
- **Missing Ingredients**: Quickly identify what you need to buy to complete a recipe.

### Advanced Filtering

- **Dietary Preferences**: Filter by Vegetarian, Vegan, Gluten-Free, and more.
- **Difficulty Levels**: Choose from Easy, Medium, or Hard recipes.
- **Cooking Time**: Set a maximum cooking time to fit your schedule.
- **Serving Size**: Find recipes that feed the right number of people.

### Personalized Recommendations

- **"Recommended for You"**: Get tailored recipe suggestions based on your favorites and past ratings.
- **User Preferences**: The app learns from your interactions (favorites and ratings) to improve suggestions over time.

### UI/UX

- **Dark Mode**: Seamlessly switch between light and dark themes.
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile.
- **Beautiful Animations**: Smooth transitions and interactions powered by Framer Motion.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **AI Integration**: [Google Generative AI (Gemini)](https://ai.google.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Theme Management**: [next-themes](https://github.com/pacocoursey/next-themes)

## Getting Started

Follow these steps to get the project running on your local machine.

### Prerequisites

- **Node.js**: Version 18.17 or later.
- **Gemini API Key**: Get a free API key from [Google AI Studio](https://aistudio.google.com/).

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/SauravChaudhary26/Smart-Recipe-Generator
    cd Smart-Recipe-Generator
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root directory and add your Gemini API key:

    ```env
    GEMINI_API_KEY=your_api_key_here
    ```

4.  **Run the development server:**

    ```bash
    npm run dev
    ```

5.  **Open the app:**
    Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
recepie/
├── app/
│   ├── api/              # API routes (Gemini, matching logic)
│   ├── components/       # Reusable React components
│   ├── hooks/            # Custom React hooks (recommendations, prefs)
│   ├── types/            # TypeScript type definitions
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Main application page
├── data/
│   └── recipes.json      # Recipe database
├── public/               # Static assets
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the project
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request
