import { registerRootComponent } from "expo";

if (process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === "true") {
  const Storybook = require("./.rnstorybook").default;
  registerRootComponent(Storybook);
} else {
  require("expo-router/entry");
}
