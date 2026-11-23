const project = (() => {
	const fs = require("node:fs");
	const path = require("node:path");
	try {
		const { configureProjects } = require("react-native-test-app");

		return configureProjects({
			android: {
				sourceDir: path.join("example", "android"),
				// `app.json` lives in `example/`, so react-native-test-app cannot
				// discover the package name on its own.
				packageName: "com.microsoft.reacttestapp",
			},
			ios: {
				sourceDir: "example/ios",
			},
			windows: {
				sourceDir: path.join("example", "windows"),
				solutionFile: path.join("example", "windows", "Example.sln"),
			},
		});
	} catch (e) {
		return undefined;
	}
})();

// Yarn installs a separate copy of react-native in example/node_modules, and
// that copy is the one the example app bundles. Point the CLI at it, so the
// InitializeCore that Metro runs before the app comes from the same copy.
// Otherwise the bundle skips it and fails with "Property 'window' doesn't exist".
const reactNativePath = (() => {
	const path = require("node:path");
	try {
		return path.dirname(
			require.resolve("react-native/package.json", {
				paths: [path.join(__dirname, "example")],
			}),
		);
	} catch (e) {
		return undefined;
	}
})();

module.exports = {
	...(reactNativePath ? { reactNativePath } : undefined),
	dependencies: {
		// Help rn-cli find and autolink this library
		"@react-native-clipboard/clipboard": {
			root: __dirname,
		},
	},
	dependency: {
		platforms: {
			windows: {
				sourceDir: "windows",
				solutionFile: "Clipboard.sln",
				projects: [
					{
						projectFile: "Clipboard/Clipboard.vcxproj",
						directDependency: true,
					},
				],
			},
		},
	},
	...(project ? { project } : undefined),
};
