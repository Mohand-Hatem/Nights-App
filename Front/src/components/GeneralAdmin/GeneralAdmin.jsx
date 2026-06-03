import { MdEngineering } from "react-icons/md";

function GeneralAdmin() {
  return (
    <div className="theme-card content flex min-h-screen w-full flex-col items-center justify-center rounded-2xl p-6 transition-all duration-500 md:p-12">
      <MdEngineering className="mb-6 animate-bounce text-8xl text-accent md:text-12xl" />
      <h1 className="theme-heading animate-fade-in text-center font-mono text-3xl tracking-wider md:text-5xl lg:text-6xl">
        Welcome to the Dashboard
      </h1>
      <p className="theme-muted animate-fade-in mt-4 max-w-xl text-center delay-200 md:text-lg">
        Manage your projects, tasks, and workflow effortlessly in one place.
      </p>
    </div>
  );
}

export default GeneralAdmin;
