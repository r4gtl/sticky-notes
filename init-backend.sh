#!/bin/bash

set -e

# Entra nella cartella backend o la crea se non esiste
mkdir -p backend
cd backend

# Verifica che non esista già un progetto core
if [ -d "core" ] || [ -f "manage.py" ]; then
    echo "⚠️  Il progetto Django esiste già in 'backend/'. Annullato."
    exit 1
fi

# Esegui django-admin con l'utente corrente per evitare permessi root
echo "🚀 Creazione progetto Django..."
docker compose run --user "$(id -u):$(id -g)" web django-admin startproject core .

echo "✅ Progetto Django creato in 'backend/core/'"
