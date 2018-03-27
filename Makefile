.PHONY: run test

run:
	docker-compose up

test:
	docker-compose run --rm backend make test
