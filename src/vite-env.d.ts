/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_DEBUG: string;
  readonly VITE_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
