"use client";

import { BMAC_URL, GITHUB_URL } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <FeatureCard
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            }
            title="Privacy first"
            description="Everything runs in your browser. Your images never leave your device."
          />
          <FeatureCard
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            }
            title="100% free"
            description="No signup, no watermark, no limits. Open source forever."
          />
          <FeatureCard
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            }
            title="Instant"
            description="No uploads, no processing time. See changes in real-time as you adjust."
          />
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[var(--border)]">
          <p className="text-xs text-[var(--text-muted)]">
            Built with care. Open source on{" "}
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] underline"
            >
              GitHub
            </a>
            .
          </p>
          <a
            href={BMAC_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs px-4 py-2 rounded-full bg-[#ffdd00] text-[#0d0d0d] font-medium hover:bg-[#ffed4a] transition-colors"
          >
            If you find this useful, buy me a coffee
          </a>
        </div>
      </div>
    </footer>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center p-4">
      <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[var(--bg-tertiary)] text-[var(--accent)] mb-3">
        {icon}
      </div>
      <h3 className="text-sm font-medium mb-1">{title}</h3>
      <p className="text-xs text-[var(--text-muted)] leading-relaxed">{description}</p>
    </div>
  );
}
