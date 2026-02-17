'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { TimelineEntry } from './data';

interface TimelineModalProps {
    entry: TimelineEntry;
    type: 'experience' | 'education';
    onClose: () => void;
}

const BriefcaseIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);

const GraduationCapIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M12 14l9-5-9-5-9 5 9 5z" />
        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
    </svg>
);

const MapPinIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const CalendarIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

const TimelineModal = ({ entry, type, onClose }: TimelineModalProps) => {
    const Icon = type === 'experience' ? BriefcaseIcon : GraduationCapIcon;
    const accentColor = type === 'experience' ? 'text-blue-400' : 'text-purple-400';
    const accentBg = type === 'experience' ? 'bg-blue-500/10' : 'bg-purple-500/10';

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = ''; };
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[110] p-4 sm:p-6"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="bg-gray-900/95 rounded-2xl p-6 sm:p-8 shadow-2xl max-w-2xl w-full border border-gray-700/50 relative overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 hover:bg-white/5 rounded-full transition-colors z-20 group"
                >
                    <svg className="w-5 h-5 text-gray-500 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="relative z-10 space-y-6">
                    <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-xl ${accentBg} ${accentColor} flex-shrink-0`}>
                            <Icon />
                        </div>
                        <div>
                            <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 leading-tight">
                                {entry.title}
                            </h3>
                            <p className={`text-lg font-medium ${accentColor}`}>
                                {entry.organization}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 border-y border-gray-800/50">
                        <div className="flex items-center gap-2.5 text-gray-400">
                            <CalendarIcon />
                            <span className="text-sm">{entry.dateRange}</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-gray-400">
                            <MapPinIcon />
                            <span className="text-sm">{entry.location}</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                            Key Responsibilities & Achievements
                        </h4>
                        <ul className="space-y-3">
                            {entry.description.map((point, index) => (
                                <motion.li
                                    key={index}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 * index }}
                                    className="flex items-start gap-3 text-gray-300 leading-relaxed"
                                >
                                    <div className={`w-1.5 h-1.5 rounded-full ${type === 'experience' ? 'bg-blue-500' : 'bg-purple-500'} mt-2 flex-shrink-0`} />
                                    <span className="text-sm sm:text-base">{point}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default TimelineModal;
