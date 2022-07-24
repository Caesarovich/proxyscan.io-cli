import chalk from 'chalk';
import { Ora } from 'ora';

export function handleFetchError(error: any, spinner: Ora) {
	spinner
		.stopAndPersist({
			text: chalk.red(`Fetch failed: ${chalk.bold(error.toString())}`),
			symbol: chalk.redBright('✖'),
		})
		.start('Retrying...');
	spinner.color = 'yellow';
}
