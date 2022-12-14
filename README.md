# template-for-react-ts-ssr-hmr

Template for a project with React, TypeScript, SSR, and HMR. The template implies the use of CSS Modules and Stylus.

## Quick start:

To copy the template in an empty local folder without creating of a repo or in an existing repo use the following:

```shell
npx degit Kallenju/template-for-react-ts-ssr-hmr
```

Install packages and run development servers:

```shell
npm install

npm run dev
```

## Structure of the template

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
  - **scripts**
  - **styles**
- **types**

## How it works

The `./dist/` folder is the root of the site. It is created by Webpack and contains the result of the build process:

```shell
npm run dev
```

`./src` contains `App.tsx`, which is the entry point of the React app. It imports components from `./src/shared` and global styles from `./assets/styles/`. `App.tsx` is in turn imported by server (`server.tsx`) and client (`index.tsx`) files in `./src/server/` and `./src/client/`, respectively.

The `app.get()` method in server code (`./src/server/server.tsx`) specifies a callback function that will render to string React component from `App.tsx` and past it in a HTML template (`./src/server/indexTemplate.ts`), whenever there is an HTTP GET request with a path (`/`) relative to the site root.

After the `load` event is fired, the client code `hydrate` obtained React root.

All files in `./src/static/` are copied to the `./dist/client` folder without changes. For example, the `./src/static/images` folder will be copied to `./dist/client/images`. All files in `./src/static` are accessible through the virtual prefix `/static`. For example, the `./src/static/images/raster/favicon/favicon.png` file will be available at the address `http://localhost:3000/static/images/raster/favicon/favicon.png` === `/static/images/raster/favicon/favicon.png`.

Images in `./src/static/images` are optimized by Webpack. For images with `jpeg` or `jpg` or `png` extentions, the `image-minimizer-webpack-plugin` and `sharp` generate a WebP version of the images.

After each re-building webpack plugin `fork-ts-checker-webpack-plugin` checks the typescript code for errors.

The `browserslist` is used by babel and postcss to compile code for the specified browsers. The list of browsers is specified in the `package.json` file.

## What is used in the template?

### Code

- Webpack loader (babel-loader)
- Webpack plugin (fork-ts-checker-webpack-plugin)
- browserslist

### Styles

- Stylus
- postcss
- Webpack loaders (stylus-loader, css-loader, postcss-loader, style-loader)
- browserslist

### Prettier && Linter

- Prettier
- ESLint

### Hot Module Replacement

- Express server
- react-refresh-webpack-plugin
- React Fast Refresh
- Webpack modules and plugins (webpack-dev-middleware, webpack-hot-middleware)
- Webpack plugins (webpack.HotModuleReplacementPlugin)

### Server-Side Rendering

- Express server
- Nodemon

### Image Optimization

- Webpack plugin (image-minimizer-webpack-plugin)
- Sharp
