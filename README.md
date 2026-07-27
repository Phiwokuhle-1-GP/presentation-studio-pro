# Presentation Studio — Self-Service BI Server Edition

A Flask web application for managers to repurpose ready-made executive presentation and BI templates with simple edits.

## Included
- User and administrator login
- Admin user-management dashboard
- Per-user presentation saving
- Marketplace → My Templates workflow
- Local JSON template import → My Templates
- Ready-made Shared Services, SOBER, organogram, operations and BI templates
- Quick Edit workspace and advanced tools behind the burger menu
- 4K PNG, JSON, browser PDF/print and presenter mode
- SQLite database for local use
- Gunicorn, Procfile and Render deployment configuration

## Run locally
```bash
python -m venv .venv
# Windows
.venv\Scripts\activate
# macOS/Linux
source .venv/bin/activate
pip install -r requirements.txt
python app.py
```
Open `http://127.0.0.1:5000`.

## Demo logins
- Administrator: `admin` / `Admin@123`
- Manager user: `manager` / `User@123`

Set `ADMIN_PASSWORD`, `USER_PASSWORD`, and `SECRET_KEY` environment variables before first production start.

## Production server
```bash
gunicorn app:app --bind 0.0.0.0:5000 --workers 2 --threads 4
```

## Render
Create a new Blueprint from the repository containing this folder. `render.yaml` supplies the build, start and health-check configuration.

For persistent production data, configure `DATABASE_URL` to a managed PostgreSQL database. SQLite is suitable for demonstrations and local use.
