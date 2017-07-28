'use strict';

var Generator = require('yeoman-generator'),
	mkdirp = require('mkdirp'),
	yosay = require('yosay'),
	chalk = require('chalk');

module.exports = class extends Generator {
	initializing() {
		var message = chalk.yellow.bold('FIRST TEXT LINE') + chalk.yellow('SECOND TEXT LINE');
		this.log(yosay(message, { maxLength: 15 }));
	}

	prompting() {
		return this.prompt([{
			type    : 'input',
			name    : 'name',
			message	: 'What is the name of this new Yeoman generator project?',
			default : this.appname
		}, {
			type    : 'input',
			name	: 'description',
			message	: 'What is the project description?',
			default : this.appname
		}, {
			type    : 'input',
			name	: 'yourname',
			message	: 'What is your name?',
		}, {
			type    : 'input',
			name	: 'youremail',
			message	: 'What is your e-mail address?'
		}, {
			name	: 'version',
			message	: 'What is the version of your app?',
			default: '0.1.0'
		}]).then((answers) => {
			this.appname = answers.name;
			this.appdescription = answers.description;
			this.appauthor = answers.yourname;
			this.youremail = answers.youremail;
			this.appversion = answers.version;
		});
	}

	configuring() {
		this.config.save();
	}

	writing() {
		var destRoot = this.destinationRoot(),
			sourceRoot = this.sourceRoot(),
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

		this.fs.copy(sourceRoot + '/app', destRoot + '/app');
		this.fs.copy(sourceRoot + '/.gitignore', destRoot + '/.gitignore');
		this.fs.copy(sourceRoot + '/package.json', destRoot + '/package.json');
		this.fs.copy(sourceRoot + '/README.md', destRoot + '/README.md');

		// ---------------------------
		// Copy over (template) files
		// ---------------------------

		this.fs.copyTpl(sourceRoot + '/package.json', destRoot + '/package.json', templateContext);
		this.fs.copyTpl(sourceRoot + '/README.md', destRoot + '/README.md', templateContext);
	}

	install() {
		var message = chalk.yellow.bold('FIRST TEXT LINE');
		this.log(yosay(message, { maxLength: 22 }));
	}

	end() {
		// this.spawnCommand('npm', ['install']);
		// this.spawnCommand('gulp', ['serve', 'a-third-argument']);
	}
};