#!/bin/bash
set -e

cd /app

# Se il progetto non esiste (controlliamo manage.py)
if [ ! -f "manage.py" ]; then
  echo "📦 Genero progetto Django 'backend'..."
  django-admin startproject backend .

  echo "🧱 Creo app 'core'..."
  python manage.py startapp core

  echo "🧱 Creo app 'notes'..."
  python manage.py startapp notes

  echo "🔐 Correggo permessi..."
  chown -R "$(stat -c "%u:%g" /app)" /app
fi

# Avvia runserver o gunicorn
if [ "$DEBUG" = "1" ]; then
  echo "🚧 DEBUG=1: sviluppo. Avvio runserver"
  exec python manage.py runserver 0.0.0.0:8000
else
  echo "🚀 DEBUG=0: produzione. Avvio Gunicorn"
  exec gunicorn backend.wsgi:application --bind 0.0.0.0:8000
fi
