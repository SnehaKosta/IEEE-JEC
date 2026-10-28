import json

from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_GET, require_POST

from django.conf import settings

from .models import Achievement, Chapter, Enquiry, GalleryItem, Person, Post

INTERESTS = {
    "Membership / volunteering",
    "Events & workshops",
    "Collaboration / sponsorship",
    "Society chapters",
    "Something else",
}


def _results(queryset, limit=None):
    if limit:
        queryset = queryset[:limit]
    return JsonResponse({"results": [obj.to_dict() for obj in queryset]})


def _limit(request):
    try:
        value = int(request.GET.get("limit", ""))
        return value if value > 0 else None
    except ValueError:
        return None


@require_GET
def posts(request):
    qs = Post.objects.filter(published=True)
    kind = request.GET.get("kind")
    if kind in {"news", "event", "announcement"}:
        qs = qs.filter(kind=kind)
    return _results(qs, _limit(request))


@require_GET
def people(request):
    qs = Person.objects.all()
    category = request.GET.get("category")
    if category in {"committee", "mentor"}:
        qs = qs.filter(category=category)
    return _results(qs)


@require_GET
def achievements(request):
    return _results(Achievement.objects.all(), _limit(request))


@require_GET
def gallery(request):
    return _results(GalleryItem.objects.all(), _limit(request))


@require_GET
def chapters(request):
    return _results(Chapter.objects.all())


@csrf_exempt
@require_POST
def enquiry(request):
    try:
        data = json.loads(request.body or "{}")
    except json.JSONDecodeError:
        return JsonResponse({"ok": False, "error": "Invalid request."}, status=400)

    # Honeypot field: real visitors never fill this in.
    if data.get("website"):
        return JsonResponse({"ok": True})

    name = str(data.get("name", "")).strip()
    email = str(data.get("email", "")).strip()
    interest = str(data.get("interest", "")).strip()
    message = str(data.get("message", "")).strip()

    errors = {}
    if len(name) < 2:
        errors["name"] = "Please enter your full name."
    try:
        validate_email(email)
    except ValidationError:
        errors["email"] = "Please enter a valid email address."
    if interest not in INTERESTS:
        errors["interest"] = "Please choose an option."
    if len(message) < 10:
        errors["message"] = "Please write a few words (at least 10 characters)."
    if len(message) > 3000:
        errors["message"] = "Message is too long (max 3000 characters)."

    if errors:
        return JsonResponse({"ok": False, "errors": errors}, status=400)

    Enquiry.objects.create(name=name[:120], email=email, interest=interest, message=message)
    return JsonResponse({"ok": True})


def spa(request):
    """Serve the built React app for every non-API route."""
    index = settings.FRONTEND_DIST / "index.html"
    if not index.exists():
        return HttpResponse(
            "<h2>Frontend not built yet</h2>"
            "<p>Run <code>npm install &amp;&amp; npm run build</code> inside <code>frontend/</code>, "
            "or use the Vite dev server at <a href='http://localhost:5173'>localhost:5173</a>.</p>",
            status=503,
        )
    return HttpResponse(index.read_text(encoding="utf-8"))
