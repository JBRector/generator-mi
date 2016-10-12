# Mindstream Interactive Front-End Starter

### A Front-End [Yeoman](http://yeoman.io) Generator for Mindstream Interactive projects

#### Current Version: 1.2.0

This generator uses a modified version of the [Front-End Boilerplate](https://github.com/myasonik/Front-end_Boilerplate) project originally created by [Michail Yasonik](https://github.com/myasonik)

## Features

- Uses [Sass](http://sass-lang.com/) for CSS preprocessing
- Can use either [Jade](http://jade-lang.com/) or [HTML includes](https://www.npmjs.com/package/gulp-file-include) for templating
- Uses [Browserify](http://browserify.org/) to manage and bundle js dependencies
- Uses [Breakpoint Sass](http://breakpoint-sass.com/)
- A Gulp task to fire up a local server for development with automatic reloading on save
- A Gulp production task to minimize images, concatenate and minify js and css, and compile HTML.

## Getting Started

### Dependencies

- [nodejs](https://nodejs.org/)
- [Yeoman](http://yeoman.io) - `npm install yo -g`
- [Gulp](http://gulpjs.com/) - `npm install gulp -g`
- [Jade](http://jade-lang.com/) - `npm install jade` (optional)

## Usage

Install - `npm install -g generator-mi`

Generate a new project - `cd` in to project directory and `yo mi`.

The generator will pull down necessary files and automatically run `npm install` for you.

Build the site: `gulp`

To start a local development server with node: `gulp watch`

To build for production: `gulp prod`
