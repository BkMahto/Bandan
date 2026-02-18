import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { DebugLogger } from './DebugLogger';

export const dynamic = 'force-dynamic';

export default function DownloadsPage() {
    const downloadsDir = path.join(process.cwd(), 'public/downloads');
    let files: string[] = [];

    try {
        if (fs.existsSync(downloadsDir)) {
            files = fs.readdirSync(downloadsDir).filter(file => file !== '.DS_Store' && file !== 'manifest.plist');
        }
    } catch (error) {
        console.error("Error reading downloads directory:", error);
    }

    // Server-side logs for debugging
    console.log(`[Server] Downloads page accessed. Found ${files.length} files.`);

    // Helper to determine platform
    const getPlatform = (filename: string) => {
        if (filename.endsWith('.apk')) return 'Android';
        if (filename.endsWith('.ipa')) return 'iOS';
        return 'File';
    };

    return (
        <div className="min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
            <main className="max-w-2xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">App Downloads</h1>

                <div className="space-y-4">
                    {files.length === 0 ? (
                        <p className="text-gray-500">No apps found in /public/downloads combined with a manifest.plist for iOS.</p>
                    ) : (
                        files.map((file) => {
                            const platform = getPlatform(file);
                            const isIOS = platform === 'iOS';

                            // Use current window location to construct the manifest URL
                            // We'll use a relative path for the API, which the browser will resolve correctly
                            // Critical: Bundle ID in manifest.plist MUST match the IPA exactly for OTA to work.
                            const manifestUrl = `/api/manifest?file=${file}&title=${file}&bundleId=com.domesticrpro.provider&version=1.0.0`;
                            const installUrl = `itms-services://?action=download-manifest&url=${typeof window !== 'undefined' ? window.location.origin : ''}${manifestUrl}`;

                            return (
                                <div key={file} className="border p-4 rounded-lg flex items-center justify-between">
                                    <div>
                                        <h2 className="font-semibold">{file}</h2>
                                        <span className="text-sm text-gray-500">{platform}</span>
                                    </div>

                                    {isIOS ? (
                                        <DebugLogger file={file} installUrl={installUrl} />
                                    ) : (
                                        <a
                                            href={`/downloads/${file}`}
                                            download
                                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm"
                                        >
                                            Download APK
                                        </a>
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>

                <div className="mt-12 p-4 bg-gray-100 rounded text-sm text-gray-700">
                    <h3 className="font-bold mb-2">Instructions:</h3>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Place <strong>.apk</strong> or <strong>.ipa</strong> files in <code>public/downloads</code> folder.</li>
                        <li><strong>No configuration needed!</strong> The download links are automatically generated for your current domain (including ngrok).</li>
                    </ul>
                </div>
            </main>
        </div>
    );
}