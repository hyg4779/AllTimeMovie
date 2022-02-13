from django.contrib import admin

from .models import Review, Comment, AllTimeMovies, RatedAllTimeMovies

admin.site.register(Review)
admin.site.register(Comment)
admin.site.register(AllTimeMovies)
admin.site.register(RatedAllTimeMovies)