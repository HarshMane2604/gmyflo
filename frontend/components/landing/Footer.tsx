import Link from "next/link";

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-[#0B0B0B] border-t border-gray-200 dark:border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2">
            <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white tracking-tighter flex items-center gap-2 mb-6">
              <div className="w-6 h-6 rounded bg-[#FF2D2D]" />
              GymFlo
            </Link>
            <p className="text-gray-600 dark:text-[#BFBFBF] max-w-sm mb-8">
              The modern operating system for premium fitness centers and independent trainers. Manage everything in one place.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white dark:bg-white/5 flex items-center justify-center text-gray-600 dark:text-[#BFBFBF] hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/10 transition-colors shadow-sm dark:shadow-none border border-gray-200 dark:border-transparent">
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white dark:bg-white/5 flex items-center justify-center text-gray-600 dark:text-[#BFBFBF] hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/10 transition-colors shadow-sm dark:shadow-none border border-gray-200 dark:border-transparent">
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white dark:bg-white/5 flex items-center justify-center text-gray-600 dark:text-[#BFBFBF] hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/10 transition-colors shadow-sm dark:shadow-none border border-gray-200 dark:border-transparent">
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white dark:bg-white/5 flex items-center justify-center text-gray-600 dark:text-[#BFBFBF] hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/10 transition-colors shadow-sm dark:shadow-none border border-gray-200 dark:border-transparent">
                <FacebookIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-gray-900 dark:text-white font-semibold mb-6">Product</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="text-gray-600 dark:text-[#BFBFBF] hover:text-gray-900 dark:hover:text-white transition-colors">Features</Link></li>
              <li><Link href="#" className="text-gray-600 dark:text-[#BFBFBF] hover:text-gray-900 dark:hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="#" className="text-gray-600 dark:text-[#BFBFBF] hover:text-gray-900 dark:hover:text-white transition-colors">Hardware</Link></li>
              <li><Link href="#" className="text-gray-600 dark:text-[#BFBFBF] hover:text-gray-900 dark:hover:text-white transition-colors">Integrations</Link></li>
              <li><Link href="#" className="text-gray-600 dark:text-[#BFBFBF] hover:text-gray-900 dark:hover:text-white transition-colors">Changelog</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-gray-900 dark:text-white font-semibold mb-6">Company</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="text-gray-600 dark:text-[#BFBFBF] hover:text-gray-900 dark:hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="#" className="text-gray-600 dark:text-[#BFBFBF] hover:text-gray-900 dark:hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="#" className="text-gray-600 dark:text-[#BFBFBF] hover:text-gray-900 dark:hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="#" className="text-gray-600 dark:text-[#BFBFBF] hover:text-gray-900 dark:hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-gray-900 dark:text-white font-semibold mb-6">Legal</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="text-gray-600 dark:text-[#BFBFBF] hover:text-gray-900 dark:hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="text-gray-600 dark:text-[#BFBFBF] hover:text-gray-900 dark:hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="text-gray-600 dark:text-[#BFBFBF] hover:text-gray-900 dark:hover:text-white transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-200 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 dark:text-[#BFBFBF] text-sm">
            © {new Date().getFullYear()} GymFlo Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-[#BFBFBF]">
            <span>Designed in California</span>
          </div>
        </div>
        
      </div>
    </footer>
  );
}
