from rest_framework import serializers
from .models import (
    Review,
    Comment,
    AllTimeMovies,
    RatedAllTimeMovies
)

class CommentListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
        read_only_fields = ('user', 'review',)

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
        read_only_fields = ('user', 'review',)

class ReviewListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'
        read_only_fields = ('user',)

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'
        read_only_fields = ('user',)


class AllTimeMoviesSerializer(serializers.ModelSerializer):
    class Meta:
        model = AllTimeMovies
        fields = ('rank', 'title', 'released_date', 'population')

class RatedAllTimeMoviesSerializer(serializers.ModelSerializer):
    class Meta: 
        model = RatedAllTimeMovies
        fields = '__all__'
        read_only_fields = ('user',)