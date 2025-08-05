# React + Vite + TypeScript - Professional Starter Template

A production-ready starter template for building modern, robust, and scalable web applications. This template is pre-configured with a professional development environment designed for high-quality code and an efficient workflow.

---

## ✨ Features

- ⚡️ **Vite 5**: Next-generation frontend tooling for a blazing-fast development experience.
- ⚛️ **React 19**: A JavaScript library for building user interfaces.
- 📘 **TypeScript**: Strong typing for robust and scalable applications.
- 🧹 **ESLint**: For identifying and reporting on patterns in code, pre-configured with strict, type-aware rules.
- 🎨 **Prettier**: An opinionated code formatter for maintaining a consistent code style.
- 🐶 **Husky & lint-staged**: For running scripts automatically on git commits to enforce code quality and prevent errors from entering the codebase.
- 🧪 **Vitest**: A modern, fast testing framework for unit and component testing.
- 🛣️ **Absolute Imports**: Pre-configured with a `@/*` path alias for cleaner and more maintainable import statements.
- 🔄 **Fast Refresh**: Instant feedback and state retention in development via SWC.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18.0.0 or newer)
- A package manager like `pnpm` (recommended), `npm`, or `yarn`.

### Installation

1.  **Clone the repository** (or use it as a template on GitHub):

    ```bash
    git clone [https://github.com/satish9484/react-vite-template.git](https://github.com/satish9484/react-vite-template.git)
    ```

2.  **Navigate to the project directory**:

    ```bash
    cd react-vite-template
    ```

3.  **Install dependencies** (pnpm is recommended for performance):

    ```bash
    pnpm install
    ```

    Alternatively, you can use `npm install` or `yarn install`.

4.  **Start the development server**:
    ```bash
    pnpm dev
    ```
    Your application should now be running on `http://localhost:3000`.

## 📜 Available Scripts

This project includes a set of useful scripts to streamline your development workflow:

- `pnpm dev`: Starts the development server with Fast Refresh.
- `pnpm build`: Compiles and bundles the application for production.
- `pnpm preview`: Serves the production build locally to preview before deployment.
- `pnpm test`: Runs the test suite using Vitest.
- `pnpm coverage`: Runs tests and generates a code coverage report.
- `pnpm lint`: Lints the entire codebase using ESLint.
- `pnpm format`: Formats the entire codebase using Prettier.
- `pnpm type-check`: Performs a static type check across the entire project with TypeScript.

## 🏛️ Project Structure

The project follows a feature-based structure, designed for scalability and maintainability.

```
.
├── .husky/              # Husky Git hooks configuration
├── public/              # Static assets
├── scripts/             # Custom node scripts for the project
└── src/
    ├── app/             # Global app setup (e.g., Redux store)
    ├── assets/          # Global assets like images and fonts
    ├── components/      # Global, reusable UI components (Button, Input, etc.)
    ├── features/        # Business-logic features (e.g., authentication, products)
    ├── hooks/           # Global, reusable React hooks
    ├── pages/           # Top-level page components tied to routes
    ├── styles/          # Global styles, variables, and themes
    ├── types/           # Global TypeScript type definitions (*.d.ts)
    └── main.tsx         # Application entry point
```

#### **Running with Docker Locally**

To test the production container on your local machine:

1.  **Build the Docker Image:**
    ```bash
    docker build -t my-react-app .
    ```
2.  **Run the Docker Container:**
    ```bash
    docker run -p 8080:8080 my-react-app
    ```
    You can then access the application at `http://localhost:8080`.

## 🧰 Core Concepts & Best Practices

### Git Hooks with Husky & lint-staged

This template is configured with Git hooks to automate code quality checks:

- **On Commit (`pre-commit`)**: `lint-staged` will automatically run ESLint and Prettier on any staged files. This prevents code with formatting or linting errors from being committed.
- **On Push (`pre-push`)**: The full test suite (`npm run test`) and type-checker (`npm run type-check`) will run. This ensures that only code that passes all quality gates can be pushed to the remote repository.

### Type-Aware Linting

The ESLint configuration is set up with `typescript-eslint`'s strict, type-aware rules. This allows ESLint to use TypeScript's type information to catch a wider range of potential bugs, such as improper use of variables based on their types. This provides a powerful layer of protection beyond standard linting.

## 🤝 Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request.

1.  Fork the repository.
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'feat: Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

## 📝 License

This project is licensed under the MIT License. See the [LICENSE] file for details.
