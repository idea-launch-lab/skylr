Skylr
====================================================

A network component for recording and visualizing unstructured events.

Installation
------------

To install Skylr

* git clone git@github.com:stevencox/skylr.git
* export SKYLR_HOME=/path/to/skylr
* export SKYLR_APP=/path/to/skylr_stack # path where apps will be installed.
* cd skylr
* source env.sh
* skylr install all

This last line will download and install dependencies. Everything is installed relative to $SKYLR_APP.

Running
=======

Skylr requires its storage engines to be running before the server starts.

To run Skylr, run each of these in a separate shell (if in interactive mode):
* __skylr db start__ runs mongo.
* __skylr zk start__ runs a zookeeper node.
* __skylr kafka start__ runs an Apache Kafka server.
* __skylr druid r start__ runs a Metamarkets Druid Runtime server.
* __skylr app start__ runs node which connects to the above servers.

Tests
=====

To run Skylr tests

* skylr app tests











