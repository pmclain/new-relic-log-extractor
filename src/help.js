const chalk = require('chalk');

export function help() {
    console.log(`
${chalk.greenBright('./index.js <options>')}
  --account, -a ....... New Relic account number
  --time-start, -s .... beginning micro-timestamp
  --time-end, -e ...... ending micro-timestamp
  --where, -w ......... NRQL where clause. ex "service = 'myservice' AND log_type = 'nginx_access_logs'"
  --increment, -i ..... [Optional] micro-timestamp increment for requests. New Relic 2000 results max, increasing this value will speed up the process, but may truncate results. Default: 2000 
  --outfile, -o ....... [Optional] output filename relative to pwd. Default: logs.json
    `);
}