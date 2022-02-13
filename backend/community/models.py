from django.db import models
from django.conf import settings

class AllTimeMovies(models.Model):
    rank = models.TextField()
    title = models.TextField()
    released_date = models.TextField()
    sales = models.TextField()
    population = models.TextField()
    screens = models.TextField()
    playings = models.TextField()
    sub_nation = models.TextField()
    nation = models.TextField()
    production = models.TextField()

class RatedAllTimeMovies(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="users_star")
    movie = models.ForeignKey(AllTimeMovies, on_delete=models.CASCADE)
    star_rated = models.PositiveIntegerField()
    
class Review(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="users_review")
    # like = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='like_reviews')

    alltimemovie = models.ForeignKey(AllTimeMovies, on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Comment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="users_comment")
    # like = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='like_comments')

    review = models.ForeignKey(Review, on_delete=models.CASCADE)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

