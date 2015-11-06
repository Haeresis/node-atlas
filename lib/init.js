/*------------------------------------*\
    $%INIT
\*------------------------------------*/
/* jslint node: true */

/**
 * Represent options passed through API.
 * @private
 * @alias configuration
 * @type {Object}
 * @memberOf NA#
 */
exports.configuration = {};

/**
 * Set private `NA#configuration`.
 * @public
 * @function config
 * @memberOf NA#
 * @example require('node-atlas')().config({
 *     webconfig: "webconfig.alternatif.json",
 *     httpPort: 7778,
 *     generate: true,
 *     browse: true
 * }).init();
 * @return {Object} NA instance.
 */
exports.config = function (config) {
    var NA = this,
        configuration = config || {};

    NA.configuration = configuration;

    return NA;
};

/**
 * Initialize a NA instance.
 * @public
 * @function init
 * @memberOf NA#
 * @example require('node-atlas')().init();
 * @return {Object} NA instance.
 */
exports.init = function () {
    var NA = this;

    NA.loadListOfNativeModules();
    NA.initGlobalVar();
    NA.moduleRequired(function () {
        NA.lineCommandConfiguration();
        NA.initGlobalVarRequiredNpmModules();
        NA.initWebconfig(function () {
            NA.loadListOfExternalModules(function () {
                NA.startingHttpServer();
                NA.templateEngineConfiguration();
                NA.routesPages();
                NA.emulatedIndexPage();
                NA.httpServerPublicFiles();
                NA.pageNotFound();
                NA.urlGeneratingPages();
            });
        });
    });

    return NA;
};

/**
 * Execute both `NA#config()` and `NA#init()` functions.
 * @public
 * @function run
 * @memberOf NA#
 * @example require('node-atlas').run({
 *        webconfig: "webconfig.alternatif.json",
 *        httpPort: 7778,
 *        generate: true
 * });
 * @return {Object} The NA instance for chained functions.
 */
exports.run = function (config) {
    var NA = this;

    NA.config(config);
    NA.init();

    return NA;
};