# 📊 Analytics Dashboard

A modern, high-performance analytics dashboard built with **Next.js**, **Redux Toolkit**, and **Recharts**. This application provides real-time business intelligence visualizations, interactive data exploration, and a premium user experience with a responsive dark-themed interface.

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Redux](https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)

---

## ✨ Features

- **🚀 Real-time Updates**: Simulated live session data updates every 5 seconds.
- **📈 Data Visualization**: Interactive Line, Bar, and Pie charts using Recharts.
- **📋 Virtualized Data Table**: Handles large datasets efficiently using `react-window`.
- **🔍 Advanced Filtering**: Filter data across multiple dimensions with instant UI updates.
- **🌓 Dark Mode**: Sleek dark-first design with support for system preferences.
- **📱 Responsive Layout**: Fully optimized for desktop, tablet, and mobile screens.
- **⚡ Performance Optimized**: Lazy-loaded components and efficient state management with Redux.
- **🛡️ Robust Error Handling**: Error boundaries and retry mechanisms for data fetching.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Charts**: [Recharts](https://recharts.org/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Data Table**: [React Window](https://react-window.vercel.app/) (Virtualization)
- **Icons**: Custom Heroicons-based SVG system
- **Testing**: [Jest](https://jestjs.io/) & [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/muhammad-tahir-sultan/dashboard-app-nextjs.git
   cd dashboard-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Visit the app**:
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Deployment

### Deploy on Vercel

The easiest way to deploy this project is via [Vercel](https://vercel.com/new).

1.  Push your code to GitHub (already completed).
2.  Import the repository into Vercel.
3.  Vercel will automatically detect **Next.js** and configure the build settings.
4.  Click **Deploy**.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmuhammad-tahir-sultan%2Fdashboard-app-nextjs)


---

## 📁 Project Structure

```text
src/
├── app/            # Next.js App Router setup
├── components/     # UI Components (Cards, Charts, Table, Modals)
├── features/       # Redux slices and logic
├── hooks/          # Custom React hooks (real-time, etc.)
├── store/          # Redux Store configuration
├── utils/          # Formatter and helper functions
└── types/          # TypeScript definitions
```

---

## 🧪 Running Tests

To run the unit tests:

```bash
npm test
```

To run tests with coverage:

```bash
npm test -- --coverage
```



