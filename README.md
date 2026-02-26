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
├── app/                # Next.js App Router setup & Global Styles
├── components/         # UI Components
│   ├── Card/           # Metric Summary Cards
│   ├── Charts/         # Recharts implementations
│   ├── Dashboard/      # Main View Orchestrator
│   │   ├── ChartsSection.tsx
│   │   ├── RecordsSection.tsx
│   │   ├── SummaryGrid.tsx
│   │   ├── DashboardBackground.tsx
│   │   └── ChartCard.tsx
│   ├── Filters/        # Search & Filter bar
│   ├── Footer/         # Dashboard Footer
│   ├── Header/         # Dashboard Header & Global Nav
│   ├── ui/             # Atomic, reusable UI components (Button, Input, etc.)
│   ├── icons/          # Centralized SVG icon library
│   ├── Layout/         # Global layout elements
│   ├── Modal/          # Detail view modals
│   ├── Table/          # Virtualized Data Table
│   └── Skeleton/       # Loading placeholders
├── constants/          # Application constants (Statuses, Categories, Colors)
├── features/           # Redux Slices (Data, UI, Theme)
├── hooks/              # Custom React hooks (Debounce, Realtime)
├── store/              # Redux Store & Provider configuration
├── types/              # Centralized TypeScript definitions
├── utils/              # Formatters, Mock API & Test Utilities
└── __tests__/          # (Test files are colocated with components)
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



