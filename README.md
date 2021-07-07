# Financial Risk Assessment
## Note, this is not close for kubernetes production but is for docker. Next steps:
1) Kubernetes files, support for environment variables (configmap?)
2) Add description associated with each survey and not the global description we have right now
3) Create service.tsx file for all requests

# Run

## Requirements

- [docker](https://docs.docker.com/install/)
- [k3d](https://k3d.io/) *not needed since kubernetes support not finished and if you only use `docker-compose up`

## Steps for Docker

* ### Docker development
    1. `docker-compose -f dev.docker-compose.yml up` in the root folder.
    2. Access the frontend at `localhost:3000`!! *can change to 80 if wanted for consistency

* ### Docker production
    1. `docker-compose up` or `docker-compose -f docker-compose.yml up` in the root folder.
    2. Access the frontend at `localhost:80`

## Steps for k3d (kubernetes - k3s in docker) coming
