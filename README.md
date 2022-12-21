# template-for-react-ts-ssr-hmr

Template for a project with React, TypeScript, SSR, and HMR. The template implies the use of CSS Modules and Stylus.

## Quick start:

To copy the template in an empty local folder without creating of a repo or in an existing repo use the following:

```shell
npx degit Kallenju/template-for-react-ts-ssr-hmr
```

The `./dist/` folder is the root of the site. It is created by Webpack and contains the result of the build process. To start the development servers, run the following command:

```shell
npm install

npm run dev
```

## Structure of the template

### Structure of the root folder (`./`)

- **\_\_tests\_\_**
- **bin**
- **config**
- **dist**
- **src**

### Structure of the dist folder (`./dist`)

- **client**
  - **fonts**
  - **images**
  - **styles**
- **server**
- **shared**
  - **Header**
  - **Layout**

### Structure of the source folder (`./src`)

- **assets**
  - **styles**
    - **body**
    - **html**
    - **root**
- **client**
- **server**
- **shared**
  - **Header**
  - **Layout**
- **static**
  - **images**
  - **fonts**
  - **styles**
- **types**
- **views**

## How it works

### Server-Side Rendering

`./src` contains `App.tsx`, which is the entry point of the React app. It imports components from `./src/shared` and global styles from `./assets/styles/`. `App.tsx` is in turn imported by server (`server.tsx`) and client (`index.tsx`) files in `./src/server/` and `./src/client/`, respectively.

The `app.get()` method in server code (`./src/server/server.tsx`) specifies a callback function that will render to string React component from `App.tsx` and past it in a template (`./src/views/index.tsx`), whenever there is an HTTP GET request with a path (`/`) relative to the site root.

The server code use modern React method `renderToPipeableStream` to render React components to a stream. It is similar to `renderToString`, but it returns a Node.js Readable stream instead of a string. This is useful for sending the rendered HTML to the client in chunks.

The client code `hydrate` obtained React root. The `hydrate` method is used to render React components on the client side. It is similar to `render`, but it will attach event listeners to the existing markup instead of replacing it.

In the `App.tsx` component, `React.Suspense` component and `React.lazy` method can be used to load components asynchronously. The `React.Suspense` component is used to display a fallback component while waiting for the asynchronous component to load. The `React.lazy` function is used to load components asynchronously.

### Hot Module Replacement

Hot Module Replacement is one of the most useful features offered by webpack. It allows all kinds of modules or files to be updated at runtime without the need for a full refresh. This includes CSS and JS files, as well as static assets that are part of the dependency graph. When a file is changed, the module is replaced, and the application code is re-executed. During such module replacement a component's state is preserved.

### Typescript checking

After each re-building webpack plugin `fork-ts-checker-webpack-plugin` checks the typescript code for errors.

### Static files

All files in `./src/static/` are copied to the `./dist/client` folder without changes. For example, the `./src/static/images` folder will be copied to `./dist/client/images`. All files in `./src/static` are accessible through the virtual prefix `/static`. For example, the `./src/static/images/raster/favicon/favicon.png` file will be available at the address `http://localhost:3000/static/images/raster/favicon/favicon.png` === `/static/images/raster/favicon/favicon.png`.

### Image optimization

Images in `./src/static/images` are optimized by Webpack. For images with `jpeg` or `jpg` or `png` extentions, the `image-minimizer-webpack-plugin` and `sharp` generate a WebP version of the images.

### Browserslist

The `browserslist` is used by babel and postcss to compile code for the specified browsers. The list of browsers is specified in the `package.json` file.

### Testing

It is possible to write snapshot tests (using `jest` and `react-test-renderer`) and tests for React components (using the `react-testing-library` library).

The template contains a simple tests for the `Header` component. The test is located in the `./src/__tests__/Header.test.tsx` file.

### Dotenv

The `dotenv` package is used to load environment variables from a `.env` file into `process.env`. The `.env` files is located in the root folder of the project.

## What is used in the template?

### Server-Side Rendering

- Express server
- Nodemon
- Dotenv

### Hot Module Replacement

- Express server
- react-refresh-webpack-plugin
- React Fast Refresh
- Webpack modules and plugins (webpack-dev-middleware, webpack-hot-middleware)
- Webpack plugins (webpack.HotModuleReplacementPlugin)
- Dotenv

### Code compilation

- Webpack loader (babel-loader)
- Webpack plugin (fork-ts-checker-webpack-plugin)
- browserslist
- Dotenv

### Styles

- Stylus
- postcss
- Webpack loaders (mini-css-extract-plugin, css-loader, postcss-loader, style-loader)
- browserslist
- Dotenv

### Image Optimization

- Webpack plugin (image-minimizer-webpack-plugin)
- Sharp

### Prettier && Linter

- Prettier
- ESLint

### Testing

- Jest
- React Test Renderer
- React Testing Library
- Dotenv
