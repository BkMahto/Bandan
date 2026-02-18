import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const filename = searchParams.get('file');
  const bundleId = searchParams.get('bundleId') || 'com.domesticrpro.provider';
  const version = searchParams.get('version') || '1.0.0';
  const title = searchParams.get('title') || 'App Download';

  if (!filename) {
    return new NextResponse('Missing file parameter', { status: 400 });
  }

  // Get the host from the request headers to ensure we use the current domain (e.g. ngrok)
  const host = request.headers.get('host');
  let protocol = request.headers.get('x-forwarded-proto') || 'https';
  
  // Force HTTPS if using ngrok, otherwise rely on headers or default
  if (host?.includes('ngrok') || host?.includes('vercel')) {
     protocol = 'https';
  }

  const baseUrl = `${protocol}://${host}`;
  const encodedFilename = encodeURIComponent(filename);

  const manifest = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>items</key>
	<array>
		<dict>
			<key>assets</key>
			<array>
				<dict>
					<key>kind</key>
					<string>software-package</string>
					<key>url</key>
					<string>${baseUrl}/downloads/${encodedFilename}</string>
				</dict>
			</array>
			<key>metadata</key>
			<dict>
				<key>bundle-identifier</key>
				<string>${bundleId}</string>
				<key>bundle-version</key>
				<string>${version}</string>
				<key>kind</key>
				<string>software</string>
				<key>title</key>
				<string>${title}</string>
			</dict>
		</dict>
	</array>
</dict>
</plist>`;

  // Server-side logging
  console.log(`[API] Manifest requested for: ${filename}`);
  console.log(`[API] BundleID: ${bundleId}, Version: ${version}`);
  console.log(`[API] Generated manifest URL: ${baseUrl}/downloads/${encodedFilename}`);

  return new NextResponse(manifest, {
    headers: {
      'Content-Type': 'application/x-plist',
    },
  });
}
