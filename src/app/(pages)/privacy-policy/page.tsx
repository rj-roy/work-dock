import { Shield, Eye, Database, Share2, Lock, Cookie, UserCheck, Mail } from 'lucide-react';

export default function PrivacyPolicyPage() {
    const sections = [
        {
            icon: <Database className="w-6 h-6" />,
            title: 'Information We Collect',
            content: 'We collect information you provide directly, such as your name, email, and payment details when creating an account or booking a space. We also automatically collect usage data, including IP addresses, browser types, and pages visited to improve our services.'
        },
        {
            icon: <Eye className="w-6 h-6" />,
            title: 'How We Use Your Information',
            content: 'Your data is used to process bookings, manage your account, send important updates, and personalize your experience. We may also use anonymized data for analytics to improve platform performance and develop new features.'
        },
        {
            icon: <Share2 className="w-6 h-6" />,
            title: 'Data Sharing & Disclosure',
            content: 'We do not sell your personal information. We share data only with workspace hosts (necessary booking details), payment processors, and legal authorities when required by law. All third-party partners are bound by strict confidentiality agreements.'
        },
        {
            icon: <Lock className="w-6 h-6" />,
            title: 'Data Security',
            content: 'We implement industry-standard encryption (SSL/TLS) and secure storage practices to protect your data. While we strive for maximum security, no internet transmission is 100% secure, and we cannot guarantee absolute protection.'
        },
        {
            icon: <Cookie className="w-6 h-6" />,
            title: 'Cookies & Tracking',
            content: 'We use essential cookies for site functionality and analytics cookies to understand user behavior. You can control cookie preferences through your browser settings, though disabling them may affect site performance.'
        },
        {
            icon: <UserCheck className="w-6 h-6" />,
            title: 'Your Rights & Choices',
            content: 'You have the right to access, correct, or delete your personal data at any time. You can also opt out of marketing communications. To exercise these rights, contact our privacy team or use your account settings.'
        }
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
            {/* Hero */}
            <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-125 bg-linear-to-r from-indigo-200/40 via-purple-200/40 to-pink-200/40 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-pink-900/20 rounded-full blur-3xl" />
                </div>
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-6">
                        <Shield className="w-4 h-4" />
                        Legal & Privacy
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
                        Privacy <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">Policy</span>
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Last updated: July 15, 2026. Learn how WorkDock collects, uses, and protects your personal information.
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
                <div className="space-y-8">
                    {sections.map((section, idx) => (
                        <div key={idx} className="flex gap-5 p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
                            <div className="shrink-0 w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                                {section.icon}
                            </div>
                            <div>
                                <h2 className="text-xl font-bold mb-3">{section.title}</h2>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{section.content}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Contact */}
                <div className="mt-12 p-8 rounded-2xl bg-linear-to-br from-indigo-600 to-purple-600 text-white text-center">
                    <Mail className="w-10 h-10 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Questions about your privacy?</h3>
                    <p className="text-indigo-100 mb-6">Our privacy team is here to help. Reach out anytime.</p>
                    <a href="mailto:privacy@workdock.com" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-indigo-50 transition-colors">
                        privacy@workdock.com
                    </a>
                </div>
            </div>
        </div>
    );
}