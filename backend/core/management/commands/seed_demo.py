from datetime import date, timedelta

from django.core.management.base import BaseCommand

from core.models import Chapter, Post


CHAPTERS = [
    ("CS", "IEEE Computer Society (CS)",
     "Explore computing, software and emerging digital technologies with a worldwide community of practitioners.",
     "Computing, Software, AI", "https://www.computer.org", True),
    ("WIE", "IEEE Women in Engineering (WIE)",
     "Connect with a global network dedicated to inspiring and supporting women in engineering and science.",
     "Inclusion, Leadership, Mentorship", "https://wie.ieee.org", True),
    ("RAS", "IEEE Robotics and Automation Society (RAS)",
     "Discover intelligent systems, robotics and automation at the intersection of hardware, software and imagination.",
     "Robotics, Controls, Automation", "https://www.ieee-ras.org", True),
    ("SPS", "Signal Processing",
     "The IEEE Signal Processing Society covers the science and application of signals, from audio and images to data.",
     "Signals, Imaging, Data", "https://signalprocessingsociety.org", False),
    ("PELS", "Power Electronics",
     "The IEEE Power Electronics Society advances power conversion, energy systems and electric mobility.",
     "Power, Energy, Mobility", "https://www.ieee-pels.org", False),
]


class Command(BaseCommand):
    help = "Load starter chapters and three sample posts (safe to run more than once)."

    def handle(self, *args, **options):
        for order, (code, name, desc, tags, url, featured) in enumerate(CHAPTERS):
            Chapter.objects.update_or_create(
                code=code,
                defaults=dict(name=name, description=desc, tags=tags, url=url, featured=featured, order=order),
            )

        if not Post.objects.exists():
            today = date.today()
            samples = [
                ("news", "Sample · Welcome to the new IEEE SB JEC website",
                 "Replace this with a real announcement from the Django admin panel (/admin).", 0),
                ("event", "Sample · Introductory session for new members",
                 "Add your real events with a date, location and registration link in /admin.", 7),
                ("announcement", "Sample · Call for volunteers",
                 "Delete or edit these sample posts once you add your own news.", 14),
            ]
            for kind, title, summary, offset in samples:
                Post.objects.create(kind=kind, title=title, summary=summary, date=today - timedelta(days=offset))

        self.stdout.write(self.style.SUCCESS("Starter data loaded."))
