module.exports = {
    watch: false,
    prod: false,
    src: 'source/',
    dest: './output/',
    contentDir: './output/Content/',
    outputJadeIncludes: true,
    watchDest: ['output/**/*', '!output/**/*.html'],
    extensionlessRoutes: false // WARNING: Experimental
};
