# New Relic Log Extractor

Extract Log Entries from New Relic for analysis, retention, whatever.

### Installation

```shell
git remote add origin git@github.com:pmclain/new-relic-log-extractor.git
cd new-relic-log-extractor
yarn install
```

### Environment Configuration

This tool requires a New Relic User key capable of accessing NerdGraph. Details
and generation instructions can be found in the [New Relic Documentation](https://docs.newrelic.com/docs/apis/get-started/intro-apis/new-relic-api-keys/)

```shell
echo 'NEW_RELIC_KEY={{ your NR USER KEY }}' > .env
```

### Usage

```shell
./index.js -h

./index.js <options>
  --account, -a ....... New Relic account number
  --time-start, -s .... beginning micro-timestamp
  --time-end, -e ...... ending micro-timestamp
  --where, -w ......... NRQL where clause. ex "service = 'myservice' AND log_type = 'nginx_access_logs'"
  --increment, -i ..... [Optional] micro-timestamp increment for requests. New Relic 2000 results max, increasing this value will speed up the process, but may truncate results. Default: 2000 
  --outfile, -o ....... [Optional] output filename relative to pwd. Default: logs.json
```
