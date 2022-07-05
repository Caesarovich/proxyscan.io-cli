#!/usr/bin/env node

import meow from 'meow';
import ora from 'ora';
import { flags, ParsedFlags, parseFlags } from './flags.js';

import { fetchProxies } from 'proxyscan.io';
import { showResult } from './output.js';
import { checkUpdate } from './update.js';

checkUpdate();

const spinner = ora();

const cli = meow(
	`
	Usage
		$ proxyscan <input>

	Options

	--limit, -l {number, 1-50}
		Specify the amount of proxies to fetch.

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

async function main(parsedFlags: ParsedFlags): Promise<void> {
	spinner.start();
	try {
		const proxies = await fetchProxies(parsedFlags);
		spinner.stop();
		showResult(proxies, parsedFlags);
	} catch (err) {
		spinner.stop();
		console.error(err);
	}
}

main(parseFlags(cli.flags));
