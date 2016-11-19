'use strict';

var generators = require('yeoman-generator'),
	mkdirp = require('mkdirp'),
	yosay = require('yosay'),
	chalk = require('chalk');

module.exports = generators.Base.extend({
	_createProjectFileSystem: function() {
		var destRoot = this.destinationRoot(),
			sourceRoot = this.sourceRoot(),
			appDir = destRoot + '/app',
			templateContext = {
				appname: this.appname,
				appdescription: this.appdescription,
				appauthor: this.appauthor,
				youremail: this.youremail,
				appversion: this.appversion				
			};

		// ---------------------------
		// Copy over files and directories
		// ---------------------------

		mkdirp(appDir + '/templates');
		this.fs.copy(sourceRoot + '/app/index.js', appDir + '/index.js');
		this.fs.copy(sourceRoot + '/.gitignore', destRoot + '/.gitignore');

		// ---------------------------
		// Copy over (template) files with context
		// ---------------------------

		this.fs.copyTpl(sourceRoot + '/package.json', destRoot + '/package.json', templateContext);
		this.fs.copyTpl(sourceRoot + '/README.md', destRoot + '/README.md', templateContext);
	},
	_getPrompt: function() {
		var prompts = [
				{
					name: 'name',
					message: 'What is the name of this new Yeoman generator project?',
					default: this.appname
				},
				{
					name: 'description',
					message: 'What is the project description?',
				},
				{
					name: 'yourname',
					message: 'What is your name?',
				},
				{
					name: 'youremail',
					message: 'What is your e-mail address?',
				},
				{
					name: 'version',
					message: 'What is the version of your app?',
					default: '1.0.0'
				}
			];

			return prompts;
	},
	_saveAnswers: function(answers, callback) {
		this.appname = answers.name;
		this.appdescription = answers.description;
		this.appauthor = answers.yourname;
		this.youremail = answers.youremail;
		this.appversion = answers.version;
		callback();
	},
	initializing: function() {
		var message = chalk.yellow.bold('Welcome to Dutchwebworks Yeoman template ') + chalk.yellow('A starter kit for new Yeoman generators');
		this.log(yosay(message, { maxLength: 16 }));
	},
	promting: function() {
		var done = this.async();

		this.prompt(this._getPrompt(), function(answers){			
			this._saveAnswers(answers, done);
		}.bind(this));
	},
	configuring: function() {
		this.config.save();
	},
	writing: function() {
		this._createProjectFileSystem();
	},
	install: function() {
		var message = chalk.yellow.bold('All done, now buld a new Yeoman generator');
		this.log(yosay(message, { maxLength: 22 }));
	}
});