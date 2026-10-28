from django.conf import settings
from django.contrib import admin
from django.urls import include, path, re_path
from django.views.static import serve

from core.views import spa

DIST = settings.FRONTEND_DIST

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("core.urls")),
    # Built React app (run `npm run build` in /frontend)
    re_path(r"^assets/(?P<path>.*)$", serve, {"document_root": DIST / "assets"}),
    re_path(r"^images/(?P<path>.*)$", serve, {"document_root": DIST / "images"}),
    re_path(r"^(?P<path>favicon\.(?:png|svg|ico))$", serve, {"document_root": DIST}),
    # Everything else is handled by React Router
    re_path(r"^(?!admin|api|static).*$", spa),
]

admin.site.site_header = "IEEE SB JEC · Admin"
admin.site.site_title = "IEEE SB JEC"
admin.site.index_title = "Manage website content"
