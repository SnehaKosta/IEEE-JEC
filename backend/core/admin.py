from django.contrib import admin

from .models import Achievement, Chapter, Enquiry, GalleryItem, Person, Post


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ("title", "kind", "date", "published")
    list_filter = ("kind", "published")
    search_fields = ("title", "summary")
    date_hierarchy = "date"


@admin.register(Person)
class PersonAdmin(admin.ModelAdmin):
    list_display = ("name", "role", "category", "tenure", "order")
    list_filter = ("category",)
    search_fields = ("name", "role", "department")
    list_editable = ("order",)


@admin.register(Achievement)
class AchievementAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "date")
    list_filter = ("category",)
    search_fields = ("title", "description")


@admin.register(GalleryItem)
class GalleryItemAdmin(admin.ModelAdmin):
    list_display = ("caption", "date", "order")
    list_editable = ("order",)


@admin.register(Chapter)
class ChapterAdmin(admin.ModelAdmin):
    list_display = ("name", "code", "featured", "order")
    list_editable = ("featured", "order")


@admin.register(Enquiry)
class EnquiryAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "interest", "created_at", "handled")
    list_filter = ("handled", "interest")
    list_editable = ("handled",)
    search_fields = ("name", "email", "message")
    readonly_fields = ("name", "email", "interest", "message", "created_at")
