![Logo](https://www.proxyscan.io/images/logo.png)

# proxyscan.io-cli

A command line tool to fetch a list of available proxies within your terminal.

![out](https://user-images.githubusercontent.com/38408878/175573941-3fb8405a-6df8-408d-a1dc-e105e548590c.gif)

## 📥 Installation

You can install this library with the [NPM package manager](https://www.npmjs.com/) with the following command:

```
npm install -g proxyscan.io-cli
```

**Alternatively** you can build your own version with the following commands:

```
git clone https://github.com/Caesarovich/proxyscan.io-cli.git
cd proxyscan.io-cli && npm i
npm run build
npm install -g .
```

## ⏳ Quick start

```bash
$ proxyscan --limit 15

# Prints a list of 15 proxies
```

## 📔 Help

Here is a summary of the `--help` flag.

```
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

  --request-timeout {number, milliseconds}
		Milliseconds to wait for the response before aborting.

  --request-retries {number}
		Maximum retry attempts when failing to fetch proxies.

		Default: 2

  Examples
		$ proxyscan --limit 15
		$ proxyscan --level elite
		$ proxyscan --ping 200
```
