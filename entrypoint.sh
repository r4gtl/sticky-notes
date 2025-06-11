#!/bin/bash
set -e

cd /app

# 🔐 Correggo i permessi nella cartella di lavoro (bind mount)
# chown -R "$(stat -c "%u:%g" /app)" /app

# 🔐 Correggi i permessi all'avvio basandoti sull'owner dell'host (dinamico)
APP_OWNER_UID=$(stat -c '%u' /app)
APP_OWNER_GID=$(stat -c '%g' /app)

echo "🔐 Correggo permessi per UID:$APP_OWNER_UID GID:$APP_OWNER_GID"
chown -R "$APP_OWNER_UID:$APP_OWNER_GID" /app


# 🕓 Attendo che il DB sia disponibile
echo "🕓 Attendo che il DB ${DB_HOST}:${DB_PORT} sia disponibile..."
python /wait_for_db.py

# 🔍 Verifico se il database esiste
echo "🔍 Verifico se '${POSTGRES_DB}' esiste..."
DB_EXISTS=$(PGPASSWORD="$POSTGRES_PASSWORD" psql -h "$DB_HOST" -p "$DB_PORT" -U "$POSTGRES_USER" -tAc "SELECT 1 FROM pg_database WHERE datname='${POSTGRES_DB}'" || echo "")

if [ "$DB_EXISTS" != "1" ]; then
  echo "🆕 Creo il database '${POSTGRES_DB}'..."
  PGPASSWORD="$POSTGRES_PASSWORD" createdb -h "$DB_HOST" -p "$DB_PORT" -U "$POSTGRES_USER" "$POSTGRES_DB"
else
  echo "✅ Il database '${POSTGRES_DB}' esiste già."
fi

# 📦 Se il progetto non esiste, lo inizializzo
if [ ! -f "manage.py" ]; then
  echo "📦 Creo il progetto Django..."
  django-admin startproject backend .

  echo "🧱 Creo app 'core'..."
  python manage.py startapp core

  echo "🧱 Creo app 'notes'..."
  python manage.py startapp notes
fi

# 🔄 Applico le migrazioni
echo "🔄 Eseguo le migrate iniziali..."
python manage.py migrate

# 🚀 Avvio il server
if [ "$DEBUG" = "1" ]; then
  echo "🚧 DEBUG=1: sviluppo. Avvio runserver"
  exec python manage.py runserver 0.0.0.0:8000
else
  echo "🚀 DEBUG=0: produzione. Avvio Gunicorn"
  exec gunicorn backend.wsgi:application --bind 0.0.0.0:8000
fi
