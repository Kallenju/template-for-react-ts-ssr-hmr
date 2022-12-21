import React from 'react';
import AssetsMap from '../shared/interfaces/AssetsMap';

interface IndexProps {
  assetsMap: AssetsMap;
  children: React.ReactNode;
}

export default function Index({
  assetsMap,
  children,
}: IndexProps): React.ReactElement {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Test</title>
        <meta name="description" content="Test" />

        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/static/images/raster/favicon/favicon.png"
        />

        <link
          rel="preload"
          href="/static/fonts/roboto-regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/static/fonts/roboto-medium.woff2"
          as="font"
          type="font/woff2"
          crossOrigin=""
        />

        <link rel="stylesheet" href="/static/styles/fonts/fonts.css" />
        {assetsMap.css && (
          <link rel="stylesheet" href={`/static/${assetsMap.css}`} />
        )}
      </head>
      <body>
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<b>Enable JavaScript to run this app.</b>`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
