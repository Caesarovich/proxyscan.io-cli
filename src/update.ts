import { fileURLToPath } from 'url';
import * as path from 'path';
import { readFile } from 'fs';
import updateNotifier from 'update-notifier';

export function checkUpdates() {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);

	readFile(path.join(__dirname, '..', 'package.json'), (err, data) => {
		if (err) return;

		const pkg = JSON.parse(data.toString());

		const notifier = updateNotifier({
			pkg: {
				name: pkg.name,
				version: pkg.version,
			},
			updateCheckInterval: 1000 * 60 * 60 * 24,
		});

		notifier.notify();
	});
}
