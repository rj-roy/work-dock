'use client';

import { BluetoothOff, BriefcaseBusiness, CheckCircle, Clock, FileQuestion, LocationEditIcon, Mail, Phone, Send } from 'lucide-react';
import { useState } from 'react';


export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setSubmitSuccess(true);

        // Reset after 3 seconds
        setTimeout(() => {
            setSubmitSuccess(false);
            setFormData({ name: '', email: '', subject: '', message: '' });
        }, 3000);
    };

    const contactInfo = [
        {
            icon: <Mail className="w-6 h-6" />,
            title: 'Email Us',
            description: 'Our friendly team is here to help.',
            contact: 'support@workdock.com',
            color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
        },
        {
            icon: <Phone className="w-6 h-6" />,
            title: 'Call Us',
            description: 'Mon-Fri from 8am to 5pm.',
            contact: '+1 (555) 123-4567',
            color: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400'
        },
        {
            icon: <LocationEditIcon className="w-6 h-6" />,
            title: 'Visit Us',
            description: 'Come say hello at our HQ.',
            contact: '123 Innovation Dr, San Francisco, CA 94103',
            color: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400'
        },
        {
            icon: <Clock className="w-6 h-6" />,
            title: 'Working Hours',
            description: 'We are available 24/7 online.',
            contact: 'Mon - Fri: 9am - 6pm PST',
            color: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400'
        }
    ];

    const faqs = [
        {
            question: 'How do I book a workspace?',
            answer: 'Simply browse our available spaces, select your preferred location and time, and complete the booking process. You\'ll receive a confirmation email immediately.'
        },
        {
            question: 'Can I cancel or modify my booking?',
            answer: 'Yes! You can cancel or modify your booking up to 24 hours before your scheduled time for a full refund. Contact our support team for assistance.'
        },
        {
            question: 'What payment methods do you accept?',
            answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay. All payments are secured with industry-standard encryption.'
        },
        {
            question: 'How do I become a host?',
            answer: 'If you have a workspace to list, click on "List Your Space" in the navigation menu. Fill out the listing form and our team will review and approve your space within 48 hours.'
        }
    ];

    return (
        <div className="min-h-screen bg-linear-to-b from-indigo-50/50 via-white to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 transition-colors duration-300">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-125 bg-linear-to-r from-indigo-200/40 via-purple-200/40 to-pink-200/40 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-pink-900/20 rounded-full blur-3xl" />
                </div>

                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-6">
                        <BluetoothOff className="w-4 h-4" />
                        We&apos;re here to help
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
                        Get in{' '}
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                            touch
                        </span>
                    </h1>

                    <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        Have a question about a workspace, need help with a booking, or want to list your property?
                        Our team is here to help you every step of the way.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
                    {/* Contact Information */}
                    <div className="lg:col-span-1 space-y-4">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                            Contact Information
                        </h2>
                        {contactInfo.map((info, index) => (
                            <div
                                key={index}
                                className="flex items-start gap-4 p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors shadow-sm"
                            >
                                <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${info.color}`}>
                                    {info.icon}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                                        {info.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                                        {info.description}
                                    </p>
                                    <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                                        {info.contact}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 border border-gray-100 dark:border-gray-700 shadow-xl">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                Send us a message
                            </h2>

                            {submitSuccess ? (
                                <div className="flex flex-col items-center justify-center h-full min-h-100 p-8 rounded-2xl bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 text-center animate-in fade-in duration-300">
                                    <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                                        <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                        Message Sent!
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 max-w-md">
                                        Thank you for reaching out. We&apos;ve received your message and will get back to you within 24 hours.
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                placeholder="John Doe"
                                                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 text-gray-900 dark:text-white placeholder-gray-400 transition-colors"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                placeholder="john@example.com"
                                                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 text-gray-900 dark:text-white placeholder-gray-400 transition-colors"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Subject
                                        </label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                            placeholder="How can we help you?"
                                            className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 text-gray-900 dark:text-white placeholder-gray-400 transition-colors"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Message
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows={5}
                                            placeholder="Tell us more about your inquiry..."
                                            className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 text-gray-900 dark:text-white placeholder-gray-400 transition-colors resize-none"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-indigo-600/20 dark:shadow-indigo-600/30 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-5 h-5" />
                                                Send Message
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 mb-4">
                            <FileQuestion className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            Quick answers to common questions about WorkDock
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-start gap-3">
                                    <BriefcaseBusiness className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                                    {faq.question}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {faq.answer}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}