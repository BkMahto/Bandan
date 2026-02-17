export interface TimelineEntry {
    id: string;
    title: string;
    organization: string;
    location: string;
    dateRange: string;
    description: string[];
    icon?: React.ReactNode;
}

export const EXPERIENCE_DATA: TimelineEntry[] = [
    {
        id: 'exp1',
        title: 'iOS Developer',
        organization: 'Elluminati Inc',
        location: 'Rajkot, Gujarat, India',
        dateRange: 'Jan 2024 - Present',
        description: [
            'Developing and maintaining high-performance iOS applications using Swift, SwiftUI, and UIKit.',
            'Collaborating with cross-functional teams to architect and implement new features and modular components.',
            'Optimizing application performance, resulting in improved responsiveness and reduced crash rates.',
            'Integrating complex REST APIs and third-party services to enhance application functionality.'
        ],
    },
];

export const EDUCATION_DATA: TimelineEntry[] = [
    {
        id: 'edu1',
        title: 'B.Tech in Computer Engineering',
        organization: 'RK University',
        location: 'Rajkot, Gujarat, India',
        dateRange: '2021 - 2025',
        description: [
            'Focused on core computer science fundamentals including Data Structures, Algorithms, and Software Engineering.',
            'Gained practical experience in mobile app development and modern architectural patterns.',
            'Participated in technical workshops and project exhibitions to showcase innovative software solutions.',
            'Maintaining a strong academic record with a Grade of 8.78/10.0.'
        ],
    },
];
