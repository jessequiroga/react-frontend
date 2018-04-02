.PHONY: run test

run:
	docker-compose up

build-fe:
	docker-compose run --rm frontend make install

test:
