# Contributing

## Development

### Required environment

- [_Node.js_][node-home]: `6.x.x`
- [_npm_][npm-cli]: `4.x.x`, bundled with Node (check the version)
- [_git_][git-home]: should be in the `PATH`
- [_gulp_][gulp-home]: `npm install -g gulp-cli`
- [_typings_][typings-home]: `npm install -g typings`

### Set-up the project

```shell
git clone https://github.com/o10if/pld-smart-backend.git
cd pld-smart-backend
npm install
```

### Project's lifecycle

#### Build and run

```shell
npm start
```

#### Rebuild on changes

```shell
gulp watch:main
```

#### Run tests

```shell
npm test
```

[node-home]: https://nodejs.org/en/
[node-download]: https://nodejs.org/en/download/
[npm-cli]: https://docs.npmjs.com/cli/npm
[git-home]: https://git-scm.com/
[gulp-home]: http://gulpjs.com/
[typings-home]: https://github.com/typings/typings
[github-workflow]: https://help.github.com/articles/what-is-a-good-git-workflow/
