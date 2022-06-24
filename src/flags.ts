import type { AnyFlags, TypedFlags } from 'meow';
import type { FetchOptions } from 'proxyscan.io';

export const flags: AnyFlags = {
	level: {
		type: 'string',
	},
	limit: {
		type: 'number',
		default: 5,
		alias: 'l',
	},
	type: {
		type: 'string',
		alias: 't',
	},
	port: {
		type: 'number',
	},
	ping: {
		type: 'number',
		alias: 'p',
	},
	uptime: {
		type: 'number',
	},
	countries: {
		type: 'string',
	},
	avoidCountries: {
		type: 'string',
	},
};

export interface ParsedFlags {
	level?: FetchOptions['level'];
	limit?: FetchOptions['limit'];
	type?: FetchOptions['type'];
	port?: FetchOptions['port'];
	ping?: FetchOptions['ping'];
	uptime?: FetchOptions['uptime'];
	countries?: FetchOptions['countries'];
	avoidCountries?: FetchOptions['avoidCountries'];
}

function isAnonymityLevel(flag?: unknown): flag is FetchOptions['level'] {
	if (!flag || typeof flag !== 'string') return false;
	return flag === 'transparent' || flag === 'anonymous' || flag === 'elite';
}

function isProxyType(flag?: unknown): flag is FetchOptions['type'] {
	if (!flag || typeof flag !== 'string') return false;
	return flag === 'http' || flag === 'https' || flag === 'socks4' || flag === 'socks5';
}

export function parseFlags(inputFlags: TypedFlags<AnyFlags>): ParsedFlags {
	const parsedFlags: ParsedFlags = {};

	if (isAnonymityLevel(inputFlags.level)) parsedFlags.level = inputFlags.level;
	parsedFlags.limit = typeof inputFlags.limit === 'number' ? inputFlags.limit : 5;
	if (isProxyType(inputFlags.type)) parsedFlags.type = inputFlags.type;
	if (typeof inputFlags.port === 'number') parsedFlags.port = inputFlags.port;
	if (typeof inputFlags.ping === 'number') parsedFlags.ping = inputFlags.ping;
	if (typeof inputFlags.uptime === 'number') parsedFlags.uptime = inputFlags.uptime;
	if (typeof inputFlags.countries === 'string')
		parsedFlags.countries = inputFlags.countries.split(',');
	if (typeof inputFlags.avoidCountries === 'string')
		parsedFlags.avoidCountries = inputFlags.avoidCountries.split(',');

	return parsedFlags;
}
