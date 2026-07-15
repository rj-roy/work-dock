import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const footerLinks = [
        { name: 'Privacy Policy', href: '/privacy-policy' },
        { name: 'Terms of Service', href: '/terms-of-service' },
        { name: 'Careers', href: '/careers' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <footer className="bg-linear-to-b from-indigo-50/50 to-white dark:from-gray-900 dark:to-gray-800 border-t border-indigo-100 dark:border-gray-700 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="py-8 md:py-12">
                    {/* Main Footer Content */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        {/* Brand & Copyright */}
                        <div className="flex flex-col items-center md:items-start gap-2">
                            <Link href="/" className="group">
                                <h2 className="text-2xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent group-hover:from-indigo-700 group-hover:to-purple-700 dark:group-hover:from-indigo-300 dark:group-hover:to-purple-300 transition-all">
                                    WorkDock
                                </h2>
                            </Link>
                            <p className="text-sm text-gray-500 dark:text-gray-400 text-center md:text-left">
                                © {currentYear} WorkDock Inc. All rights reserved.
                            </p>
                        </div>

                        {/* Navigation Links */}
                        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3" aria-label="Footer navigation">
                            {footerLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 relative group"
                                >
                                    {link.name}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 dark:bg-indigo-400 transition-all duration-200 group-hover:w-full" />
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Bottom Bar */}
                    <div className="mt-8 pt-6 border-t border-indigo-100 dark:border-gray-700">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500 dark:text-gray-400">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span>All systems operational</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <Link href="/status" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                    System Status
                                </Link>
                                <span className="hidden md:inline">•</span>
                                <Link href="/security" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                    Security
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}