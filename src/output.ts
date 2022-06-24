import type { Proxy } from 'proxyscan.io';

export function makeOutput(proxies: Proxy[]): string {
	let output = '';

	for (let proxy of proxies) {
		output += `${proxy.ip}:${proxy.port} ${proxy.types} `;
		output += `${proxy.ping}ms ${proxy.anonymity}\n`;
	}

	return output;
}
