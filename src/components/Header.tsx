"use client";

import { BMAC_URL, GITHUB_URL } from "@/lib/constants";

export function Header() {
  return (
    <header className="flex items-center justify-between px-4 lg:px-6 h-14 border-b border-[var(--border)] bg-[var(--bg-primary)]">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#f093fb] to-[#5c7cfa] flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
        </div>
        <span className="font-semibold text-sm tracking-tight">Picedit</span>
      </div>

      <div className="flex items-center gap-3">
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-sm flex items-center gap-1.5"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          GitHub
        </a>
        <a
          href={BMAC_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs px-3 py-1.5 rounded-full bg-[#ffdd00] text-[#0d0d0d] font-medium hover:bg-[#ffed4a] transition-colors"
        >
          Buy me a coffee
        </a>
      </div>
    </header>
  );
}
