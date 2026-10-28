from django.urls import path

from . import views

urlpatterns = [
    path("posts/", views.posts),
    path("people/", views.people),
    path("achievements/", views.achievements),
    path("gallery/", views.gallery),
    path("chapters/", views.chapters),
    path("enquiry/", views.enquiry),
]
