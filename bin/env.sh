########################################################################################
##
## Copyright Renaissance Computing Institute (c) 2013
##
## Configure and install LAS Instrumentation Services
##
########################################################################################

# Configure basic directories.
topdir=$PWD
app=$topdir/app
pub=$topdir/pub
var=$topdir/var

# Make some if they're not there.
mkdir -p $pub
mkdir -p $var/mongo
mkdir -p $app

# Set location to download packages from.
dist=http://people.renci.org/~scox/las/dist
noarchdist=$dist
packages=""

# Figure out which operating system we're on.
os=$(uname -a | sed -e "s, .*,,g")

# Encapsulate details of how we figure out platform.
is_mac () {
    if [ "x$os" == "xDarwin" ]; then    
	return 0
    else
	return 1
    fi
}

if is_mac; then    
    dist="$dist/mac"
fi


# Set the default environment.
export LAS_ENV=local

# Set paths that will determine where we find stuff.

# Linux
las_setup_linux () {
    # Node
    NODE_HOME=$app/node-v0.10.22-linux-x64
    export PATH=$NODE_HOME/bin:$PATH
    
    # Java
    JAVA_HOME=$app/jdk1.7.0_45
    export PATH=$JAVA_HOME/bin:$PATH

    # Mongo
    MONGO_HOME=$app/mongodb-linux-x86_64-2.4.8
    export PATH=$MONGO_HOME/bin:$PATH
}

# Mac OS - 
las_setup_mac () {
    # Node
    NODE_HOME=$app/node-v0.10.22-darwin-x64
    export PATH=$NODE_HOME/bin:$PATH
    
    # Mongo
    MONGO_HOME=$app/mongodb-osx-x86_64-2.4.8
    export PATH=$MONGO_HOME/bin:$PATH
    
}

# Architecture independent
las_setup_noarch () {

    # Kafka
    KAFKA_HOME=$app/kafka-0.7.2-incubating-bin
    export PATH=$PATH:$KAFKA_HOME/bin

    # Druid
    DRUID_HOME=$app/druid-services-0.5.58
    export PATH=$PATH:$DRUID_HOME/bin

    # Neo4J
    NEO4J_HOME=$app/neo4j-community-2.0.0-M06
    export PATH=$NEO4J_HOME/bin:$PATH
    
    # Selenium
    SELENIUM_JAR=$app/selenium-server-standalone-2.37.0.jar
}

# Configure paths and environment variables in an OS specific way
las_setup () {
    if [ "x$os" == "xDarwin" ]; then
	las_setup_mac
    else
	las_setup_linux
    fi
    las_setup_noarch
}
las_setup

##=================================================================================
##== Installation Support
##=================================================================================

# Install redis (rhel)
install_redis () {
    wget http://dl.fedoraproject.org/pub/epel/6/x86_64/epel-release-6-8.noarch.rpm
    wget http://rpms.famillecollet.com/enterprise/remi-release-6.rpm
    sudo rpm -Uvh remi-release-6*.rpm epel-release-6*.rpm
    sudo yum install redis -y
}

# Add a package to the list of packages we'll install.
add_package () {
    packages="$packages ${dist}/$1"
}
add_noarch_package () {
    packages="$packages ${noarchdist}/$1"
}

# Fetch and store a package.
download_package () {
    cd $pub
    wget --timestamping $1
}

# Unpack a fetched package.
install_package () {
    package=$1
    archive=$(basename $1)
    cd $app
    
    if [ "$(echo $archive | grep -c .jar)" == 0 ]; then
	# Unpack tar archives.
	echo "--installing $pub/$archive"
	tar xvzf $pub/$archive
    else
	# Move Java JAR files whole.
	echo "--installing $pub/$archive"
	cp $pub/$archive $app
    fi
}

# Configure OS appropriate binary packages.
if is_mac; then
    # Java: No archive for MacOS - install Java by hand.
    # http://www.oracle.com/technetwork/java/javase/downloads/jdk7-downloads-1880260.html
    add_package mongodb-osx-x86_64-2.4.8.tgz
    add_package neo4j-community-2.0.0-M06-unix.tar.gz
    add_package node-v0.10.22-darwin-x64.tar.gz
else
    add_package jdk-7u45-linux-x64.tar.gz
    add_package mongodb-linux-x86_64-2.4.8.tgz
    add_package node-v0.10.22-linux-x64.tar.gz
    add_package neo4j-community-2.0.0-M06-unix.tar.gz
fi
# Same in all environments
add_noarch_package selenium-server-standalone-2.37.0.jar
add_noarch_package kafka-0.7.2-incubating-bin.tar.gz
add_noarch_package druid-services-0.5.58-bin.tar.gz

kill_app () {
    pid=$(ps -ef | grep $1 | grep -v grep | awk '{ print $2 }')
    if [ ! -z "$pid" ]; then
	kill -9 $pid
    fi
}

# LAS control 
function las () {

    # Print user help.
    help () {
	echo ""
	echo "LAS commands install and manage the server."
	echo "   las show packages - List all packages to be installed."
	echo "   las at local      - Configure a local development environment."
	echo "   las at dev        - Configure a development integration server."
	echo "   las at prod       - Configure a production system."
	echo "   las install all   - Install all packages and the code."
	echo "   las install clean - Delete all packages and code."
	echo "   las db start      - Start the document store (mongodb)."
	echo "   las db start      - Stop the document store."
	echo "   las graph start   - Start the graph store (neo4j)."
	echo "   las graph stop    - Stop the graph store (neo4j)."
	echo "   las app start     - Start the server (node)."
	echo "   las app stop      - Stop the server."
	echo "   las app tests     - Run the automated tests."
	echo ""
	echo "   las zk start      - Start zookeeper."
	echo "   las zk stop       - Stop zookeeper."
	echo "   las kafka start   - Start kafka."
	echo "   las kafka stop    - Stop kafka."
	echo "   las druid r start - Start druid realtime node."
	echo "   las druid r stop  - Stop druid realtime node."
	echo
    }

    show () {
	packages () {
	    echo "--[packages]":
	    echo $packages | tr ' ' '\n'
	}
	$*
    }

    # Manage an installation
    install () {

	# Clean (delete) an installation
	clean () {
	    echo "--[clean]"
	    rm -rf $app/*
	    rm -rf $pub/*
	    rm -rf $var
	    rm -rf $app/las-instr-fep
	}

	# Install the application.
	app () {
	    echo "--[install-app]"
	    cd $app
	    if [ ! -d las-instr-fep ]; then
		git clone git@github.com:stevencox/las-instr-fep.git
		cd las-instr-fep
		mkdir data
		npm install
		bower install
	    fi
	    cd $topdir
	}

	# Install everything.
	all () {
	    # Download packages.
	    for p in $packages; do
		echo downloading package: $p
		download_package "$p"
	    done
	    cd $app
	    # Unpack package contents.
	    for p in $packages; do
		echo installing package: $p
		install_package "$p"
	    done
	    cd $topdir

	    # Configure Druid
	    cp -r conf/druid/* $DRUID_HOME

	    # Install Redis
	    if [ ! -f /usr/sbin/redis-server ]; then
		if is_mac; then
		    echo
		    #$topdir/install_redis
		fi
	    fi
	    app
	}
	$*
	las_setup
    }

    # Refresh code from source control
    update () {
	cd $app/las-instr-fep
	git pull
    }

    # Database (mongo) control
    db () { 
	start () {
	    mongod --dbpath $var/mongo --port $MONGO_PORT
	}
	start_ram () {
	    ramdisk=/Volumes/ramdisk
	    mkdir -p $ramdisk/mongo
	    mongod --dbpath $ramdisk/mongo --port $MONGO_PORT
	}
	stop () {
	    pid=$(ps -ef | grep "port $MONGO_PORT" | grep -v grep | awk '{ print $2 }')
	    if [ ! -z $pid ]; then
		kill -9 $pid
	    fi
	}
	$*
    }

    # Graph database control.
    graph () {
	start () {
	    neo4j start
	}
	stop () {
	    pid=$(ps -ef | grep $NEO4J_HOME | grep -v grep | awk '{ print $2 }')
	    if [ ! -z $pid ]; then
		kill -9 $pid
	    fi
	}
	$*
    }

    # Environment configuration support.
    at () {
	LAS_ENV=$1

	# Port settings for Neo4J are in a file. Mess with that when needed.
	update_conf () {
	    if [ -f $app/neo*/conf/neo4j-server.properties ]; then
		props=$(ls -1 $app/neo*/conf/neo4j-server.properties)
		cat $props | sed \
		    -e "s,webserver.port=.*$,webserver.port=$NEO4J_PORT,g" \
		    -e "s,webserver.https.port=.*$,webserver.https.port=$NEO4J_ADMIN_PORT,g" > $props.new
		mv $props.new $props
	    fi
	}

	# Set local environment.
	local () {
	    export NODE_PORT=3000
	    export NODE_CLUSTERED=false
	    export MONGO_PORT=27017
	    export NEO4J_PORT=7474
	    export NEO4J_ADMIN_PORT=7473	    
	    update_conf
	}
	# Set dev environment.
	dev () {
	    export NODE_PORT=3001
	    export NODE_CLUSTERED=false
	    export MONGO_PORT=27018
	    export NEO4J_PORT=7476
	    export NEO4J_ADMIN_PORT=7475
	    update_conf
	}
	# Set production environment.
	prod () {
	    export NODE_PORT=80
	    export NODE_CLUSTERED=false
	    export MONGO_PORT=27017
	    export NEO4J_PORT=7474
	    export NEO4J_ADMIN_PORT=7473
	    update_conf
	}
	$*
    }
    
    # Selenium control.
    selenium () {
	start () {
	    java -jar app/selenium*
	}
	stop () {
	    pid=$(ps -ef | grep $SELENIUM_HOME | grep -v grep | awk '{ print $2 }')
	    if [ ! -z $pid ]; then
		kill -9 $pid
	    fi
	}
	$*
    }

    app () {

	# Start the application
	start () {
	    cd $app/las-instr-fep
	    NODE_ENV=$LAS_ENV node app.js
	}

	# Stop the application
	stop () {
	    pid=$(ps -ef | grep $NODE_HOME | grep -v grep | awk '{ print $2 }')
	    kill -9 $pid
	}

	# Test the application
	tests () {
	    cd $app/las-instr-fep
	    NODE_ENV=$LAS_ENV mocha --reporter spec --timeout 10000
	    cd $topdir
	}
	demodata () {
	    cd $app/las-instr-fep/public/data
	    wget http://bl.ocks.org/kerryrodden/raw/7090426/821c980032ca798d5c21554cfcbf40946631e3b5/visit-sequences.csv
	    cd $topdir
	}
	$*
    }
    $*

    ramdisk () {
	if is_mac; then
	    create () {
		size=$(( 2000 * 1024 * 2 ))
		diskutil erasevolume HFS+ "ramdisk" $( hdiutil attach -nomount ram://$size )
	    }
	    remove () {
		disk=$1
		diskutil erasevolume HFS+ "ramdisk" $disk
		diskutil unmount $disk
		hdiutil detach -force $disk
		sudo rm -rf $disk
	    }
	fi
	$*
    }

    zk () {
	start () {
	    $KAFKA_HOME/bin/zookeeper-server-start.sh $KAFKA_HOME/config/zookeeper.properties
	}
	stop () {
	    kill_app org.apache.zookeeper.server.quorum
	}
	$*
    }
    kafka () {
	start () {
	    $KAFKA_HOME/bin/kafka-server-start.sh $KAFKA_HOME/config/server.properties
	}
	stop () {
	    $KAFKA_HOME/bin/kafka-server-start.sh
	}
	$*
    }
    druid () {
	r () {
	    start () {
		JAVA_ARGS="-Xmx256m -Duser.timezone=UTC -Dfile.encoding=UTF-8"
		JAVA_ARGS="${JAVA_ARGS} -Ddruid.realtime.specFile=$topdir/conf/druid/realtime.spec"
		DRUID_CP=.
		DRUID_CP=${DRUID_CP}:${DRUID_HOME}/lib/*
		DRUID_CP=${DRUID_CP}:${DRUID_HOME}/config/realtime
		(set -x; java ${JAVA_ARGS} -classpath ${DRUID_CP} com.metamx.druid.realtime.RealtimeMain)
	    }
	    end () {
		kill_app com.metamx.druid.realtime.RealtimeMain
	    }
	    $*
	}
	query () {
	    curl -X POST "http://localhost:8083/druid/v2/?pretty" \
		-H 'content-type: application/json' -d @$topdir/conf/druid/query.body
	}
	$*
    }
}

las at local
las help
