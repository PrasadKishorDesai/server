.PHONY: dependency-up application-up dependency-down application-down

d-up: docker-compose-up
d-down: docker-compose-down

all-up: dependency-up application-up
all-down: dependency-down application-down

up: dependency-up
down: dependency-down

app-up: application-up
app-down: application-down

.DEFAULT_GOAL := docker-compose-up

docker-compose-up:
	docker-compose up -d

docker-compose-down:
	docker-compose down

dependency-up:
	docker-compose -f docker-compose-network.yml -f docker-compose-deps.yml up -d

application-up:
	docker-compose -f docker-compose-network.yml -f docker-compose-app.yml up -d

dependency-down:
	docker-compose -f docker-compose-network.yml -f docker-compose-deps.yml down

application-down:
	docker-compose -f docker-compose-network.yml -f docker-compose-app.yml down

