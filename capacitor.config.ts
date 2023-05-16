import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'spuren_lesen',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
