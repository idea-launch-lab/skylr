#!/usr/bin/env bash
echo "This will run a druid realtime node."
set +u
shopt -s xpg_echo
shopt -s expand_aliases
trap "exit 1" 1 2 3 15


SCRIPT_DIR=`dirname $0`
CURR_DIR=`pwd`
cd ${SCRIPT_DIR}
SCRIPT_DIR=`pwd`
cd ${CURR_DIR}

CONFIG_DIR=${SCRIPT_DIR}/kafka
SPEC_FILE=${CONFIG_DIR}/realtime.spec
echo Using spec file: $SPEC_FILE

# check spec file exists
[ ! -e ${SPEC_FILE} ]  &&  echo "Expecting file ${SPEC_FILE} to exist, it didn't"  &&  exit 3

#  start process
JAVA_ARGS="-Xmx256m -Duser.timezone=UTC -Dfile.encoding=UTF-8"
JAVA_ARGS="${JAVA_ARGS} -Ddruid.realtime.specFile=${SPEC_FILE}"

DRUID_CP=.
DRUID_CP=${DRUID_CP}:${SCRIPT_DIR}/lib/*
DRUID_CP=${DRUID_CP}:${SCRIPT_DIR}/config/realtime

echo "Running command:"

(set -x; java ${JAVA_ARGS} -classpath ${DRUID_CP} com.metamx.druid.realtime.RealtimeMain)




