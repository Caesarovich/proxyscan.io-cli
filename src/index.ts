import meow from 'meow';
import ora from 'ora';
import { flags, ParsedFlags, parseFlags } from './flags.js';

import { fetchProxies } from 'proxyscan.io';
import { makeOutput } from './output.js';

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

	Examples
	  $ proxyscan -l 15
	  $ proxyscan -t elite
	  
`,
	{
		importMeta: import.meta,
		flags,
	}
);

async function main(parsedFlags: ParsedFlags): Promise<void> {
	spinner.start();
	const proxies = await fetchProxies(parsedFlags);
	spinner.stop();
	console.log(makeOutput(proxies));
}

main(parseFlags(cli.flags));
