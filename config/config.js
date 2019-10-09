module.exports = {
    // -----LOCAL-APP-Scraper------------------
    appName: "Moviesor-Scraper",
    appHost:  process.env.APP_HOST || "localhost",
    appPort: Number(process.env.APP_PORT || 3001),
    logLevel: process.env.LOG_LEVEL || "info",
    logsPath: process.env.LOGS_PATH || "./logs",
    // -----Back-End-------------------
    backEndHost:  process.env.BACKEND_HOST || "localhost",
    backEndPort: Number(process.env.BACKEND_PORT || 3000),
    backEndApi: process.env.BACKEND_API || "v1",
    //------DB-MANAGER------------------
    dbManagerHost: process.env.DB_MANAGER_HOST || "localhost",
    dbManagerPort: Number(process.env.APP_PORT || 3002),
    dbManagerApi: process.env.DB_MANAGER_API || "v1",
    //----------MONGOOSE-CONFIG---------------------------
    mongoUserName: process.env.MONGO_USER || "Moviesor",
    mongoPassword: process.env.MONGO_PASS,
    mongoURI: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@moviesor-5ljou.mongodb.net/test?retryWrites=true&w=majority`,
    tomatoModelName: process.env.TOMATO_MODEL || 'tomato-movies',
    //-------------------------
    tomatoUri: "https://www.rottentomatoes.com",
};