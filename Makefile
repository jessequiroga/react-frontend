.PHONY: run test

run:
	docker-compose up

install-fe:
	docker-compose run --rm frontend make install

build-fe:
	docker-compose run --rm frontend make build

test:
