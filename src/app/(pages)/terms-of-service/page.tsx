// app/terms-of-service/page.tsx
import { FileText, CheckCircle2, AlertTriangle, CreditCard, XCircle, Scale, Globe } from 'lucide-react';

export default function TermsOfServicePage() {
    const terms = [
        {
            icon: <CheckCircle2 className="w-6 h-6" />,
            title: '1. Acceptance of Terms',
            content: 'By accessing or using WorkDock, you agree to be bound by these Terms of Service. If you do not agree, please do not use our platform. These terms apply to all users, including guests, registered members, and workspace hosts.'
        },
        {
            icon: <FileText className="w-6 h-6" />,
            title: '2. Use of Service',
            content: 'You agree to use WorkDock only for lawful purposes and in accordance with these terms. You must not use the platform to book spaces for unauthorized activities, misrepresent your identity, or interfere with the platform\'s operation.'
        },
        {
            icon: <CreditCard className="w-6 h-6" />,
            title: '3. Payments & Billing',
            content: 'All bookings require valid payment information. Charges are processed at the time of booking. Prices are listed in USD unless otherwise specified. We reserve the right to update pricing with reasonable notice to users.'
        },
        {
            icon: <XCircle className="w-6 h-6" />,
            title: '4. Cancellations & Refunds',
            content: 'Cancellation policies vary by workspace and are displayed at booking. Generally, cancellations made 24+ hours in advance receive a full refund. Late cancellations or no-shows are subject to the host\'s specific policy.'
        },
        {
            icon: <AlertTriangle className="w-6 h-6" />,
            title: '5. User Responsibilities',
            content: 'Users are responsible for maintaining the security of their accounts, reviewing booking details before confirmation, and respecting workspace rules. Damage to property may result in additional charges.'
        },
        {
            icon: <Scale className="w-6 h-6" />,
            title: '6. Limitation of Liability',
            content: 'WorkDock acts as a marketplace connecting users with workspace hosts. We are not liable for disputes between users and hosts, property damage, or personal injury occurring at listed spaces beyond our platform facilitation role.'
        },
        {
            icon: <Globe className="w-6 h-6" />,
            title: '7. Governing Law',
            content: 'These terms are governed by the laws of the State of California, USA. Any disputes arising from these terms shall be resolved in the courts of San Francisco County, California.'
        }
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
            {/* Hero */}
            <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-125 bg-linear-to-r from-purple-200/40 via-pink-200/40 to-orange-200/40 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-orange-900/20 rounded-full blur-3xl" />
                </div>
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800 text-purple-600 dark:text-purple-400 text-sm font-medium mb-6">
                        <FileText className="w-4 h-4" />
                        Legal Agreement
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
                        Terms of <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">Service</span>
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Last updated: July 15, 2026. Please read these terms carefully before using WorkDock.
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
                <div className="space-y-6">
                    {terms.map((term, idx) => (
                        <div key={idx} className="flex gap-5 p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-purple-200 dark:hover:border-purple-800 transition-colors">
                            <div className="shrink-0 w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                                {term.icon}
                            </div>
                            <div>
                                <h2 className="text-xl font-bold mb-3">{term.title}</h2>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{term.content}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Agreement Banner */}
                <div className="mt-12 p-8 rounded-2xl bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-center">
                    <h3 className="text-xl font-bold mb-2">By using WorkDock, you acknowledge</h3>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        that you have read, understood, and agree to be bound by these Terms of Service. If you have any questions, please contact our legal team.
                    </p>
                </div>
            </div>
        </div>
    );
}