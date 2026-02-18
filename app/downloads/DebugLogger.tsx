'use client';

import { useState } from 'react';

export function DebugLogger({ file, installUrl }: { file: string, installUrl: string }) {
    const [logs, setLogs] = useState<string[]>([]);

    const addLog = (msg: string) => {
        const time = new Date().toLocaleTimeString();
        setLogs(prev => [`[${time}] ${msg}`, ...prev]);
    };

    return (
        <div className="flex flex-col items-end gap-2 w-full">
            <a
                href={installUrl}
                onClick={() => addLog(`Clicked install for ${file}. \nURL: ${installUrl}`)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm whitespace-nowrap"
            >
                Install iOS
            </a>

            {logs.length > 0 && (
                <div className="mt-2 w-full p-2 bg-black text-green-400 text-xs font-mono rounded overflow-x-auto border border-gray-700 max-w-[300px]">
                    <div className="font-bold border-b border-gray-700 mb-1 pb-1">Debug Logs</div>
                    {logs.map((log, i) => (
                        <div key={i} className="whitespace-pre-wrap mb-1">{log}</div>
                    ))}
                </div>
            )}
        </div>
    );
}
