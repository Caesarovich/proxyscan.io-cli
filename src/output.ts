import type { Proxy } from 'proxyscan.io';

export function makeOutput(proxies: Proxy[]): string {
	let output = '';

	for (let proxy of proxies) {
		output += `${proxy.Ip}:${proxy.Port} ${proxy.Type} ${proxy.Ping}ms ${proxy.Anonymity}\n`;
	}

	return output;
}
