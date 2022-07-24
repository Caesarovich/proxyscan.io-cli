#!/usr/bin/env node

import { fetchProxies, Proxy } from 'proxyscan.io';
import meow, { AnyFlags, TypedFlags } from 'meow';
import ora, { Ora } from 'ora';

import { flags, ParsedFlags, parseFlags } from './flags.js';
import { showResults } from './output.js';
import { checkUpdates } from './update.js';
import { handleFetchError } from './errors.js';
import { exit } from 'process';
import chalk from 'chalk';

const cli = meow(
	`
	Usage
		$ proxyscan <input>

	Options

	--limit, -l {number, 1-50}
		Specify the amount of proxies to fetch.

		Default: 5

	--type, -t [http | https | socks4 | socks5]
		Specify the proxy protocol.

	--ping, -p {number, 10-30000}
		Specify the maximum desired latency.

	--level [transparent | anonymous | elite]
		Specify anonymity level for the proxies.

	--port {number, 1-65535}
		Specify a specific port number.

	--uptime {number, 1-100}
		Specify uptime reliability in percentage.

	--countries (Country codes separated by commas)
		The countries the proxies must be located into.

		Example: --countries us,en,ru

	--avoid-countries (Country codes separated by commas)
		The countries the proxies must NOT be located into.

		Example: --countries cn,pl,hk

	--request-timeout {number, milliseconds}
		Milliseconds to wait for the response before aborting.

	--request-retries {number}
		Maximum retry attempts when failing to fetch proxies.

		Default: 2


	Examples
		$ proxyscan --limit 15
		$ proxyscan --level elite
		$ proxyscan --ping 200
`,
	{
		importMeta: import.meta,
		flags,
	}
);

let fetchRetries = 1;

async function fetch(parsedFlags: ParsedFlags, spinner: Ora): Promise<void> {
	try {
		const proxies = await fetchProxies(parsedFlags, {
			timeout: parsedFlags.requestTimeout ?? 5000,
		});
		handleResults(proxies, spinner, parsedFlags);
	} catch (err) {
		handleFetchError(err, spinner);
		fetchRetries--;
		if (fetchRetries > 0) {
			fetch(parsedFlags, spinner);
		} else {
			spinner.fail(chalk.red.underline('Failed to fetch proxies through the API'));
			exit(1);
		}
	}
}

function handleResults(proxies: Proxy[], spinner: Ora, flags: ParsedFlags): void {
	spinner.stop();
	showResults(proxies, flags);
}

async function main(flags: TypedFlags<AnyFlags>): Promise<void> {
	checkUpdates();

	const parsedFlags = parseFlags(flags);

	if (parsedFlags.requestRetries) fetchRetries = parsedFlags.requestRetries;

	const spinner = ora();

	spinner.start('Fetching proxies...');

	fetch(parsedFlags, spinner);
}

main(cli.flags);
