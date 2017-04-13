# Guido Backend

[![Build status](https://img.shields.io/travis/o10if/guido-backend/master.svg?maxAge=2592000)](https://travis-ci.org/o10if/guido-backend)
[![GitHub repository](https://img.shields.io/badge/Github-o10if%2Fguido--backend-blue.svg)](https://github.com/o10if/guido-backend)
[![Documentation](https://img.shields.io/badge/Documentation-o10if.github.io/guido--backend-blue.svg)](https://o10if.github.io/guido-backend/)

Backend for the _Guido_ application.
You can include the library in your project or start it as a standalone API server.

## Getting started

### Requirements

- Node 6
- npm 4
- PostgreSQL

### Installation

```sh
# Run as a simple user
git clone https://github.com/o10if/guido-backend.git
cd guido-backend
npm install
```

### Configuration

You need to provide the `DATABASE_URL` environment variable encoding the database connection
information.

- Linux:

  ```sh
  export DATABASE_URL="postgres://user:password@host:port/dbname"
  ```

- Windows:

  ```batch
  setx DATABASE_URL "postgres://user:password@host:port/dbname"
  ```

You can also set the `PORT` environment variable to change the port used by the API.

### Run

```sh
# Run as a simple user
npm start
```

## Documentation

See [the documentation website](https://o10if.github.io/guido-backend/).

## License

[MIT License](./LICENSE.md)
