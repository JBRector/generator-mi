'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var FredGenerator = yeoman.generators.Base.extend({
    init: function() {
        this.on('end', function () {
            this.installDependencies({
                skipInstall: this.options['skip-install'],
                callback: function() {
                    this.spawnCommand('grunt', ['bowerclean']);
                }.bind(this)
            });
        });
    },

    promptUser: function() {
        var done = this.async();

        console.log(this.yeoman);

        var prompts = [
            {
                name: 'projectName',
                message: 'What is the name of the project?'
            },
            {
                type: 'confirm',
                name: 'include_Bootstrap',
                value: 'include_Bootstrap',
                message: 'Include Bootstrap?',
                default: false
            },
            {
                type: 'checkbox',
                name: 'dependencies',
                message: 'Select any dependencies you would like to add',
                choices: [
                    {
                        name: 'jQuery (required if using bootstrap)',
                        value: 'include_jQuery',
                        checked: true
                    },
                    {
                        name: 'jPanelMenu',
                        value: 'include_jPanelMenu',
                        checked: false
                    },
                    {
                        name: 'jRespond',
                        value: 'include_jRespond',
                        checked: false
                    },
                    {
                        name: 'Mustache',
                        value: 'include_Mustache',
                        checked: false
                    },
                    {
                        name: 'Handlebars',
                        value: 'include_Handlebars',
                        checked: false
                    },
                    {
                        name: 'Underscore',
                        value: 'include_Underscore',
                        checked: false
                    },
                    {
                        name: 'Respond.js (IE8 and earlier only)',
                        value: 'include_Respond',
                        checked: false
                    },
                ]
            },
            {
                type: 'confirm',
                name: 'include_Imageoptim',
                value: 'include_Imageoptim',
                message: chalk.green('The grunt build task uses ImageOptim to optimize images.\n\n') + chalk.green('Do you have ImageOptim installed?\n(If not, I will disable that part of the grunt task)'),
                default: false
            }
        ];

        this.prompt(prompts, function (answers) {
            this.projectName = answers.projectName;
            this.include_Bootstrap = answers.include_Bootstrap;

            var dependencies = answers.dependencies;

            function useDependency(dep) {
                return dependencies && dependencies.indexOf(dep) !== -1;
            }

            this.include_jQuery = useDependency('include_jQuery');
            this.include_jPanelMenu = useDependency('include_jPanelMenu');
            this.include_jRespond = useDependency('include_jRespond');
            this.include_Mustache = useDependency('include_Mustache');
            this.include_Handlebars = useDependency('include_Handlebars');
            this.include_Underscore = useDependency('include_Underscore');
            this.include_Respond = useDependency('include_Respond');

            this.include_Imageoptim = answers.include_Imageoptim;

            done();
        }.bind(this));
    },

    scaffold: function() {
        this.mkdir('src');
        this.mkdir('src/assets');
        this.mkdir('src/assets/scss');
        this.mkdir('src/assets/css');
        this.mkdir('src/assets/images');
        this.mkdir('src/assets/js');
        this.mkdir('src/assets/js/vendor');
        this.mkdir('src/assets/fonts');
        this.mkdir('src/assets/media');

        if (!this.include_Bootstrap) {
            this.mkdir('src/assets/scss/base');
            this.mkdir('src/assets/scss/global');
            this.mkdir('src/assets/scss/modules');
            this.mkdir('src/assets/scss/pages');
        }
    },

    // makefiles: function() {
    //     this.touch('src/assets/scss/base/_variables.scss');
    // },

    copyFiles: function() {


        if (this.include_Bootstrap) {
            this.copy('scss/_theme.scss', 'src/assets/scss/_theme.scss');
        } else {
            this.copy('scss/_variables.scss', 'src/assets/scss/base/_variables.scss');
            this.copy('scss/_mixins.scss', 'src/assets/scss/base/_mixins.scss');
            this.copy('scss/_base.scss', 'src/assets/scss/base/_base.scss');
            this.copy('scss/_type.scss', 'src/assets/scss/global/_type.scss');
            this.copy('scss/_layout-helpers.scss', 'src/assets/scss/global/_layout-helpers.scss');
            this.copy('scss/_structure.scss', 'src/assets/scss/global/_structure.scss');
            this.copy('scss/_spacing.scss', 'src/assets/scss/global/_spacing.scss');
            this.copy('scss/_buttons.scss', 'src/assets/scss/global/_buttons.scss');
            this.copy('scss/_forms.scss', 'src/assets/scss/global/_forms.scss');
            this.copy('scss/_header.scss', 'src/assets/scss/modules/_header.scss');
            this.copy('scss/_footer.scss', 'src/assets/scss/modules/_footer.scss');
            this.copy('scss/_navigation.scss', 'src/assets/scss/modules/_navigation.scss');
            this.copy('scss/_home.scss', 'src/assets/scss/pages/_home.scss');
        }

        var context = {
            site_name: this.projectName,
            include_Bootstrap: this.include_Bootstrap,
            include_jQuery: this.include_jQuery,
            include_jPanelMenu: this.include_jPanelMenu,
            include_jRespond: this.include_jRespond,
            include_Mustache: this.include_Mustache,
            include_Handlebars: this.include_Handlebars,
            include_Underscore: this.include_Underscore,
            include_Respond: this.include_Respond,
            include_Imageoptim: this.include_Imageoptim
        };

        this.template('_index.html', 'src/index.html', context);
        this.template('_Gruntfile.js', 'Gruntfile.js', context);
        this.template('scss/_main.scss', 'src/assets/scss/main.scss', context);
        this.template('js/_main.js', 'src/assets/js/main.js', context);

        this.copy('_.gitignore', '.gitignore');
        this.copy('.bowerrc', '.bowerrc');
        this.copy('_package.json', 'package.json');
        this.copy('editorconfig', 'editorconfig');
    },

    installBowerStuff: function() {

        var bower = {
            name:this._.slugify(this.projectName),
            private:true,
            dependencies: {}
        };

        if (this.include_Bootstrap) {
            var bs = 'bootstrap-sass-official';
            bower.dependencies[bs] = "~3.2.0";
        };

        if (this.include_jQuery) {
            bower.dependencies.jquery = "~1.11.x";
        };

        if (this.include_jPanelMenu) {
            bower.dependencies.jpanelmenu = "~1.2.x";
        };

        if (this.include_jRespond) {
            bower.dependencies.jrespond = "https://raw.githubusercontent.com/ten1seven/jRespond/master/js/jRespond.min.js";
        };

        if (this.include_Mustache) {
            bower.dependencies.mustache = "*";
        };

        if (this.include_Handlebars) {
            bower.dependencies.handlebars = "1.3.x";
        };

        if (this.include_Underscore) {
            bower.dependencies.underscore = "1.6.x";
        };

        if (this.include_Respond) {
            bower.dependencies.respond = "1.4.x";
        };

        bower.dependencies.modernizr = "~2.8.x";

        this.write('bower.json', JSON.stringify(bower, null, 2));
    }
});

module.exports = FredGenerator;
