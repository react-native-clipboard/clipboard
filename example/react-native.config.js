const path = require("node:path");
const { configureProjects } = require("react-native-test-app");

// Gradle autolinking runs the React Native CLI from this directory, so it
// needs its own config. Running from here also lets react-native-test-app
// find `app.json` and generate the Android manifest.
module.exports = {
	dependencies: {
		// Link the library from the repository root, not the copy in node_modules
		"@react-native-clipboard/clipboard": {
			root: path.join(__dirname, ".."),
		},
	},
	project: configureProjects({
		android: {
			sourceDir: "android",
		},
		ios: {
			sourceDir: "ios",
		},
	}),
};
