'use client';
import { useState } from 'react';
import { Info, CreditCard, MapPin, Users, Upload, Check } from 'lucide-react';
import BasicInfo from './BasicInfo';
import PricingCapacity from './PricingCapicity';
import Location from './Location';
import Amenities from './Amenities';
import Media from './Media';

interface FormData {
    title: string;
    shortDescription: string;
    fullDescription: string;
    category: 'private-office' | 'hot-desk' | 'meeting-room';
    capacity: number;
    pricePerDay: number;
    pricePerMonth: number;
    city: string;
    address: string;
    amenities: string[];
}

const SECTIONS = [
    { title: 'Basic Info', icon: Info },
    { title: 'Pricing & Capacity', icon: CreditCard },
    { title: 'Location', icon: MapPin },
    { title: 'Amenities', icon: Users },
    { title: 'Media', icon: Upload },
];

export default function ListNewSpace() {
    const [activeSection, setActiveSection] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imageUrls, setImageUrls] = useState<string[]>([]);

    const [formData, setFormData] = useState<FormData>({
        title: '',
        shortDescription: '',
        fullDescription: '',
        category: 'private-office',
        capacity: 1,
        pricePerDay: 0,
        pricePerMonth: 0,
        city: '',
        address: '',
        amenities: [],
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'capacity' || name === 'pricePerDay' || name === 'pricePerMonth'
                ? parseFloat(value) || 0
                : value
        }));
    };

    const toggleAmenity = (amenityId: string) => {
        setFormData(prev => ({
            ...prev,
            amenities: prev.amenities.includes(amenityId)
                ? prev.amenities.filter(a => a !== amenityId)
                : [...prev.amenities, amenityId]
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const submissionData = {
                ...formData,
                images: imageUrls,
            };

            // API call to create listing
            const response = await fetch('/api/workspaces', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submissionData),
            });

            if (!response.ok) throw new Error('Failed to create listing');

            alert('Space listed successfully!');
            // Redirect or reset form
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to list space. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderSection = () => {
        switch (activeSection) {
            case 0:
                return <BasicInfo formData={formData} onChange={handleInputChange} />;
            case 1:
                return <PricingCapacity formData={formData} onChange={handleInputChange} />;
            case 2:
                return <Location formData={formData} onChange={handleInputChange} />;
            case 3:
                return <Amenities amenities={formData.amenities} onToggle={toggleAmenity} />;
            case 4:
                return <Media imageUrls={imageUrls} onImagesChange={setImageUrls} />;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        List a New Space
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Fill in the details below to publish your space.
                    </p>
                </div>

                {/* Progress Steps */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        {SECTIONS.map((section, index) => {
                            const Icon = section.icon;
                            const isActive = index === activeSection;
                            const isCompleted = index < activeSection;

                            return (
                                <div key={index} className="flex items-center flex-1">
                                    <button
                                        type="button"
                                        onClick={() => setActiveSection(index)}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${isActive
                                                ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                                                : isCompleted
                                                    ? 'text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20'
                                                    : 'text-gray-400 dark:text-gray-600'
                                            }`}
                                    >
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${isActive
                                                ? 'bg-indigo-600 text-white'
                                                : isCompleted
                                                    ? 'bg-indigo-600 text-white'
                                                    : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                                            }`}>
                                            {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-4 h-4" />}
                                        </div>
                                        <span className="hidden sm:inline text-sm font-medium">{section.title}</span>
                                    </button>

                                    {index < SECTIONS.length - 1 && (
                                        <div className={`flex-1 h-0.5 mx-2 ${isCompleted ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'
                                            }`} />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Form Card */}
                <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                    <div className="p-6 sm:p-8">
                        {/* Section Header */}
                        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100 dark:border-gray-700">
                            {(() => {
                                const Icon = SECTIONS[activeSection].icon;
                                return (
                                    <>
                                        <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                                            <Icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                                        </div>
                                        <div>
                                            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                                                {SECTIONS[activeSection].title}
                                            </h2>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                Step {activeSection + 1} of {SECTIONS.length}
                                            </p>
                                        </div>
                                    </>
                                );
                            })()}
                        </div>

                        {/* Section Content */}
                        <div className="animate-fadeIn">
                            {renderSection()}
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="px-6 sm:px-8 py-6 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                        <button
                            type="button"
                            onClick={() => setActiveSection(prev => Math.max(0, prev - 1))}
                            disabled={activeSection === 0}
                            className="px-6 py-2.5 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>

                        <div className="flex gap-3">
                            {activeSection === SECTIONS.length - 1 ? (
                                <>
                                    <button
                                        type="button"
                                        onClick={() => setActiveSection(prev => Math.max(0, prev - 1))}
                                        className="px-6 py-2.5 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting || imageUrls.length === 0}
                                        className="px-8 py-2.5 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-indigo-600/20 dark:shadow-indigo-600/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                                Publishing...
                                            </>
                                        ) : (
                                            'Submit Listing'
                                        )}
                                    </button>
                                </>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => setActiveSection(prev => Math.min(SECTIONS.length - 1, prev + 1))}
                                    className="px-8 py-2.5 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-indigo-600/20 dark:shadow-indigo-600/30 flex items-center gap-2"
                                >
                                    Continue
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>
                </form>
            </div>

            <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
        </div>
    );
}