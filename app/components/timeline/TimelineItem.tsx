'use client';

import React from 'react';
import { TimelineEntry } from './data';

const BriefcaseIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);

const GraduationCapIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M12 14l9-5-9-5-9 5 9 5z" />
        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
    </svg>
);

const MapPinIcon = () => (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const CalendarIcon = () => (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

interface TimelineItemProps {
    entry: TimelineEntry;
    type: 'experience' | 'education';
    onClick: () => void;
}

const TimelineItem = ({ entry, type, onClick }: TimelineItemProps) => {
    const Icon = type === 'experience' ? BriefcaseIcon : GraduationCapIcon;

    return (
        <div className="relative pl-8 sm:pl-10 pb-12 last:pb-0 group">
            {/* Timeline Line */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-800 group-last:bg-transparent" />

            {/* Timeline Dot/Icon */}
            <div className={`absolute left-[-16px] top-0 w-8 h-8 rounded-xl bg-gray-900 border border-gray-700 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:border-blue-500/50 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] text-blue-400`}>
                <Icon />
            </div>

            <div
                className="relative p-5 rounded-2xl bg-gray-800/40 border border-gray-700/50 backdrop-blur-sm cursor-pointer transition-all duration-300 hover:border-blue-500/30 hover:bg-gray-800/60"
                onClick={onClick}
            >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                    <div>
                        <h4 className="text-lg font-bold text-gray-100 group-hover:text-blue-400 transition-colors">
                            {entry.title}
                        </h4>
                        <p className="text-blue-400 font-medium">
                            {entry.organization}
                        </p>
                    </div>
                    <div className="flex flex-col gap-1 items-start sm:items-end text-xs sm:text-sm text-gray-400">
                        <div className="flex items-center gap-1.5">
                            <CalendarIcon />
                            <span>{entry.dateRange}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <MapPinIcon />
                            <span>{entry.location}</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-2">
                    <p className="text-sm text-gray-400 line-clamp-1 italic">
                        {entry.description[0]}
                    </p>
                    <div className="text-blue-400/50 group-hover:text-blue-400 transition-colors flex items-center gap-1 text-xs font-semibold whitespace-nowrap ml-4">
                        <span>View Details</span>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TimelineItem;
