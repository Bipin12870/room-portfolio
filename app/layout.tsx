import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Bipin Sapkota | Interactive Portfolio",
  description: "An interactive 3D portfolio experience showcasing projects, skills, and expertise. Built with Next.js, Three.js, and React Three Fiber.",
  keywords: ["portfolio", "web developer", "3D portfolio", "Bipin Sapkota"],
  authors: [{ name: "Bipin Sapkota" }],
  openGraph: {
    title: "Bipin Sapkota | Interactive Portfolio",
    description: "Explore my interactive 3D portfolio showcasing projects and skills",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        <ClientNavigation />
        
        {/* Main Content */}
        <main className="relative">
          {children}
        </main>

        {/* Footer */}
        <footer className="relative z-10 py-16 border-t border-[#d4c4a8]/20 bg-gradient-to-b from-transparent to-[#f8f6f0]/50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              {/* Footer Left */}
              <div className="text-center md:text-left">
                <p className="font-bold text-lg text-[#6b5536] mb-1">Bipin Sapkota</p>
                <p className="text-sm text-[#8b6f47]/70">
                  Building digital experiences with passion
                </p>
              </div>

              {/* Footer Links */}
              <div className="flex gap-6 text-sm">
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#8b6f47] hover:text-[#6b5536] transition-colors"
                >
                  GitHub
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#8b6f47] hover:text-[#6b5536] transition-colors"
                >
                  LinkedIn
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#8b6f47] hover:text-[#6b5536] transition-colors"
                >
                  Twitter
                </a>
              </div>
            </div>

            {/* Copyright */}
            <div className="mt-8 pt-8 border-t border-[#d4c4a8]/20 text-center">
              <p className="text-sm text-[#8b6f47]/60">
                © {new Date().getFullYear()} Bipin Sapkota. Crafted with Next.js, Three.js & Tailwind CSS.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

// Client Navigation Component (inline to avoid import issues)
function ClientNavigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-[#f8f6f0]/95 to-[#f8f6f0]/85 backdrop-blur-xl border-b border-[#d4c4a8]/20 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a 
          href="#hero" 
          className="font-bold text-xl tracking-tighter text-[#6b5536] hover:text-[#8b6f47] transition-colors relative group"
        >
          BIPIN
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#8b6f47] to-[#a68a64] group-hover:w-full transition-all duration-300"></span>
        </a>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#projects" className="text-sm font-medium text-[#6b5536] hover:text-[#8b6f47] transition-colors relative group">
            Projects
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#8b6f47] group-hover:w-full transition-all duration-300"></span>
          </a>
          <a href="#skills" className="text-sm font-medium text-[#6b5536] hover:text-[#8b6f47] transition-colors relative group">
            Skills
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#8b6f47] group-hover:w-full transition-all duration-300"></span>
          </a>
          <a href="#about" className="text-sm font-medium text-[#6b5536] hover:text-[#8b6f47] transition-colors relative group">
            About
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#8b6f47] group-hover:w-full transition-all duration-300"></span>
          </a>
          <a
            href="#contact"
            className="px-5 py-2 bg-gradient-to-r from-[#8b6f47] to-[#a68a64] text-white text-sm font-medium rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </nav>
  );
}