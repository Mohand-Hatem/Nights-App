import { useTheme } from '../../Context/ThemeContext';
import { FaMoon, FaSun } from 'react-icons/fa';

function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggleTheme}
      className="relative flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full border border-border bg-surface-muted p-0.5 transition-colors"
    >
      <span
        className={`flex h-5 w-5 items-center justify-center rounded-full bg-card text-xs text-accent shadow transition-transform duration-200 ${
          isDark ? "translate-x-5" : "translate-x-0"
        }`}
      >
        {isDark ? <FaMoon /> : <FaSun />}
      </span>
    </button>
  );
}

export default ThemeToggle;
