Skylr
====================================================

A network component for recording and visuzlizing unstructured events.

Installation
------------

To install Skylr

* git clone git@github.com:stevencox/skylr.git
* export SKYLR_HOME=<path>/skylr
* export SKYLR_APP=<path> # path where apps will be installed.
* cd skylr
* source env.sh
* skylr install all

This last line will download and install software dependencies. Everything is installed relative to the root directory.

Always source env.sh to get the Skylr environment.

Running
=======

Skylr requires its storage engines to be running before the server starts.

To run Skylr (run each of these in a separate shell if in interactive mode):

* skylr db start
* skylr zk start
* skylr kafka start
* skylr druid r start # realtime node.
* skylr app start

__skylr db start__ runs mongo.
__skylr zk start__ runs a zookeeper node.
__skylr kafka start__ runs an Apache Kafka server.
__skylr druid r start__ runs a Metamarkets Druid Runtime server.
__skylr app start__ runs node which connects to the above servers.

Tests
=====

To run Skylr tests

* skylr app tests











