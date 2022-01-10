if [[ ! -d "docker" ]]; then
    echo "This script must be run from the top level directory of the source."
    exit -1
fi

function invoke_docker_compose {
    exec docker-compose -f docker/docker-compose.yml \
                -p listenbrainz \
                "$@"
}

echo "Running development docker build, with the givent command"
invoke_docker_compose "$@"
