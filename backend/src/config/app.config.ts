export default () => ({

    appName:

        process.env.APP_NAME,

    version:

        process.env.APP_VERSION,

    projectPath:

        process.env.DEFAULT_PROJECT_PATH,

    enableAI:

        process.env.ENABLE_AI === 'true',

    enableRollback:

        process.env.ENABLE_ROLLBACK === 'true',

    enableDashboard:

        process.env.ENABLE_DASHBOARD === 'true',

    maxScanDepth:

        Number(process.env.MAX_SCAN_DEPTH),

    reportOutput:

        process.env.REPORT_OUTPUT,

    logLevel:

        process.env.LOG_LEVEL

});