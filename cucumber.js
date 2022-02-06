const common = `
  --require-module ts-node/register
  --require step-definitions/**/*.ts
  --require test.setup.ts
  --format json:reports/report.json 
  --format message:reports/report.ndjson
  --format html:reports/report.html
  --format summary 
  --format progress-bar 
  --format-options ${JSON.stringify({ snippetInterface: 'async-await' })}
  --publish-quiet
  `;

const getWorldParams = () => {
  const params = {
  };

  return `--world-parameters ${JSON.stringify({ params })}`;
};

module.exports = {
  default: `${common} ${getWorldParams()}`,
};

