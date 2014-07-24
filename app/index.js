'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var FredGenerator = yeoman.generators.Base.extend({
    init: function() {
        this.on('end', function () {
            if (!this.options['skip-install']) {
                this.installDependencies();
            }
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
                type: 'checkbox',
                name: 'dependencies',
                message: 'Select any dependencies you would like to add',
                choices: [
                    {
                        name: 'jQuery',
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
                ]

            }
        ];

        this.prompt(prompts, function (answers) {
            this.projectName = answers.projectName;

            var dependencies = answers.dependencies;

            function useDependency(dep) {
                return dependencies && dependencies.indexOf(dep) !== -1;
            }

            this.include_jQuery = useDependency('include_jQuery');
            this.include_jPanelMenu = useDependency('include_jPanelMenu');
            this.include_jRespond = useDependency('include_jRespond');
            this.include_Mustache = useDependency('include_Mustache');

            done();
        }.bind(this));
    },

    scaffold: function() {
        this.mkdir('src');
        this.mkdir('src/assets');
        this.mkdir('src/assets/scss');
        this.mkdir('src/assets/scss/base');
        this.mkdir('src/assets/scss/global');
        this.mkdir('src/assets/scss/modules');
        this.mkdir('src/assets/scss/pages');
        this.mkdir('src/assets/css');
        this.mkdir('src/assets/images');
        this.mkdir('src/assets/js');
        this.mkdir('src/assets/js/vendor');
        this.mkdir('src/assets/fonts');
        this.mkdir('src/assets/media');
    },

    // makefiles: function() {
    //     this.touch('src/assets/scss/base/_variables.scss');
    // },

    copyFiles: function() {
        this.copy('scss/_main.scss', 'src/assets/scss/main.scss');
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

        this.copy('js/_main.js', 'src/assets/js/main.js');

        var context = {
            site_name: this.projectName,
            include_jQuery: this.include_jQuery,
            include_jPanelMenu: this.include_jPanelMenu,
            include_jRespond: this.include_jRespond,
            include_Mustache: this.include_Mustache
        };

        this.template('_index.html', 'src/index.html', context);

        this.copy('.bowerrc', '.bowerrc');
        this.copy('_package.json', 'package.json');
        this.copy('_Gruntfile.js', 'Gruntfile.js');
    },

    installBowerStuff: function() {

        var bower = {
            name:this.projectName,
            private:true,
            dependencies: {}
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

        bower.dependencies.modernizr = "~2.8.x";

        this.write('bower.json', JSON.stringify(bower, null, 2));
    }
});

module.exports = FredGenerator;
