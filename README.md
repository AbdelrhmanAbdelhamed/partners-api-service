# Partners Service

## Description

> Our CEO, Rami,  would like to reach out to our partners with offices within a given range of Starbucks Cafe Central London (51.5144636,-0.142571), to invite them for a business meal on Monday at noon. Your help is much appreciated here, as we need to have an intuitive UI that calls an API to show the contact details of those partners, within a given range (in kilometers). You’re expected to build your solution using Typescript, NodeJS, and React/Angular. Your API should read the list of partners (from the attached JSON file), and return the company names and addresses of the matching partners (with offices within the given range in kilometers) sorted by company name in ascending order.


## How to use

1. git clone the repo
2. Install mkcert, docker and docker-compose in your machine
3. `cd` into the root directory and run the installer script `./install.sh` (Support Unix based OS only)
4. Now you can reach the api by access nginx gateway through `https://partners.local.com/` (PORT 80)
5. Configurations can be found in `.env.local` (root directory)

## Features

1. Full development environment out of the box using `docker` and `docker-compose`
2. Redis as cache layer
3. Good code coverage unit testing for the main parts
4. Rate limiter using `@nestjs/throttler`
5. Local git hooks for `linting` and `testing` using `yorkie` and `lint-staged`
6. Git actions workflow for PR reviews (`linting` and `testing`)
7. Some `SOLID` principles
8. Some patterns like `repository`
9. Logging all requests and responses
10. i18n translation support




## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Docs

- Import `partners-api-service.postman_collection.json` into postman (found in the root dir)
- Navigate to `https://partners.local.com/docs`

| Endpoint  | Usage  | Example  |
|--- |--- |--- |
| `GET` /  | Health check  | <https://partners.local.com> (<localhost:7000>) <182.39.0.53>  |
| `GET` /api/v1/partners  | Return a list of partners and can be optionally filtered by `reference` and `range`  | <https://partners.local.com/partners?reference=51.5144636,-0.142571&range=5.13&page=1&limit=2&sort=organization&desc=false> (<localhost:7006/partners?reference=51.5144636,-0.142571&range=5.13&page=1&limit=2&sort=organization&desc=false>) <182.39.0.172/partners?reference=51.5144636,-0.142571&range=5.13&page=1&limit=2&sort=organization&desc=false> |

## Stay in touch

- Author - [Abdelrahman Abdelhamed](https://www.linkedin.com/in/abdelrahman-abdelhamed/)

## License

[MIT licensed](LICENSE).
