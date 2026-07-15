import AboutCTA from '@/components/pages/about/AboutCTA';
import AboutHero from '@/components/pages/about/AboutHero';
import AboutMission from '@/components/pages/about/AboutMisson';
import AboutStats from '@/components/pages/about/AboutStats';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About Us | WorkDock',
    description: 'Finding your perfect workspace, anywhere in the world. Learn about our mission to empower remote teams.',
};

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <AboutHero />
            <AboutMission />
            <AboutStats />
            <AboutCTA />
        </main>
    );
}