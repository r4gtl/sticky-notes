# wait_for_db.py
import os
import socket
import time

host = os.environ.get("DB_HOST", "db")
port = int(os.environ.get("DB_PORT", "5432"))

while True:
    try:
        with socket.create_connection((host, port), timeout=2):
            print(f"✅ Database {host}:{port} è raggiungibile.")
            break
    except OSError:
        print(f"⏳ Attendo che il DB sia disponibile su {host}:{port}...")
        time.sleep(1)
