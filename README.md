# Dutchwebworks template for a Yeoman generator

*By Dennis Burger, november 2016, Waddinxveen*

This Yeoman generator can be used to generate a new (empty) Yeoman generator. So you can build your own Yeoman generator for your next boilerplate project.

## Prerequsites

Make sure the following is installed on your computer.

* [NodeJS](https://nodejs.org/en/).
* [Yeoman](http://yeoman.io) itself, a scaffolding tool.

After you've installed NodeJS you can installl Yeoman by **opening a Terminal** (command-line) window and run:

	npm install yo

## Installing this Yeoman generator template

Download this Yeoman generator by installing it globally `-g` through NPM.

	npm install -g generator-dwwyeoman
    
Now create a new directory `generator-fishtank` (fishtank is will be the name of your new generator) and `cd` into that. Now run:

	yo dwwyeoman

The Yeoman generator will ask a few simple questions after which it generates the required directories and files to get you building your own new Yeoman generator.

## Developing your own new Yeoman generator with boilerplate content

Now you can start building your own boilerplate project inside the Yeoman `/app/templates` directory. Everything inside this directory can be used as boilerplate material for Yeoman when it generates your new project. Look at the template `/app/index.js` file. This contains all the Yeoman **routines** like creating directories, copy over files etc. 

You just need to change and add your own in there.

#### Template context

You can have Yeoman ask certain question during the generating of your new project later on. **The answers to those question can be used as vars. in various template files** in `/app/templates`. Below Yeoman copies the `README.md` file over from the Yeoman `sourceRoot` directory (which is from `/app/templates`) to the final projects `destRoot` directory with a specified file name: `README.md`. It also provides `templateContext`.

	this.fs.copyTpl(sourceRoot + '/README.md', destRoot + '/README.md', templateContext);

When you open the `/app/templates/README.md` template file you'll see familiar templating tags like the following which are replaced with the corresponding answer from Yeoman (see `/app/index.js`) during the scaffolding of the new project.

	<%= appname %>

#### Customize the generated project

When using the Yeoman copy command like above, `this.fs.copyTpl()` with template context, you can use nummerious vars in various files to really personalize the new scaffolded project.

## Testing your new Yeoman generator

First of all you should **customize and test** your newly created Yeoman generator thoroughly. You can do this by linking your local (development) Yeoman generator to your **global NPM list**. From the root of your own Yeoman generator project directory run this on the command-line:

	npm link

This will **first install the required NPM packages** used by Yeoman **and then (sym)link** this Yeoman generator so you can 'use' this generator to create a new project later on elsewhere on your computer.

To view your linked Yeoman generator run:

	npm ls -g --depth=0

As you can see your generator is linked (pointing) to your local development directory.

### New project using the new Yeoman generator

Create a new empty directory elsewhere on your computer and `cd` into that. Now call your new Yeoman generator to scaffold your new project.

	yo fishtank

## Publish your new Yeoman generator to NPM

Once your own Yeoman generator is working you can publish it to NPM so other people can use it.

### Requirements

* Put your Yeoman generator on a **public Github repo**.
* Give the repository a preformatted name, like we used above: `generator-fishtank`, where `fishtank` will be the name of your generator.
* Make sure the `package.json` file contains the correct fields for this new generator below. Note: `fishtank`, `<your-github-name>` and `<your-name>` below. All of this will be used as meta-data on the NPM and Yeoman web site.


    {
        "name": "generator-fishtank",
        "version": "1.0.0",
        "description": "Fishtank project description",
        "main": "app/index.js",
        "repository": {
            "type": "git",
            "url": "https://github.com/<your-github-name>/generator-fishtank.git"
        },
        "bugs": {
            "url": "https://github.com/<your-github-name>/generator-fishtank/issues"
        },
        "homepage": "https://github.com/<your-github-name>/generator-fishtank",
        "files": [
            "app"
        ],
        "keywords": [
            "yeoman-generator",
            "boilerplate"
        ],
        "author": "<your-name>",
        "license": "ISC",
        "dependencies": {
            "chalk": "^1.1.1",
            "mkdirp": "^0.5.1",
            "yeoman-generator": "^0.21.1",
            "yosay": "^1.1.0"
        }
    }

* Replace these with your own info including the great than `<` and smaller than `>` characters.
* Now create a (new) account on https://npmjs.com
* Open a Terminal (command-line) window and enter these commands below.

Fill in the same information as when you just created the NPM account

	npm set init.author.name benjaminlong

And your e-mail address:

	npm set init.author.email benjaminlong@gmail.com

Now on the command-line login to NPM:

	npm login
    
After login you can **finally publish your own Yeoman generator**.

	npm publish
    
## Viewing your new Yeoman generator online

Open the NPM site, go to your **own profile page, there's your new Yeoman generator**. After an hour or so the Yeoman site will also display your own generator as well. Sort the list or search for it.

	http://yeoman.io/generators/
    
## Install your new Yeoman generator from NPM

You don't have to wait for the Yeoman site to list your new Yeoman generator. But first you'll need to **unlink** (remove) your local development Yeoman generator from your **global NPM list**. Otherwise when you use your new Yeoman generator you'll keep receiving your local development generator. And NOT the one coming from the online NPM site.

	npm uninstall -g generator-fishtank

Now install your published NPM version of your own Yeoman generator.

	npm install -g generator-fishtank

Run the command below to list your globally installed NPM packages. As you can see it's now no longer linked to your local directory. But a true global NPM package.

	npm ls -g --depth=0
   
## Using your new Yeoman generator from NPM

Create a new (empty) directory and `cd` into it. Now use your new Yeoman generator.

	yo fishtank
    
You'll be greeded by Yeoman again after answering his questions and your on your way with a new project.