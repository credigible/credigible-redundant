# Credigible
Plan is to have backend, frontend and flutter in the same repo because
1) Saving ourselves from CI/CD hell, plus environment secrets can't be shared among multiple repos in free version of Github Teams
2) Running integration tests easily
3) Some PRs might be full stack in nature.

## Development
First of all make sure `docker` and `docker-compose` are both installed     
Also make sure that you have set up your `.env` file in `./server` properly       
To run the development build of credigible, build the local docker compose first
```bash
./develop.sh build
```    
If trouble arises, make sure to `chmod +x ./develop.sh` first     
After that do this
```bash
./develop.sh up
```
**Remember**, anything succeeding `./develop.sh` is a `docker-compose` command, hence you can give all sort of valid `docker-compose` command to it
