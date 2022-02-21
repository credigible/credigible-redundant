#!/bin/bash

if [[ ! -d "docker" ]]; then
    echo "This script must be run from the top level directory of the source."
    exit -1
fi

function invoke_docker_compose {
    exec docker-compose -f docker/docker-compose.dev.yml \
                -p credigible-dev \
                "$@"
}

function open_mariadb_shell {
    docker exec -it credigible-dev_db_1 /bin/bash -c 'mysql -u test -ptest -p test'
}

if [[ "$1" == "db" ]]; then
    echo "Connecting to mariadb..."
    open_mariadb_shell
else
    echo "Running development docker build, with the given command"
    invoke_docker_compose "$@"
fi
