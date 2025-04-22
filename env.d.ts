interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string;
    // Otras variables...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }