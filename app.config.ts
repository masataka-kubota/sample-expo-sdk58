import type { ConfigContext, ExpoConfig } from 'expo/config';

type AppVariant = 'development' | 'preview' | 'production';

interface VariantConfig {
  appName: string;
  bundleIdentifier: string;
}

const VARIANT_CONFIGS: Record<AppVariant, VariantConfig> = {
  development: {
    appName: '(Dev)sample-expo-sdk58',
    bundleIdentifier: 'com.sampleexposdk58.dev',
  },
  preview: {
    appName: '(Preview)sample-expo-sdk58',
    bundleIdentifier: 'com.sampleexposdk58.preview',
  },
  production: {
    appName: 'sample-expo-sdk58',
    bundleIdentifier: 'com.sampleexposdk58',
  },
};

const getVariantConfig = (): VariantConfig => {
  const variant = process.env.APP_VARIANT ?? process.env.EAS_BUILD_PROFILE ?? 'development';
  const isAppVariant = (value: string): value is AppVariant =>
    Object.prototype.hasOwnProperty.call(VARIANT_CONFIGS, value);

  if (!isAppVariant(variant)) {
    throw new Error(
      `Invalid APP_VARIANT "${variant}". Expected one of: ${Object.keys(VARIANT_CONFIGS).join(', ')}`,
    );
  }

  return VARIANT_CONFIGS[variant];
};

const EAS_PROJECT_ID = 'dfff7361-793f-47e4-955b-ba22a7f6af8d';

const config = ({ config }: ConfigContext): ExpoConfig => {
  const variantConfig = getVariantConfig();

  return {
    ...config,
    name: variantConfig.appName,
    slug: 'sample-expo-sdk58',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'sampleexposdk58',
    userInterfaceStyle: 'automatic',
    ios: {
      icon: './assets/expo.icon',
      bundleIdentifier: variantConfig.bundleIdentifier,
    },
    android: {
      package: variantConfig.bundleIdentifier,
      adaptiveIcon: {
        backgroundColor: '#E6F4FE',
        foregroundImage: './assets/images/android-icon-foreground.png',
        backgroundImage: './assets/images/android-icon-background.png',
        monochromeImage: './assets/images/android-icon-monochrome.png',
      },
      predictiveBackGestureEnabled: false,
    },
    web: {
      output: 'server',
      favicon: './assets/images/favicon.png',
    },
    plugins: [
      'expo-router',
      [
        'expo-splash-screen',
        {
          backgroundColor: '#208AEF',
          image: './assets/images/splash-icon.png',
          imageWidth: 76,
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },
    extra: {
      eas: {
        projectId: EAS_PROJECT_ID,
      },
    },
  };
};

export default config;
