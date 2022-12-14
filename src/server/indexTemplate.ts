const indexTemplate = (content: string): string => `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Test</title>
  <meta name="description" content="Test">

  <link rel="icon" type="image/png" sizes="192x192" href="/static/images/raster/favicon/favicon.png">

  <link rel="preload" href="/static/fonts/roboto-regular.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/static/fonts/roboto-medium.woff2" as="font" type="font/woff2" crossorigin>

  <link rel="stylesheet" href="/static/styles/fonts/fonts.css">

  <script src="/static/client.js"></script>
</head>

<body>
  <div id="react_root">${content}</div>
</body>

</html>
`;

export { indexTemplate as default };
