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
- **types**

## How it works

`./src` contains `App.tsx`, which is the entry point of the React app. It imports components from `./src/shared` and global styles from `./assets/styles/`. `App.tsx` is in turn imported be server and client files in `./src/server/` and `./src/client/`, respectively.

The `app.get()` method specifies a callback function that will render to string React component from `App.tsx` and past it in a HTML template, whenever there is an HTTP GET request with a path ('/') relative to the site root. HTML template are in `./src/server`.

After the `load` event is fired, the client code `hydrate` obtained React component.

## What is used in the template?

### Hot Module Replacement

- express server
- react-refresh-webpack-plugin
- React Fast Refresh
- Webpack modules and plugins (webpack-dev-middleware, webpack-hot-middleware, webpack.HotModuleReplacementPlugin)

### Server-Side Rendering

- express server
