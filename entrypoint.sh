#!/bin/sh

sleep 60

python manage.py migrate --noinput

exec "$@"