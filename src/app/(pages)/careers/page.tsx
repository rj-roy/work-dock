import { Briefcase, MapPin, Clock, ArrowRight, Heart, Zap, Users, Coffee, Globe, CheckCircle2 } from 'lucide-react';

export default function CareersPage() {
    const benefits = [
        { icon: <Globe className="w-6 h-6" />, title: 'Remote First', desc: 'Work from anywhere in the world.' },
        { icon: <Heart className="w-6 h-6" />, title: 'Health & Wellness', desc: 'Comprehensive medical coverage.' },
        { icon: <Zap className="w-6 h-6" />, title: 'Unlimited PTO', desc: 'Take time off when you need it.' },
        { icon: <Users className="w-6 h-6" />, title: 'Team Retreats', desc: 'Annual global team gatherings.' },
        { icon: <Coffee className="w-6 h-6" />, title: 'Home Office Stipend', desc: '$1,000 yearly setup budget.' },
        { icon: <Briefcase className="w-6 h-6" />, title: 'Learning Budget', desc: '$2,000 for courses & conferences.' }
    ];

    const openings = [
        { title: 'Senior Frontend Engineer', dept: 'Engineering', location: 'Remote (US/EU)', type: 'Full-time' },
        { title: 'Product Designer', dept: 'Design', location: 'Remote (Global)', type: 'Full-time' },
        { title: 'Head of Host Success', dept: 'Operations', location: 'San Francisco, CA', type: 'Full-time' },
        { title: 'Growth Marketing Manager', dept: 'Marketing', location: 'Remote (US)', type: 'Full-time' },
        { title: 'Customer Support Lead', dept: 'Support', location: 'Remote (Global)', type: 'Full-time' }
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
            {/* Hero */}
            <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-125 bg-linear-to-r from-green-200/40 via-teal-200/40 to-cyan-200/40 dark:from-green-900/20 dark:via-teal-900/20 dark:to-cyan-900/20 rounded-full blur-3xl" />
                </div>
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-600 dark:text-green-400 text-sm font-medium mb-6">
                        <Briefcase className="w-4 h-4" />
                        Join Our Team
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
                        Build the future of <span className="text-transparent bg-clip-text bg-linear-to-r from-green-600 to-teal-600 dark:from-green-400 dark:to-teal-400">work</span>
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        We&apos;re a remote-first team on a mission to help people find their perfect workspace. Join us in redefining how the world works.
                    </p>
                </div>
            </div>

            {/* Benefits */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <h2 className="text-3xl font-bold text-center mb-12">Why WorkDock?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {benefits.map((benefit, idx) => (
                        <div key={idx} className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
                            <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mb-4">
                                {benefit.icon}
                            </div>
                            <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">{benefit.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Open Positions */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
                <h2 className="text-3xl font-bold text-center mb-12">Open Positions</h2>
                <div className="space-y-4">
                    {openings.map((job, idx) => (
                        <div key={idx} className="group flex flex-col sm:flex-row sm:items-center justify-between p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-green-300 dark:hover:border-green-700 transition-colors cursor-pointer">
                            <div className="mb-4 sm:mb-0">
                                <h3 className="text-lg font-bold group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">{job.title}</h3>
                                <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-600 dark:text-gray-400">
                                    <span className="flex items-center gap-1"><Briefcase className="w-4 h-4" />{job.dept}</span>
                                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{job.location}</span>
                                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{job.type}</span>
                                </div>
                            </div>
                            <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-colors">
                                Apply <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>

                {/* No fit CTA */}
                <div className="mt-12 p-8 rounded-2xl bg-linear-to-br from-green-600 to-teal-600 text-white text-center">
                    <CheckCircle2 className="w-10 h-10 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Don&apos;t see your role?</h3>
                    <p className="text-green-100 mb-6 max-w-xl mx-auto">We&apos;re always looking for talented people. Send us your resume and we&apos;ll keep you in mind for future opportunities.</p>
                    <a href="mailto:careers@workdock.com" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-green-600 font-semibold rounded-xl hover:bg-green-50 transition-colors">
                        Send Resume
                    </a>
                </div>
            </div>
        </div>
    );
}