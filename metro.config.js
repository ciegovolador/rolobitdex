const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const config = getDefaultConfig(__dirname);

// expo-sqlite on web needs .wasm files served as assets
config.resolver.assetExts.push("wasm");

// Ensure .wasm files are not treated as source code
config.resolver.sourceExts = config.resolver.sourceExts.filter(
  (ext) => ext !== "wasm"
);

// expo-sqlite web worker needs these node_modules transformed
config.transformer.getTransformOptions = async () => ({
  transform: {
    experimentalImportSupport: true,
    inlineRequires: true,
  },
});

module.exports = config;
