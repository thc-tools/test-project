"use strict";

const handleAssets = require("@thc/webpack-quark-assets");
const handleJs = require("@thc/webpack-quark-babel");
const handleCss = require("@thc/webpack-quark-css");
const configEntries = require("@thc/webpack-quark-entry");
const addHotReload = require("@thc/webpack-quark-dev-server");
const addHtmlIndex = require("@thc/webpack-quark-html");
const miscOptions = require("@thc/webpack-quark-misc");
const optimize = require("@thc/webpack-quark-optimize");
const configOutput = require("@thc/webpack-quark-output");
const generateSourcemap = require("@thc/webpack-quark-sourcemap");

const { envDefaults, createConfigurator } = require("@thc/webpack-chemistry");

const enhanceForHotReload = (entries) => {
    return ["webpack-plugin-serve/client"].concat(entries);
};
const DashboardPlugin = require("webpack-dashboard/plugin");

module.exports = (processEnv, argv) => {
    const env = envDefaults(processEnv);
    // Every function accepts a config object
    // Object is gonna be shallow merged with default conf
    // Allow simple filtering, by setting the function as booleanTest && config()
    const hotReload = env.HOT_RELOAD;
    const isProd = env.NODE_ENV === "production";
    const configurator = createConfigurator(
        env, // Environnement variables (used for default values)
        argv, // Argv options given to webpack (not used for now, only for respecting webpack format)
        // List of blocks
        handleJs({
            test: /\.jsx?$/,
            extensions: [".js", ".jsx"],
            babelOptions: {
                presets: [
                    [
                        "@thc/babel-preset-react",
                        {
                            mode: env.NODE_ENV,
                            hot: hotReload,
                        },
                    ],
                ],
                babelrc: false,
            },
        }),
        handleCss({ extractCss: !hotReload }),
        handleAssets({ defaultsExclude: [/\.ejs$/, /\.jsx?$/, /\.css$/, /\.json$/] }),
        configEntries({
            polyfill: ["core-js/stable", "regenerator-runtime/runtime"],
            entries: { main: ["./src/index.js"] },
            enhance: hotReload ? enhanceForHotReload : false,
        }),
        addHotReload({
            hot: hotReload,
            host: env.DEV_SERVER_HOST,
            port: +env.DEV_SERVER_PORT,
            static: env.OUTPUT_DIR,
        }),
        addHtmlIndex(),
        miscOptions({
            analyze: env.ANALYZE,
        }),
        optimize({
            minimize: isProd,
            mode: env.NODE_ENV,
            bail: isProd,
        }),
        configOutput({
            path: env.OUTPUT_DIR,
            publicPath: env.OUTPUT_PUBLIC_PATH,
        }),
        generateSourcemap({
            devtool: isProd ? "none" : "eval-cheap-module-source-map",
            test: /\.jsx?$/,
        })
    );

    // Configurator can take a already built object config to complete
    // const config = { module: { rules: [ test:'lol', loader:'example']}};
    // return configurator(config);
    return configurator();
};
