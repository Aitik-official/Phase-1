export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white px-6 py-6">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-4" style={{ fontFamily: 'Inter, sans-serif' }}>
        <a
          href="#"
          className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
        >
          Terms of Use
        </a>
        <span className="text-slate-300">|</span>
        <a
          href="#"
          className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
        >
          Privacy Policy
        </a>
        <span className="text-slate-300">|</span>
        <a
          href="#"
          className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
        >
          Contact Support
        </a>
      </div>
    </footer>
  );
}







