# Circuit Nest

CircuitNest, is a modern e-commerce platform built for the Arduino and electronics enthusiast community. It provides a curated marketplace for Arduino kits, individual components, and inspiring project ideas. The platform is built with React and TypeScript, and it leverages Supabase for a robust backend, handling user authentication, product management, and order processing.

## ✨ Features

*   **Product Discovery**: Browse and search for Arduino kits and individual components.
*   **Advanced Filtering & Sorting**: Easily find products by category, difficulty level, price, and name.
*   **Project Showcase**: Explore a collection of featured projects with detailed tutorials and guides.
*   **User Authentication**: Secure user registration and login functionality powered by Supabase Auth.
*   **Shopping Cart**: A persistent shopping cart to manage items, update quantities, and view order summaries.
*   **Product Details**: View detailed information for each product, including an image magnifier for a closer look.
*   **User Profiles**: A dedicated account page for users to view their profile information and (mock) order history.
*   **Responsive Design**: A clean and responsive UI built with Tailwind CSS, ensuring a great experience on any device.

## 🛠️ Tech Stack

*   **Frontend**: [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
*   **Build Tool**: [Vite](https://vitejs.dev/)
*   **Backend as a Service (BaaS)**: [Supabase](https://supabase.io/) (for Database and Authentication)
*   **Routing**: [React Router](https://reactrouter.com/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **Carousel**: [React Slick](https://react-slick.neostack.com/)

## 📂 Project Structure

The project follows a standard React application structure:

```
/src
├── assets/          # Static assets like images and logos
├── components/      # Reusable UI components (Navbar, Cards, etc.)
├── context/         # React context for state management (Auth, Cart)
├── lib/             # Supabase client configuration
├── pages/           # Page-level components for each route
├── App.tsx          # Main application component with routing setup
└── main.tsx         # Application entry point
```

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   [Node.js](https://nodejs.org/) (v18 or later)
*   [npm](https://www.npmjs.com/) or a compatible package manager
*   A [Supabase](https://supabase.io/) account to set up the database and authentication.

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/ridhwan-ra2005171/ArduninoMarkt.git
    cd ArduninoMarkt
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root directory and add your Supabase project URL and Anon Key. You can find these in your Supabase project's API settings.

    ```env
    VITE_SUPABASE_URL="YOUR_SUPABASE_URL"
    VITE_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
    ```

4.  **Set up the Supabase database:**
    You will need to create the following tables in your Supabase project to match the application's data structure:
    *   `products`: For Arduino kits.
    *   `components`: For individual electronic parts.
    *   `projects`: For project tutorials and ideas.

### Available Scripts

*   **Run the development server:**
    ```sh
    npm run dev
    ```
    Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

*   **Build for production:**
    ```sh
    npm run build
    ```
    This builds the app for production to the `dist` folder.

*   **Lint the codebase:**
    ```sh
    npm run lint
    ```
    This runs ESLint to find and fix problems in your code.
