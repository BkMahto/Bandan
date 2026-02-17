import HeroSection from './components/hero';
import SkillsSection from './components/skills';
import TimelineSection from './components/timeline';
import AppShowcase from './components/AppShowcase';
import DevelopmentProcess from './components/DevelopmentProcess';
import ContactSection from './components/ContactSection';
import { getProfileDetails } from './lib/services/profile';

/**
 * Root page — Server Component.
 * Fetches profile data (hero stats, skills) from Firestore at request time
 * and passes it down to client components for SSR hydration.
 */
export default async function MobileDevPortfolio() {
	const profileData = await getProfileDetails();

	return (
		<main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-x-hidden">
			<HeroSection initialData={profileData?.heroSection} />
			<SkillsSection initialSkills={profileData?.skillsSection} />
			<TimelineSection />
			{/* <AppShowcase /> */}
			<DevelopmentProcess />
			<ContactSection />
		</main>
	);
}
