.PHONY: run

run:
	pip install -r requirements.txt -q
	uwsgi -s 0.0.0.0:8080 --protocol=http --manage-script-name --mount /=wsgi:app --py-autoreload 1

test:
	echo 'TESTS RUNNING'
