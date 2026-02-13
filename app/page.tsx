import Experience from "@/components/Experience";

export default function Page() {
  return (
    <div className="flex flex-col">
      <Experience />
      <div className="vignette" />
      <div className="ambient-glow" />

      {/* Landing Viewport (3D Scene Only) */}
      <section id="desk-view" className="h-screen w-full flex items-end justify-center pb-16 pointer-events-none">
        <div className="animate-bounce flex flex-col items-center gap-3 text-[#8b6f47]/60">
          <span className="text-xs font-black uppercase tracking-[0.3em]">Explore Workspace</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Hero Section */}
      <section id="hero" className="relative flex items-center pt-24 md:pt-0">
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
              <a href="#projects" className="btn-primary group">
                <span>View Projects</span>
                <svg className="w-5 h-5 inline-block ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a href="#contact" className="px-8 py-4 rounded-xl font-bold text-lg border-2 border-[#8b6f47] text-[#6b5536] hover:bg-[#8b6f47] hover:text-white transition-all hover:scale-105 active:scale-95">
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative">
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
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${p.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
                
                <div className="relative">
                  {/* Project preview placeholder */}
                  <div className="h-48 bg-gradient-to-br from-[#e8dcc8] to-[#d4c4a8] rounded-xl mb-6 overflow-hidden relative group-hover:scale-105 transition-transform duration-500">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-[#8b6f47]/30 font-mono text-sm font-bold tracking-wider">
                        PROJECT PREVIEW
                      </div>
                    </div>
                    {/* Decorative elements */}
                    <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-[#8b6f47]/20" />
                    <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-[#8b6f47]/20" />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-[#4a3a28] group-hover:gradient-text transition-all">
                    {p.title}
                  </h3>
                  <p className="text-[#8b6f47]/80 text-sm mb-6 leading-relaxed">
                    {p.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {p.tech.map(t => (
                      <span key={t} className="skill-badge text-xs">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative overflow-hidden bg-gradient-to-b from-transparent to-[#f5ede0]/30">
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
              { 
                category: "Frontend", 
                items: ["React", "Next.js", "TypeScript", "Three.js", "Tailwind CSS"],
                icon: "🎨"
              },
              { 
                category: "Backend", 
                items: ["Node.js", "Python", "Go", "PostgreSQL", "Firebase"],
                icon: "⚙️"
              },
              { 
                category: "DevOps", 
                items: ["Git", "Docker", "AWS", "Vercel", "CI/CD"],
                icon: "🚀"
              },
              { 
                category: "Design", 
                items: ["Figma", "WebGL", "Animation", "UX/UI", "Responsive"],
                icon: "✨"
              }
            ].map((s, i) => (
              <div key={i} className="glass-card group hover:border-[#8b6f47] transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">{s.icon}</span>
                  <h3 className="text-xs font-black text-[#8b6f47] uppercase tracking-[0.2em]">
                    {s.category}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {s.items.map((item, idx) => (
                    <li 
                      key={item} 
                      className="text-[#6b5536] font-semibold flex items-center gap-3 opacity-0 animate-in fade-in slide-in-from-left-2"
                      style={{ animationDelay: `${idx * 100}ms`, animationFillMode: 'forwards' }}
                    >
                      <span className="w-1.5 h-1.5 bg-gradient-to-r from-[#8b6f47] to-[#a68a64] rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-4xl md:text-5xl font-black mb-8 title-accent tracking-tighter text-[#4a3a28]">
                Beyond the Code
              </h2>
              <div className="space-y-6 text-lg text-[#6b5536] leading-relaxed">
                <p>
                  I&apos;m a Full-Stack Developer passionate about transforming complex challenges 
                  into elegant, scalable solutions. With expertise spanning modern web technologies 
                  and a keen eye for design, I create applications that are both powerful and intuitive.
                </p>
                <p>
                  Beyond development, I&apos;m an advocate for clean code, performance optimization, 
                  and user-centered design. I believe the best solutions emerge at the intersection 
                  of technical excellence and creative thinking.
                </p>
                <p className="text-[#8b6f47] italic">
                  When not coding, you&apos;ll find me exploring creative technologies, contributing 
                  to open source, or staying curious about the next wave of innovation.
                </p>
              </div>

              <div className="mt-12 grid grid-cols-2 gap-8">
                <div className="glass-card text-center hover:scale-105 transition-transform">
                  <div className="text-5xl font-black gradient-text mb-2 tracking-tighter">5+</div>
                  <div className="text-sm text-[#8b6f47] font-bold uppercase tracking-widest">Years Exp.</div>
                </div>
                <div className="glass-card text-center hover:scale-105 transition-transform">
                  <div className="text-5xl font-black gradient-text mb-2 tracking-tighter">50+</div>
                  <div className="text-sm text-[#8b6f47] font-bold uppercase tracking-widest">Projects</div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative group">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#8b6f47]/20 to-[#a68a64]/20 rounded-3xl blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Image container */}
                <div className="relative aspect-square bg-gradient-to-br from-[#e8dcc8] to-[#d4c4a8] rounded-3xl border-2 border-[#8b6f47]/20 p-8 flex items-center justify-center overflow-hidden group-hover:border-[#8b6f47]/40 transition-all duration-500">
                  <div className="text-[#8b6f47]/40 font-mono text-xl font-bold tracking-wider">
                    BIPIN SAPKOTA
                  </div>
                  
                  {/* Decorative corners */}
                  <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-[#8b6f47]/30 group-hover:border-[#8b6f47]/60 transition-colors" />
                  <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-[#8b6f47]/30 group-hover:border-[#8b6f47]/60 transition-colors" />
                  
                  {/* Animated background pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#8b6f47_1px,_transparent_1px)] bg-[length:20px_20px]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative bg-gradient-to-b from-transparent to-[#f5ede0]/50">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-[#4a3a28] tracking-tighter">
              Let&apos;s Create Together
            </h2>
            <p className="text-xl text-[#6b5536] max-w-2xl mx-auto font-medium leading-relaxed">
              Have a project in mind or just want to chat? I&apos;m always open to discussing 
              new opportunities, creative ideas, or potential collaborations.
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <div className="glass-card mb-12">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-[0.2em] text-[#8b6f47] mb-3">
                      Your Name
                    </label>
                    <input 
                      type="text" 
                      className="w-full bg-white/80 border-2 border-[#e8dcc8] rounded-xl px-4 py-3 focus:border-[#8b6f47] focus:ring-2 focus:ring-[#8b6f47]/20 outline-none transition-all text-[#4a3a28] placeholder:text-[#8b6f47]/40" 
                      placeholder="John Doe" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-[0.2em] text-[#8b6f47] mb-3">
                      Email Address
                    </label>
                    <input 
                      type="email" 
                      className="w-full bg-white/80 border-2 border-[#e8dcc8] rounded-xl px-4 py-3 focus:border-[#8b6f47] focus:ring-2 focus:ring-[#8b6f47]/20 outline-none transition-all text-[#4a3a28] placeholder:text-[#8b6f47]/40" 
                      placeholder="john@example.com" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-[0.2em] text-[#8b6f47] mb-3">
                    Your Message
                  </label>
                  <textarea 
                    className="w-full bg-white/80 border-2 border-[#e8dcc8] rounded-xl px-4 py-3 focus:border-[#8b6f47] focus:ring-2 focus:ring-[#8b6f47]/20 outline-none transition-all h-40 text-[#4a3a28] resize-none placeholder:text-[#8b6f47]/40" 
                    placeholder="Tell me about your project, ideas, or just say hello..."
                  />
                </div>
                <button className="btn-primary w-full group">
                  <span>Send Message</span>
                  <svg className="w-5 h-5 inline-block ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </form>
            </div>
            
            {/* Social Links */}
            <div className="flex justify-center gap-8 flex-wrap">
              {[
                { name: 'GitHub', icon: '⚡' },
                { name: 'LinkedIn', icon: '💼' },
                { name: 'Twitter', icon: '🐦' },
                { name: 'Resume', icon: '📄' }
              ].map(link => (
                <a 
                  key={link.name} 
                  href="#" 
                  className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#8b6f47] hover:text-[#6b5536] transition-colors"
                >
                  <span className="text-xl group-hover:scale-110 transition-transform">{link.icon}</span>
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}