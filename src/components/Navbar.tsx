import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-[#002815] text-white p-4 shadow-[0_2px_15px_rgba(0,0,0,0.3)] sticky top-0 z-50 border-b border-[#003a1f]">
      <div className="container mx-auto flex justify-between items-center">
        <Link 
          href="/" 
          className="flex items-center"
        >
          <Image
            src="/logo.svg"
            alt="SonDüdük Logo"
            width={150}
            height={150}
            className="transition-all duration-300 hover:brightness-175 hover:contrast-125 hover:saturate-125 hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
            priority
          />
        </Link>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Takım ara..."
              className="w-[200px] px-3 py-1.5 bg-[#003a1f] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00703f] text-white placeholder-gray-300 text-sm border border-[#004e2a]"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <svg
                className="w-4 h-4 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>

          <button className="w-10 h-10 rounded-full bg-[#003a1f] hover:bg-[#004e2a] transition-colors duration-200 flex items-center justify-center border border-[#004e2a]">
            <svg 
              className="w-6 h-6 text-gray-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
} 