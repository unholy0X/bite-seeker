const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Solana packages use require('crypto') (Node-style).
// Map it to expo-crypto so Metro can resolve it in the RN bundle.
config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  crypto: require.resolve("expo-crypto"),
};

module.exports = config;
