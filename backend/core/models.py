from django.db import models


class Post(models.Model):
    """News items, announcements and events shown on the website."""

    KINDS = [("news", "News"), ("event", "Event"), ("announcement", "Announcement")]

    kind = models.CharField(max_length=20, choices=KINDS, default="news")
    title = models.CharField(max_length=200)
    summary = models.TextField(blank=True)
    date = models.DateField(help_text="Publish date (or the event date for events)")
    location = models.CharField(max_length=200, blank=True)
    link = models.URLField(blank=True, help_text="Optional 'Read more' / registration link")
    image_url = models.URLField(blank=True, help_text="Optional cover image URL")
    published = models.BooleanField(default=True)

    class Meta:
        ordering = ["-date", "-id"]

    def __str__(self):
        return self.title

    def to_dict(self):
        return {
            "id": self.id,
            "kind": self.kind,
            "title": self.title,
            "summary": self.summary,
            "date": self.date.isoformat(),
            "location": self.location,
            "link": self.link,
            "image_url": self.image_url,
        }


class Person(models.Model):
    """Committee members and faculty mentors / IEEE fellows."""

    CATEGORIES = [("committee", "Committee"), ("mentor", "IEEE Fellow / Faculty Mentor")]

    category = models.CharField(max_length=20, choices=CATEGORIES, default="committee")
    name = models.CharField(max_length=120)
    role = models.CharField(max_length=120, help_text="e.g. Chairperson, Secretary, Branch Counselor")
    department = models.CharField(max_length=120, blank=True)
    tenure = models.CharField(max_length=40, blank=True, help_text="e.g. 2026")
    bio = models.TextField(blank=True)
    photo_url = models.URLField(blank=True)
    linkedin = models.URLField(blank=True)
    order = models.PositiveIntegerField(default=0, help_text="Lower numbers appear first")

    class Meta:
        ordering = ["category", "order", "name"]
        verbose_name_plural = "people"

    def __str__(self):
        return f"{self.name} ({self.role})"

    def to_dict(self):
        return {
            "id": self.id,
            "category": self.category,
            "name": self.name,
            "role": self.role,
            "department": self.department,
            "tenure": self.tenure,
            "bio": self.bio,
            "photo_url": self.photo_url,
            "linkedin": self.linkedin,
        }


class Achievement(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    date = models.DateField()
    category = models.CharField(max_length=60, blank=True, help_text="e.g. Competition, Project, Recognition")
    link = models.URLField(blank=True)

    class Meta:
        ordering = ["-date", "-id"]

    def __str__(self):
        return self.title

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "date": self.date.isoformat(),
            "category": self.category,
            "link": self.link,
        }


class GalleryItem(models.Model):
    caption = models.CharField(max_length=200)
    image_url = models.URLField(help_text="Direct link to the image")
    date = models.DateField(null=True, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "-date", "-id"]

    def __str__(self):
        return self.caption

    def to_dict(self):
        return {
            "id": self.id,
            "caption": self.caption,
            "image_url": self.image_url,
            "date": self.date.isoformat() if self.date else None,
        }


class Chapter(models.Model):
    """IEEE society chapters and affinity groups."""

    code = models.CharField(max_length=10, help_text="Short code, e.g. CS, WIE, RAS")
    name = models.CharField(max_length=160)
    description = models.TextField()
    tags = models.CharField(max_length=160, blank=True, help_text="Comma separated, e.g. Computing, Software, AI")
    url = models.URLField(blank=True)
    logo_url = models.URLField(blank=True)
    featured = models.BooleanField(default=True, help_text="Featured chapters show as cards; others appear under 'More ways to explore'")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "name"]

    def __str__(self):
        return self.name

    def to_dict(self):
        return {
            "id": self.id,
            "code": self.code,
            "name": self.name,
            "description": self.description,
            "tags": [t.strip() for t in self.tags.split(",") if t.strip()],
            "url": self.url,
            "logo_url": self.logo_url,
            "featured": self.featured,
        }


class Enquiry(models.Model):
    """Messages sent through the Contact form."""

    name = models.CharField(max_length=120)
    email = models.EmailField()
    interest = models.CharField(max_length=80)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    handled = models.BooleanField(default=False)

    class Meta:
        ordering = ["-created_at"]
        verbose_name_plural = "enquiries"

    def __str__(self):
        return f"{self.name} · {self.interest}"
