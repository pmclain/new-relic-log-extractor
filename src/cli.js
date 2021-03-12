import minimist from 'minimist';
import chalk from 'chalk';
import { help } from './help';
import { fetchLogs } from "./fetch-logs";

export async function cli(argsInput) {
    const args = minimist(argsInput.slice(2));

    if (args.help || args.h) {
        return help();
    }

    if (!process.env.NEW_RELIC_KEY) {
        console.error(chalk.redBright('Please set NEW_RELIC_KEY in .env'));
        return process.exit(1);
    }

    await fetchLogs(args);
}