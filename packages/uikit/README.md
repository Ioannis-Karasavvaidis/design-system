# Puppet UI Toolkit!

A toolkit for generating React projects, components, etc.

## Prerequisites

Install a recent version of Node.js (including npm), typically the latest LTS version, e.g.:

```sh
brew install node@10
```

## Installation

To install uikit (or update it to the latest version) globally, making the `uikit` command available in your shell:

```sh
npm install -g @puppet/uikit
```

## Generators

The uikit includes a script for generating arbitrary boilerplate through template files. Available templates:

- **Project**: `uikit generate project my-project`
  Generates a puppet React project
- **Page**: `uikit generate page MyPage`
  Run from the root of a project (generated with the above command). Creates a route, item in navigation, and view component for a new page.
- **Component**: `uikit generate component MyComponent`
  Generates component boilerplate, including a test and scss file
- **Method**: `uikit generate method myMethod`
  Generates utility method boilerplate
- **Library**: `uikit generate library my-library`
  Generates a React library appropriate for publishing as a consumable package

### Specifying a directory:

By default the script will generate the template in the current working directory. Optionally you may specify a path to another directory with the `--directory` (`-d`) option:

```sh
uikit generate <template> <name> -d <path to directory>
```

### Sass modules

Passing a `--modules=true` or `-m` option will generate code with scss module support

## Contributing

### Filing issues

uikit and other design-system projects use the Puppet Design System project in Jira for tracking tickets: <https://tickets.puppetlabs.com/browse/PDS>

### Local uikit for development

If you want to develop in this project but still want access to the scripts globally, clone this repo then run:

```sh
npm link
```

Then any script run with `uikit <command>` will access the most recent code in your local repo.

### Adding a generator

The uikit generator script will execute a command of the form `uikit generate <template> <name>` if there is a matching template in `/templates` and the specified template is 'registered' as a valid cli option.

To create a new generator template:

1.  Add the name of your template to `TEMPLATE_OPTIONS` in `bin/uikit.js`.
2.  Create a directory with your desired template files. If a file in your template has the `.handlebars` extension, the generator script will compile it as a handlebars template, stripping the `.handlebars` extension from the filename. The handlebars template will have access to the following variables:

- `name`: An object with name variants derived from the CLI argument:
  - `name.original`: The unmodified CLI argument
  - `name.humanized`: Capitalized words with spaces (e.g. `My Component`)
  - `name.pascalized`: Upper camel-cased aka Pascal cased name (e.g. `MyComponent`)
  - `name.camelized`: Lower camel-cased name (e.g. `myComponent`)
  - `name.dasherized`: Kebab-cased name (e.g. `my-component`)

In addition, the filename itself of `.handlebars` files will be compiled as a handlebars template. This is useful if you want to generate named files such as `MyComponent.jsx`.

3. Optionally, add a `.uikitrc.js` file to the template directory. The file should optionally export a `preGenerate` and `postGenerate` action, each passed the destination directory of the resulting templated output.

```js
module.exports = {
  preGenerate({ dest }) {
    // ...
  },
  postGenerate({ dest }) {
    // ...
  },
};
```
