'use client';

import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { EXPERIENCE_DATA, EDUCATION_DATA, TimelineEntry } from './data';
import TimelineItem from './TimelineItem';
import TimelineModal from './TimelineModal';

const BriefcaseIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);

const GraduationCapIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M12 14l9-5-9-5-9 5 9 5z" />
        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
    </svg>
);

/**
 * Timeline section displaying experience and education in a two-column layout.
 * Uses static data from `data.ts`. Manages modal state — clicking a
 * `TimelineItem` opens `TimelineModal` with full details.
 */
const TimelineSection = () => {
    const [selectedEntry, setSelectedEntry] = useState<{ entry: TimelineEntry; type: 'experience' | 'education' } | null>(null);

    return (
        <section id="experience" className="py-16 md:py-20 relative bg-gray-900/50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12 sm:mb-16">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">My Journey</h2>
                    <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto px-4">
                        A timeline of my professional experience and academic background in software development.
                    </p>
                </div>

                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                    {/* Experience Column */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-3 mb-8 border-b border-gray-800 pb-4">
                            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                                <BriefcaseIcon />
                            </div>
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-100">Experience</h3>
                        </div>
                        <div className="relative">
                            {EXPERIENCE_DATA.map((entry) => (
                                <TimelineItem key={entry.id} entry={entry} type="experience" onClick={() => setSelectedEntry({ entry, type: 'experience' })} />
                            ))}
                        </div>
                    </div>

                    {/* Education Column */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-3 mb-8 border-b border-gray-800 pb-4">
                            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                                <GraduationCapIcon />
                            </div>
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-100">Education</h3>
                        </div>
                        <div className="relative">
                            {EDUCATION_DATA.map((entry) => (
                                <TimelineItem key={entry.id} entry={entry} type="education" onClick={() => setSelectedEntry({ entry, type: 'education' })} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {selectedEntry && (
                    <TimelineModal
                        entry={selectedEntry.entry}
                        type={selectedEntry.type}
                        onClose={() => setSelectedEntry(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
};

export default TimelineSection;
