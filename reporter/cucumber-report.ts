import reporter, { Options } from 'cucumber-html-reporter';

const options: Options = {
    theme: 'bootstrap',
    jsonFile: 'reports/report.json',
    output: 'reports/report.html',
    storeScreenshots: true,
    reportSuiteAsScenarios: true,
    launchReport: false,
};
reporter.generate(options);