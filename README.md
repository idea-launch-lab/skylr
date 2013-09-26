Introduction
============
Prototype playground for data storage service.

HTTP API for storing a variety of data types.

Installation
============

* install node 10
* install monogodb
* install neo4j
* git clone las-instr-fep
* cd las-instr-fep
* npm install (repeatedly if necessary)
* npm install mocha -g
* mkdir data
* fix restler for node 10:
*  mv lib/reslter-for-node10.js node_modules/restler/lib/restler.js
*   see https://github.com/danwrong/restler/pull/113/files for details.
* in test/tutil.js, make embedded : true
* NODE_ENV=data mocha

