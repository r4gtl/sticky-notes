# backend/Dockerfile
FROM python:3.11-slim

# Aggiungi il repo, installa psql e createdb, poi pulisci
RUN apt-get update \
 && apt-get install -y postgresql-client \
 && rm -rf /var/lib/apt/lists/*
 
WORKDIR /app

# 1) Copia e installa le dipendenze
COPY requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r /app/requirements.txt

# 2) Copia sorgenti e script
COPY backend/entrypoint.sh /app/entrypoint.sh
COPY backend/wait_for_db.py /wait_for_db.py
COPY backend/ /app/

RUN chmod +x /app/entrypoint.sh

# 3) Esponi porta e avvia entrypoint
EXPOSE 8000
ENTRYPOINT ["/app/entrypoint.sh"]
