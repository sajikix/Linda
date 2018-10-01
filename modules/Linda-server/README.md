# Linda-server

## About

This is a new node-Linda server.

### What is Linda?

[See wiki](https://ja.wikipedia.org/wiki/Linda)

## Requirements

- node v8.9.1~
- TypeScript v2~
- (MongoDB v3)

## Install&Build

### Install

```
$ git clone https://github.com/saji-ryu/Linda-server
$ cd Linda-server
$ npm install
```

### Settings

#### port number

- make `.env` file in root directory
- set port numbert like `PORT = 3000` (default is 3000)

#### use MemoryDB

If you want to use MemoryDB, please change `src/tupleSpace.ts:13`

```
import storageClient from "./dbclient/mongoDBClient";
↓
import storageClient from "./dbclient/memoryClient";
```

#### use MongoDB

Set mongoURI and DB-name in `.env` file like

```
MONGODB_URI = "mongodb://[URI]/[DB-name]
```

### Build

`$ npm run build`

### start

`$ npm run start`

## License

MIT
