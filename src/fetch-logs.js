import { GraphQLClient } from 'graphql-request';
import fs from 'fs';
import chalk from 'chalk';
import cliProgress from 'cli-progress';

export async function fetchLogs(args) {
    const account =
        args.account ||
        args.a;
    const startTime =
        args['time-start'] ||
        args.s;
    const endTime =
        args['time-end'] ||
        args.e;
    const increment =
        args['increment'] ||
        args.i ||
        2000;
    const where =
        args.where ||
        args.w;
    const outfile =
        args.outfile ||
        args.o ||
        'logs.json'

    if (!account || !startTime || !endTime || !increment || !where || !outfile) {
        console.error(chalk.redBright('Required argument is missing. Please run `-h` for more information.'));
    }

    const client = new GraphQLClient('https://api.newrelic.com/graphql', {
        headers: { "API-Key": process.env.NEW_RELIC_KEY }
    });

    const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
    let results = [],
        encounteredError = false;

    progressBar.start(endTime - startTime, 0);
    for (let i = startTime; i < endTime; i+=increment) {
        let variables = {
            nrql: `SELECT * FROM Log, LogExtendedRecord WHERE ${where} SINCE ${i} UNTIL ${i + increment} ORDER BY timestamp ASC LIMIT MAX`
        }

        try {
            let res = await client.request(
                `
query ($nrql: Nrql!) {
  actor {
    account(id: ${account}) {
      nrql(query: $nrql, timeout: 40) {
        results
        __typename
      }
      __typename
    }
    __typename
  }
}
`, variables);
            results = results.concat(res.actor.account.nrql.results);
        } catch (e) {
            encounteredError = true;
            fs.appendFileSync(process.cwd() + '/error.log', e.toString() + "\n");
        }

        progressBar.update((i - startTime) + increment);
    }
    progressBar.stop();

    fs.writeFileSync(process.cwd() + '/' + outfile, JSON.stringify(results));

    if (encounteredError) {
        console.error(chalk.redBright('Some API requests encountered errors. See ./error.log for details.'));
    }
}
