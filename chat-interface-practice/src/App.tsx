import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

const GITHUB_API = "https://api.github.com/search/repositories";

/**
 * Objectives:
 * - Build a responsive UI that lists GitHub repos sorted by stars.
 * - Fetch data from: https://api.github.com/search/repositories?q=stars:%3E1&sort=stars&order=desc&per_page=10&page=1
 * - Implement infinite scroll to load more repos as user scrolls.
 * - Add a search bar to filter loaded repos by name/description (client-side).
 * - Show repo details: name (link), description, stars, language, owner.
 * - Use GitHub API headers:
 *     Authorization: Bearer <YOUR_TOKEN>
 *     Accept: application/vnd.github+json
 *     X-GitHub-Api-Version: 2022-11-28
 * - Include loading, error, and empty states.
 * - Style for clarity and responsiveness (CSS/Tailwind/any).
 * - Ensure accessibility (keyboard nav, ARIA labels, headings).
 * - (Optional) Persist search query in URL, add skeletons, "Back to top" btn.
 */

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
