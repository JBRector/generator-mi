'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var pkg = require('../package.json');


var MSGenerator = yeoman.generators.Base.extend({
    init: function() {
        this.on('end', function () {
            this.npmInstall();
        });
    },

    promptUser: function() {
        var done = this.async();

        console.log(this.yeoman);

        // Prompt user to choose options
        var prompts = [
            {
                name: 'projectName',
                message: 'What is the name of the project?'
            },
            {
                type: 'confirm',
                name: 'use_Jade',
                value: 'use_Jade',
                message: 'Use Jade?',
                default: false
            },
        ];

        this.prompt(prompts, function (answers) {
            this.projectName =      answers.projectName;
            this.use_Jade =         answers.use_Jade;
            done();
        }.bind(this));
    },

    scaffold: function() {
        // Create all of the needed directories
        this.mkdir('source');
        this.mkdir('source/scripts');
        this.mkdir('source/styles');
        this.mkdir('source/styles/global');
        this.mkdir('source/styles/utils');
        this.mkdir('source/styles/utils/functions');
        this.mkdir('source/styles/utils/mixins');
        this.mkdir('source/styles/components');
        this.mkdir('source/styles/components/basics');
        this.mkdir('source/styles/components/fragments');
        this.mkdir('source/styles/components/modules');
        this.mkdir('source/styles/components/templates');
        this.mkdir('source/styles/components/pages');
        this.mkdir('source/styles/vendor');
        this.mkdir('source/images');
        this.mkdir('source/views');
        this.mkdir('gulp');

        if (this.use_Jade) {
            this.mkdir('source/views/mixins');
            this.mkdir('source/views/templates');
        } else {
            this.mkdir('source/views/partials');
        }
    },

    copyFiles: function() {

        // Copy views
        if (this.use_Jade) {
            this.copy('source/views/mixins/_if-ie.jade', 'source/views/mixins/if-ie.jade');
            this.copy('source/views/_index.jade', 'source/views/index.jade');
        } else {
            this.copy('source/views/partials/_footer.html', 'source/views/partials/_footer.html');
            this.copy('source/views/partials/_header.html', 'source/views/partials/_header.html');
            this.copy('source/views/_index.html', 'source/views/index.html');
        }

        // Copy gulp files
        this.copy('_gulpfile.js', 'gulpfile.js');
        this.copy('gulp/_common.js', 'gulp/common.js');
        this.copy('gulp/_config.js', 'gulp/config.js');
        this.copy('gulp/_images.js', 'gulp/images.js');
        this.copy('gulp/_scripts.js', 'gulp/scripts.js');
        this.copy('gulp/_styles.js', 'gulp/styles.js');

        // Copy script and sass files
        this.copy('source/scripts/_main.js', 'source/scripts/main.js');
        this.copy('source/styles/_main.scss', 'source/styles/main.scss');
        this.copy('source/styles/global/_base.scss', 'source/styles/global/_base.scss');
        this.copy('source/styles/global/_normalize.scss', 'source/styles/global/_normalize.scss');
        this.copy('source/styles/global/_shame.scss', 'source/styles/global/_shame.scss');
        this.copy('source/styles/global/_trumps.scss', 'source/styles/global/_trumps.scss');
        this.copy('source/styles/global/_vars.scss', 'source/styles/global/_vars.scss');
        this.copy('source/styles/utils/functions/_em.scss', 'source/styles/utils/functions/_em.scss');
        this.copy('source/styles/utils/functions/_map-getters.scss', 'source/styles/utils/functions/_map-getters.scss');
        this.copy('source/styles/utils/functions/_valid-value.scss', 'source/styles/utils/functions/_valid-value.scss');
        this.copy('source/styles/utils/mixins/_attention.scss', 'source/styles/utils/mixins/_attention.scss');
        this.copy('source/styles/utils/mixins/_centerer.scss', 'source/styles/utils/mixins/_centerer.scss');
        this.copy('source/styles/utils/mixins/_clearfix.scss', 'source/styles/utils/mixins/_clearfix.scss');
        this.copy('source/styles/utils/mixins/_hide-text.scss', 'source/styles/utils/mixins/_hide-text.scss');
        this.copy('source/styles/utils/mixins/_reset.scss', 'source/styles/utils/mixins/_reset.scss');
        this.copy('source/styles/utils/mixins/_spacing.scss', 'source/styles/utils/mixins/_spacing.scss');
        this.copy('source/styles/components/basics/_buttons.scss', 'source/styles/components/basics/_buttons.scss');
        this.copy('source/styles/components/basics/_headings.scss', 'source/styles/components/basics/_headings.scss');
        this.copy('source/styles/components/basics/_inputs.scss', 'source/styles/components/basics/_inputs.scss');
        this.copy('source/styles/components/basics/_labels.scss', 'source/styles/components/basics/_labels.scss');
        this.copy('source/styles/components/basics/_links.scss', 'source/styles/components/basics/_links.scss');
        this.copy('source/styles/components/basics/_lists.scss', 'source/styles/components/basics/_lists.scss');
        this.copy('source/styles/components/basics/_logo.scss', 'source/styles/components/basics/_logo.scss');
        this.copy('source/styles/components/basics/_paragraph.scss', 'source/styles/components/basics/_paragraph.scss');
        this.copy('source/styles/components/basics/_radio.scss', 'source/styles/components/basics/_radio.scss');
        this.copy('source/styles/components/basics/_select.scss', 'source/styles/components/basics/_select.scss');
        this.copy('source/styles/components/basics/_table.scss', 'source/styles/components/basics/_table.scss');
        this.copy('source/styles/components/basics/_textarea.scss', 'source/styles/components/basics/_textarea.scss');
        this.copy('source/styles/components/fragments/_form.scss', 'source/styles/components/fragments/_form.scss');
        this.copy('source/styles/components/fragments/_navigation.scss', 'source/styles/components/fragments/_navigation.scss');
        this.copy('source/styles/components/modules/_header.scss', 'source/styles/components/modules/_header.scss');
        this.copy('source/styles/components/modules/_footer.scss', 'source/styles/components/modules/_footer.scss');

        // For files that need info from yeoman, use .template instead of .copy.
        var context = {
            site_name:      this.projectName,
            site_slug:      this.convertToSlug(this.projectName),
            use_Jade:       this.use_Jade
        };

        if (this.use_Jade) {
            this.template('source/views/templates/_master.jade', 'source/views/templates/master.jade', context);
        } else {
            this.template('source/views/partials/_head.html', 'source/views/partials/_head.html', context);
            this.template('gulp/_watching.js', 'gulp/watching.js', context);
        }

        this.template('gulp/_templates.js', 'gulp/templates.js', context);
        this.template('_README.md', 'README.md', context);

        if (this.use_Jade) {
            this.template('_package-Jade.json', 'package.json', context);
        } else {
            this.template('_package.json', 'package.json', context);
        }

        // Copy npm and git files
        this.copy('_.gitignore', '.gitignore');
        this.copy('_.eslintrc.js', '.eslintrc.js');
        this.copy('_.sass-lint.yml', '.sass-lint.yml');
    },

    // Convert string to URL-friendly slug
    convertToSlug: function(str) {
        if (str) {
            return str
                .toLowerCase()
                .replace(/ /g,'-')
                .replace(/[^\w-]+/g,'');
        }
    }

});

module.exports = MSGenerator;
