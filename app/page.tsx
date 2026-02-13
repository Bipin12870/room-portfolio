"use client";

import { useState } from "react";
import Experience from "@/components/Experience";


export default function Page() {
  const [focusTarget, setFocusTarget] = useState<string | null>(null);
  const [showContent, setShowContent] = useState(false);


  const handleSelect = (id: string) => {
    setFocusTarget(id);
    setShowContent(false);
  };

  const handleReset = () => {
    setFocusTarget(null);
    setShowContent(false);
  };

  const handleCardClick = () => {
    setShowContent(true);

    // Smooth scroll to the target after a tiny delay
    setTimeout(() => {
      const element = document.getElementById(focusTarget || "");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <div className={`flex flex-col min-h-screen ${focusTarget && !showContent ? "overflow-hidden" : ""}`}>
      <Experience
        focusTarget={focusTarget}
        onReset={handleReset}
        onSelect={handleSelect}
        onCardClick={handleCardClick}
      />

      <div className="vignette" />
      <div className="ambient-glow" />

      {/* Landing Viewport (3D Scene Only) */}
      <section id="desk-view" className="h-screen w-full pointer-events-none" />

      {/* Hero Section */}
      <section
        id="hero"
        className={`relative flex items-center pt-24 md:pt-0 transition-opacity duration-1000 ${focusTarget === 'hero' && showContent ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none fixed inset-0'
          }`}
      >
        <div className="section-container">
          <div className="max-w-4xl">
            <div className="mb-6 inline-block">
              <span className="text-sm font-bold uppercase tracking-[0.3em] text-[#8b6f47]/70 bg-[#e8dcc8]/40 px-4 py-2 rounded-full">
                Full-Stack Developer
              </span>
            </div>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-8 leading-[0.9] text-[#4a3a28] animate-in fade-in slide-in-from-bottom-4 duration-1000">
              BUILD.<br />
              <span className="gradient-text">
                INNOVATE.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-[#6b5536] font-medium max-w-2xl mb-12 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
              Crafting elegant digital experiences that merge cutting-edge technology
              with thoughtful design. Let&apos;s build something extraordinary together.
            </p>
            <div className="flex flex-wrap gap-6 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
              <button
                onClick={() => setFocusTarget('projects')}
                className="btn-primary group"
              >
                <span>View Projects</span>
                <svg className="w-5 h-5 inline-block ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              <button
                onClick={() => setFocusTarget('contact')}
                className="px-8 py-4 rounded-xl font-bold text-lg border-2 border-[#8b6f47] text-[#6b5536] hover:bg-[#8b6f47] hover:text-white transition-all hover:scale-105 active:scale-95"
              >
                Get in Touch
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className={`relative transition-opacity duration-1000 ${focusTarget === 'projects' && showContent ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none fixed inset-0'
          }`}
      >
        <div className="section-container">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4 title-accent tracking-tighter text-[#4a3a28]">
              Featured Work
            </h2>
            <p className="text-lg text-[#8b6f47] max-w-2xl">
              A selection of projects showcasing innovation, performance, and attention to detail.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Personal Loan Tracker PWA",
                desc: "Offline-first progressive web app built with Next.js and Firebase, featuring real-time sync and optimistic UI updates for seamless debt tracking.",
                tech: ["Next.js", "Firebase", "PWA", "Tailwind"],
                color: "from-amber-500/10 to-orange-500/10"
              },
              {
                title: "Roster Management System",
                desc: "Enterprise dashboard for workforce management with automated scheduling, availability tracking, and intelligent shift optimization algorithms.",
                tech: ["React", "Supabase", "TypeScript", "Node.js"],
                color: "from-blue-500/10 to-indigo-500/10"
              },
              {
                title: "AI Portfolio Engine",
                desc: "Procedural generation framework for creating dynamic, interactive 3D portfolios powered by AI-driven content adaptation.",
                tech: ["Three.js", "React Three Fiber", "AI", "WebGL"],
                color: "from-purple-500/10 to-pink-500/10"
              },
              {
                title: "E-Commerce Platform",
                desc: "High-performance storefront with immersive 3D product previews, seamless checkout flow, and real-time inventory management.",
                tech: ["Next.js", "Shopify", "Tailwind CSS", "Framer Motion"],
                color: "from-green-500/10 to-emerald-500/10"
              }
            ].map((p, i) => (
              <div key={i} className="glass-card group relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${p.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
                <div className="relative">
                  <div className="h-48 bg-gradient-to-br from-[#e8dcc8] to-[#d4c4a8] rounded-xl mb-6 overflow-hidden relative group-hover:scale-105 transition-transform duration-500">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-[#8b6f47]/30 font-mono text-sm font-bold tracking-wider">PROJECT PREVIEW</div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-[#4a3a28]">{p.title}</h3>
                  <p className="text-[#8b6f47]/80 text-sm mb-6 leading-relaxed">{p.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.tech.map(t => <span key={t} className="skill-badge text-xs">{t}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button onClick={handleReset} className="mt-12 text-[#8b6f47] font-bold hover:text-[#4a3a28] transition-colors flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Desk
          </button>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className={`relative transition-opacity duration-1000 ${focusTarget === 'skills' && showContent ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none fixed inset-0'
          }`}
      >
        <div className="section-container">
          <div className="mb-16 text-center">
            <h2 className="text-4xl md:text-5xl font-black mb-4 title-accent tracking-tighter text-[#4a3a28]">
              Technical Expertise
            </h2>
            <p className="text-lg text-[#8b6f47] max-w-2xl mx-auto">
              A comprehensive toolkit for building modern, scalable applications.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Three.js", "Tailwind CSS"], icon: "🎨" },
              { category: "Backend", items: ["Node.js", "Python", "Go", "PostgreSQL", "Firebase"], icon: "⚙️" },
              { category: "DevOps", items: ["Git", "Docker", "AWS", "Vercel", "CI/CD"], icon: "🚀" },
              { category: "Design", items: ["Figma", "WebGL", "Animation", "UX/UI", "Responsive"], icon: "✨" }
            ].map((s, i) => (
              <div key={i} className="glass-card group">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">{s.icon}</span>
                  <h3 className="text-xs font-black text-[#8b6f47] uppercase tracking-[0.2em]">{s.category}</h3>
                </div>
                <ul className="space-y-3">
                  {s.items.map(item => (
                    <li key={item} className="text-[#6b5536] font-semibold flex items-center gap-3">
                      <span className="w-1.5 h-1.5 bg-[#8b6f47] rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <button onClick={handleReset} className="mt-12 text-[#8b6f47] font-bold hover:text-[#4a3a28] transition-colors flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Desk
          </button>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className={`relative transition-opacity duration-1000 ${focusTarget === 'about' && showContent ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none fixed inset-0'
          }`}
      >
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-8 title-accent tracking-tighter text-[#4a3a28]">
                Beyond the Code
              </h2>
              <div className="space-y-6 text-lg text-[#6b5536] leading-relaxed">
                <p>I&apos;m a Full-Stack Developer passionate about transforming complex challenges into elegant, scalable solutions.</p>
                <p>Beyond development, I&apos;m an advocate for clean code, performance optimization, and user-centered design.</p>
              </div>
              <button onClick={handleReset} className="mt-12 text-[#8b6f47] font-bold hover:text-[#4a3a28] transition-colors flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Desk
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className={`relative transition-opacity duration-1000 ${focusTarget === 'contact' && showContent ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none fixed inset-0'
          }`}
      >
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-[#4a3a28] tracking-tighter">Let&apos;s Create Together</h2>
            <p className="text-xl text-[#6b5536] max-w-2xl mx-auto font-medium leading-relaxed">
              Have a project in mind or just want to chat? I&apos;m always open to discussing new opportunities.
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <div className="glass-card mb-8">
              <form className="space-y-6">
                <input className="w-full bg-white/80 border-2 border-[#e8dcc8] rounded-xl px-4 py-3 outline-none" placeholder="Your Name" />
                <textarea className="w-full bg-white/80 border-2 border-[#e8dcc8] rounded-xl px-4 py-3 outline-none h-32" placeholder="Your Message" />
                <button className="btn-primary w-full">Send Message</button>
              </form>
            </div>
            <button onClick={handleReset} className="text-[#8b6f47] font-bold hover:text-[#4a3a28] transition-colors flex items-center gap-2 mx-auto">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Desk
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}