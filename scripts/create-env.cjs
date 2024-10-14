console.clear();

const fs = require("fs");
const readline = require("readline");

const ENV_FILE = ".env";
const API_KEY_NAME = "VITE_UNSPLASH_ACCESS_KEY";

function readEnvFile() {
	try {
		const data = fs.readFileSync(ENV_FILE, "utf8");
		const lines = data.split("\n");
		for (const line of lines) {
			const [key, value] = line.split("=");
			if (key === API_KEY_NAME && value) {
				return value.trim();
			}
		}
	} catch (error) {
		return null;
	}
	return null;
}

function writeEnvFile(accessKey) {
	const envContent = `${API_KEY_NAME}=${accessKey}`;
	fs.writeFileSync(ENV_FILE, envContent);
	console.log(
		".env file created/updated successfully with the Unsplash API access key."
	);
}

function promptForApiKey() {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});

	return new Promise((resolve) => {
		rl.question("Please enter your Unsplash API access key: ", (accessKey) => {
			rl.close();
			resolve(accessKey.trim());
		});
	});
}

async function main() {
	let accessKey = readEnvFile();

	if (accessKey) {
		console.log("Existing Unsplash API access key found in .env file.");
	} else {
		console.log(
			"No existing Unsplash API access key found. Please provide one."
		);
		accessKey = await promptForApiKey();
	}

	writeEnvFile(accessKey);
}

main().catch(console.error);
