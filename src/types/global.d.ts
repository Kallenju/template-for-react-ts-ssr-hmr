declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.styl' {
  const classes: { [key: string]: string };
  export default classes;
}

declare global {
  export default interface Window {
    __ASSETS_MAP: {
      css?: string;
      js?: string;
    };
  }
}

namespace NodeJS {
  export default interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly BROWSERSLIST_ENV: 'development' | 'production';
    readonly DEV_SERVER_PORT: string;
    readonly HMR_SERVER_PORT: string;
    readonly SSR_ABORT_DELAY: string;
    readonly DOTENV: string;
    ASSETS_MAP_GENERAL: string;
  }
}
