# 🎬 AI Movie Insight Builder

A full-stack Next.js application that analyzes audience sentiment for any movie using its IMDb ID. The app fetches movie metadata from TMDB and generates an AI-powered audience summary using OpenRouter.

---

## 🚀 Live Demo

👉 

---

## ✨ Features

* 🔎 Search by IMDb ID (e.g., `tt0133093`)
* 🎞 Movie details (title, poster, year, rating)
* 👥 Top cast display
* 📝 Plot overview
* 🤖 AI-generated audience sentiment summary
* 📊 Sentiment classification (Positive / Mixed / Negative)
* ⚡ Responsive, modern UI
* 🧪 Basic test coverage
* 🛡 Input validation & error handling

---

## 🧱 Tech Stack & Rationale

**Frontend**

* Next.js (App Router) — modern full-stack React framework
* TypeScript — type safety and maintainability
* Tailwind CSS — rapid, consistent UI styling

**Backend**

* Next.js Route Handlers — lightweight serverless API
* TMDB API — reliable movie metadata source
* OpenRouter — cost-efficient AI inference

**Testing**

* Jest — simple unit test coverage for API validation

**Why this stack?**
It aligns with scalable JavaScript best practices while keeping the architecture clean and maintainable without over-engineering.

---

## 📦 Project Structure

```
app/
  api/movie/route.ts   # Backend API
  movie/[id]/page.tsx  # Movie detail page
  page.tsx # Home page
components/
  MovieCard.tsx
  Search.tsx
  Spinner.tsx
  SentimentBadge.tsx
__tests__/
  movie-api.test.ts
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone https://github.com/rajpratap29/movie-assignment.git
cd movie-assignment
```

---

### 2️⃣ Install dependencies

```bash
npm install
```

---

### 3️⃣ Configure environment variables

Create a `.env.local` file in the root and copy from `.env.example`:

```env
TMDB_API_KEY=your_tmdb_bearer_token
OPENROUTER_API_KEY=your_openrouter_key
```

**Where to get keys**

* TMDB: https://www.themoviedb.org/settings/api
* OpenRouter: https://openrouter.ai/keys

⚠️ Use the TMDB **Bearer token**.

---

### 4️⃣ Run the development server

```bash
npm run dev
```

Open:

```
http://localhost:3000
```

---

### 5️⃣ Run tests

```bash
npm test
```

---

### 6️⃣ Production build

```bash
npm run build
npm start
```

---

## 🧠 How It Works

1. User enters an IMDb ID
2. Backend maps IMDb → TMDB movie
3. Reviews are fetched from TMDB
4. Reviews are sent to OpenRouter LLM
5. Structured sentiment summary is returned
6. UI renders insights in a clean layout

---

## 🛡 Validation & Edge Cases

The app defensively handles:

* Invalid IMDb format
* Non-existent movies
* Empty input
* Missing reviews

---

## 📱 Responsiveness

The UI is fully responsive and tested on:

* Desktop
* Tablet
* Mobile viewports

---

## 🧪 Testing

Basic Jest tests verify API validation behavior.

To run:

```bash
npm test
```

---

## ⚠️ Assumptions

* TMDB provides sufficient review data for sentiment analysis
* OpenRouter free model availability may vary
* Only the first few reviews are analyzed for performance
* Sentiment is derived from AI and may not be perfectly accurate

---

## 👤 Author

Raj Pratap
Software Engineer

---

## 📄 License

This project was created as part of a technical assessment and is for evaluation purposes.
