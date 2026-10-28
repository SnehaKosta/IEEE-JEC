# Deploying IEEE SB JEC

The site is one Django app that also serves the built React frontend, so you deploy **one thing**.

## 0. Before you go live (content checklist)

- [ ] Logos and photos in `frontend/public/images/` (`ieee-logo.png`, `jec-crest.png`, `slide-1..3.jpg`, `about.jpg`, `favicon.png`)
- [ ] Admin > **Site settings**: email, address, social links filled in
- [ ] Sample posts deleted; real news / committee / mentors / achievements added
- [ ] Chapter logos uploaded in Admin > **Chapters** (optional)
- [ ] Test the Contact form and check the message appears under **Enquiries**

## 1. Choose a host

The site stores its data in a SQLite file and uploaded photos in a folder, so the host **must keep files between restarts**.

| Option | Good for | Watch out |
| --- | --- | --- |
| College server / a small VPS (Ubuntu) | Full control, stable | You maintain it |
| PythonAnywhere | Easy Django hosting, files persist | Free tier has limits |
| Render / Railway free tiers | Quick demo | Disk is wiped on restart unless you add a paid persistent disk |

## 2. Build and prepare (on the server)

```bash
# frontend
cd frontend
npm install
npm run build            # creates frontend/dist, which Django serves

# backend
cd ../backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
```

## 3. Set environment variables

| Variable | Value |
| --- | --- |
| `DJANGO_DEBUG` | `0` (**required** for a live site) |
| `DJANGO_SECRET_KEY` | long random text. Create one: `python -c "import secrets;print(secrets.token_urlsafe(50))"` |
| `DJANGO_ALLOWED_HOSTS` | your domain, e.g. `ieee.jecjabalpur.ac.in` |
| `DJANGO_CSRF_TRUSTED_ORIGINS` | `https://ieee.jecjabalpur.ac.in` (needed for admin login) |
| `DJANGO_DB_PATH` | optional, path to the database on a persistent disk, e.g. `/data/db.sqlite3` |
| `DJANGO_MEDIA_ROOT` | optional, path for uploaded photos on a persistent disk, e.g. `/data/media` |
| `EMAIL_HOST_USER`, `EMAIL_HOST_PASSWORD`, `ENQUIRY_NOTIFY_TO` | optional, email notification for new enquiries |

Never put the secret key or passwords into the code files or share them.
If the site is **not** behind HTTPS yet, also set `DJANGO_SSL_REDIRECT=0` (get HTTPS as soon as you can).

## 4. First-time setup

```bash
python manage.py migrate
python manage.py collectstatic --noinput
python manage.py createsuperuser
python manage.py seed_demo      # only if you want the starter chapters; delete the sample posts after
```

## 5. Run it

```bash
gunicorn config.wsgi -b 127.0.0.1:8000 --workers 3
```

Put a web server (nginx / Apache / your host's setting) in front, pointing your domain at port 8000 with HTTPS (Let's Encrypt is free).
Run gunicorn as a service so it restarts automatically.

## 6. Updating later

```bash
git pull   # or copy the new files
cd frontend && npm run build
cd ../backend && python manage.py migrate && python manage.py collectstatic --noinput
# restart gunicorn
```

## 7. Back up

Copy these regularly: the database file (`db.sqlite3`, or `DJANGO_DB_PATH`) and the `media/` folder (or `DJANGO_MEDIA_ROOT`).
