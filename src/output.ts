import type { Proxy } from 'proxyscan.io';
import type { ParsedFlags } from './flags';
import chalk from 'chalk';

function noResult(flags: ParsedFlags): void {
	let output = `${chalk.red('ERROR')}: No proxies could be found with the specified options:\n\n`;

	for (let flag in flags) {
		const value = flags[flag as keyof ParsedFlags];
		const color = typeof value === 'number' ? chalk.magenta : chalk.cyan;
		output += `  ${flag}: ${color(value)}\n`;
	}

	console.error(output);
	process.exit(2);
}

export function showResult(proxies: Proxy[], flags: ParsedFlags): void {
	if (proxies.length === 0) return noResult(flags);

	let output = '';

	for (let proxy of proxies) {
		output += `${chalk.cyan(proxy.ip)}:${chalk.magenta(proxy.port)}`.padEnd(42, ' ');
		output += ` ${chalk.blue(proxy.types)} `;
		output += `${chalk.yellow(proxy.ping + 'ms')} ${proxy.anonymity}\n`;
	}

	console.log(output);
}
