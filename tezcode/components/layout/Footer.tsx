export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 bg-black text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 text-sm md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-base font-semibold">TezCode</div>
          <p className="mt-1 text-xs text-white/70">
            Learn computer science by doing, not just reading.
          </p>
        </div>
        <nav className="flex flex-wrap gap-4 text-xs text-white/70">
          <a href="#" className="hover:text-white">
            Privacy
          </a>
          <a href="#" className="hover:text-white">
            Terms
          </a>
          <a href="#" className="hover:text-white">
            Support
          </a>
        </nav>
        <p className="text-xs text-white/60">© {year} TezCode. All rights reserved.</p>
      </div>
    </footer>
  );
}

