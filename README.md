# IEEE Student Branch · Jabalpur Engineering College

React + Vite frontend, Django backend (JSON API + admin panel), plain CSS/JS.

```
ieee-sb-jec/
├── backend/    Django (API, admin, SQLite)
└── frontend/   React + Vite
```

## Run it (development)

Open two terminals.

**1. Backend** (http://127.0.0.1:8000)

```bash
cd backend
python -m venv .venv && source .venv/bin/activate     # Windows: .venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py seed_demo          # starter chapters + 3 sample posts
python manage.py createsuperuser    # login for /admin
python manage.py runserver
```

**2. Frontend** (http://localhost:5173)

```bash
cd frontend
npm install
npm run dev
```

The Vite dev server proxies `/api` to Django, so open **http://localhost:5173**.

## Run it as one site (production-style)

```bash
cd frontend && npm run build
cd ../backend && python manage.py runserver
```

Django now serves the built React app at http://127.0.0.1:8000 along with `/api` and `/admin`.
For real deployment set `DJANGO_DEBUG=0`, `DJANGO_SECRET_KEY` and `DJANGO_ALLOWED_HOSTS`,
and use gunicorn + a web server.

## Managing content (http://127.0.0.1:8000/admin)

| Admin section   | Appears on                                                |
| --------------- | --------------------------------------------------------- |
| Posts           | Home "Latest IEEE News" (newest **3**) + News & Events    |
| People          | Committee page / IEEE Fellows & Faculty Mentors page      |
| Achievements    | Achievements timeline                                     |
| Gallery items   | Gallery grid with lightbox (paste direct image URLs)      |
| Chapters        | Society Chapters (tick *featured* for a card, untick for a chip) |
| Enquiries       | Messages sent through the Contact form                    |

Delete the three "Sample ·" posts once you add real news.

## Things to personalise

- `frontend/src/config.js`: branch email, LinkedIn / Instagram / YouTube links, college URL, quotes.
- `frontend/public/images/`: logos and photos (see the README in that folder).

## Pages

`/` Home · `/news` News & Events · `/committee` · `/gallery` · `/mentors` · `/achievements` · `/chapters` · `/contact`
