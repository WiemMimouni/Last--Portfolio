
import React from "react";

export default function Layout({ children, currentPageName }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pure-white to-light-neutral/30">
      <style>{`
        :root {
          --deep-emerald: #103B2E;
          --pure-white: #FFFFFF;
          --light-neutral: #E5E5E5;
          --soft-rose: #C46D8D;
          --charcoal: #2C2C2C;
          --border-subtle: rgba(16, 59, 46, 0.1);
          --shadow-elegant: rgba(16, 59, 46, 0.05);
          --shadow-hover: rgba(16, 59, 46, 0.1);
        }
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif;
          letter-spacing: -0.018em;
          line-height: 1.65;
          color: var(--charcoal);
          font-weight: 400;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        /* Color System */
        .text-deep-emerald { color: var(--deep-emerald); }
        .text-soft-rose { color: var(--soft-rose); }
        .text-charcoal { color: var(--charcoal); }
        .text-light-neutral { color: var(--light-neutral); }
        
        .bg-deep-emerald { background-color: var(--deep-emerald); }
        .bg-soft-rose { background-color: var(--soft-rose); }
        .bg-charcoal { background-color: var(--charcoal); }
        .bg-light-neutral { background-color: var(--light-neutral); }
        
        .border-deep-emerald { border-color: var(--deep-emerald); }
        .border-soft-rose { border-color: var(--soft-rose); }
        .border-subtle { border-color: var(--border-subtle); }
        
        /* Refined Gradient Text */
        .gradient-text {
          background: linear-gradient(135deg, var(--deep-emerald), #2a6f53);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        /* Glass Effect */
        .glass-effect {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border-subtle);
        }
        
        /* Typography */
        h1, h2, h3, h4, h5, h6 {
          letter-spacing: -0.028em;
          line-height: 1.15;
          font-weight: 400;
          color: var(--charcoal);
        }
        
        .font-display {
          font-family: 'Inter', sans-serif;
          font-weight: 300;
          letter-spacing: -0.04em;
        }
        
        /* Interactions */
        .btn-primary {
          background-color: var(--deep-emerald);
          color: white;
          padding: 14px 28px;
          border-radius: 10px;
          font-weight: 500;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 12px var(--shadow-elegant);
          border: none;
        }
        
        .btn-primary:hover {
          transform: translateY(-2px);
          background-color: #0c2d22;
          box-shadow: 0 8px 24px var(--shadow-hover);
        }
        
        .btn-secondary {
          background: transparent;
          color: var(--deep-emerald);
          border: 1px solid var(--deep-emerald);
          padding: 13px 28px;
          border-radius: 10px;
          font-weight: 500;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .btn-secondary:hover {
          background: var(--deep-emerald);
          color: white;
          transform: translateY(-2px);
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        .text-balance {
          text-wrap: balance;
        }
        
        .hover-lift {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .hover-lift:hover {
          transform: translateY(-6px);
        }
      `}</style>
      
      {children}
    </div>
  );
}
