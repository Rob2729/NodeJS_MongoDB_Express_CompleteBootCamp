# NodeJS Express MongoDB & More Bootcamp

## Course Link

- https://www.udemy.com/course/nodejs-express-mongodb-bootcamp/

## Node Documentation

The node documentation can be found at this link:

1. https://nodejs.org/dist/latest-v12.x/docs/api/

## NPM Documentation

NPM is the package manager for managing open source modules.

1. https://www.npmjs.com/

## NPM packages

Packages come in version that look like "1.5.31".

1. 1 is the <b>major</b> version
2. 5 is the <b>minor</b> versions
3. 31 is the <b>patch</b> version

- The ^ symbol before the version means it will check for all the minor versions when comparing to see if it is outdated.
- The ~ symbol can be used to check for only newer patch versions.
- The \* will check for all newer versions - however this could break your code due to new versions.

## NPM commands

Install module dependency

```
npm install <packageName>
or
npm i <packageName>
```

Install dev-dependency

```
npm install <packageName> --save-dev
```

Install global dependency

```
npm i <packageName> --global
```

Check for all outdated packages

```
npm outdated
```

Update Package

```
npm update <packageName>
```

Choose Version to install

```
npm install <packageName>@<versionNumber>
```

Uninstall package

```
npm uninstall <packageName>
```

## NPM Best Practice

Do not share the node_modules folder, it is best practice to just leave that out becuase it can be easily recovered by using the following command aslong as the package.json and package-lock.json file exists in the repo.

```
npm install
```

## About

This bootcamp is to help build up knowledge and skills within the following areas: NodeJS, MongoDB and Express.

## Express / Middleware

Express is a routing and middleware web framework that has minimum functionality of it's own.

<i>Middleware</i> functions are functions that have access to the request object (req), the response(res), and the next middlewasre function in the application's request-response cycle.

## Routing

### Params

We can add a parameter to the route by doing the following.

- Mandatory Param : <i>:id</i>
- Optional Param : <i>:id?</i>

## eslint

ESLint analyzes yout code to quickly find problems. It can be used to configure your text editor however you wise with settings files (e.g in 4-natuours folder).
The website (find in useful links) will outline all of the settings that can be set.

## Sending Emails

we should avoid using gmail where possible as there is a limit of 500 emails per day. and this could result in being listed as a spam.

some alternatives are:

1. sendgrid
2. mailgun

## Useful Links

1. https://github.com/jonasschmedtmann/complete-node-bootcamp
2. http://codingheroes.io/resources/
3. https://expressjs.com/
4. https://eslint.org/
5. https://mongoosejs.com/docs/api.html
6. https://github.com/validatorjs/validator.js?files=1
7. https://jwt.io/
8. https://www.npmjs.com/package/jsonwebtoken
9. https://mailtrap.io
10. https://github.com/helmetjs/helmet
