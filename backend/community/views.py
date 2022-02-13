from django.http.response import HttpResponse
from django.shortcuts import get_object_or_404
from .models import (Review,
    Comment,
    AllTimeMovies,
    RatedAllTimeMovies
)
from .serializers import (
    ReviewSerializer,
    ReviewListSerializer,
    CommentSerializer,
    CommentListSerializer,
    AllTimeMoviesSerializer,
    RatedAllTimeMoviesSerializer
)
from rest_framework.response import Response
from rest_framework.decorators import (
    api_view,
    permission_classes,
)
from rest_framework.status import (
    HTTP_204_NO_CONTENT,
    HTTP_403_FORBIDDEN,
)
import csv 
from pathlib import Path
from rest_framework.permissions import AllowAny

from django.core import serializers
from django.http import JsonResponse

@api_view(['GET'])
@permission_classes([AllowAny])
def get_movies(request):
    '''
    csv에 있는 영화 정보를 AlltimeMovieClass로 변환해주는 함수
    '''
    path = Path(__file__).parent / "./fixtures/CSV_steadymovies.csv"
    if not AllTimeMovies.objects.all():
        file = open(path)
        reader = csv.reader(file)
        result = []
        for row in reader:
            result.append(AllTimeMovies(
                rank = row[0],
                title= row[1],
                released_date = row[2],
                sales = row[3],
                population= row[4],
                screens = row[5],
                playings = row[6],
                sub_nation= row[7],
                nation= row[8],
                production = row[9],
            ))
        AllTimeMovies.objects.bulk_create(result)
    return HttpResponse('SUCCESS')

@api_view(['GET'])
@permission_classes([AllowAny])
def load_movies(request):
    '''
    AlltimeMovie에 담긴 정보들을 받아오는 함수
    '''
    steady_movies = AllTimeMovies.objects.all()
    serializers = AllTimeMoviesSerializer(steady_movies, many=True)
    return Response(serializers.data)

@api_view(['GET', 'POST'])
def review_list_create(request):
    '''
    GET: 전체 Review를 받음
    POST: New Review 작성 
    '''
    if request.method=='GET':
        reviews = Review.objects.all()
        serializer = ReviewListSerializer(reviews, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = ReviewSerializer(data = request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user)
            return Response(serializer.data)

@api_view(['GET', 'PUT', 'DELETE'])
def review_update_delete(request,review_pk):
    '''
    GET: 1개의 Review 불러옴
    PUT: Review내용을 수정
    DELETE: Reivew를 삭제
    '''
    review = get_object_or_404(Review, pk=review_pk)
    if request.method=='GET':
        serializer = ReviewListSerializer(review)
        return Response(serializer.data)

    if not request.user.users_review.filter(pk=review_pk).exists():
        return Response({'detail': '권한이 없습니다.'}, status=HTTP_403_FORBIDDEN)

    elif request.method=='PUT':
        serializer = ReviewSerializer(review, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
    elif request.method=='DELETE':
        review.delete()
        return Response({'message': '삭제 완료'}, status=HTTP_204_NO_CONTENT)

@api_view(['GET'])
def load_comment_list(request):
    '''
    GET: 전체 Comment 받음
    '''
    if request.method=='GET':
        comments = Comment.objects.all()
        serializer = CommentListSerializer(comments, many=True)
        return Response(serializer.data)

@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def comment_list_create(request, review_pk):
    '''
    GET: Review에 작성된 전체 Comment를 불러옴
    POST: Review에 새 Comment를 작성
    '''
    comments = Comment.objects.filter(review=review_pk)
    if request.method=='GET':
        serializer = CommentListSerializer(comments, many=True)
        return Response(serializer.data)
    elif request.method=='POST':
        review = get_object_or_404(Review, pk=review_pk)
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(review=review, user=request.user)
            return Response(serializer.data)

@api_view(['PUT', 'DELETE'])
def comment_update_delete(request, review_pk, comment_pk):
    '''
    PUT: Review에 작성된 Comment를 수정
    DELETE: Comment 삭제
    '''
    review = get_object_or_404(Review, pk=review_pk)
    comment = get_object_or_404(Comment,pk=comment_pk)

    if not request.user.users_comment.filter(pk=comment_pk).exists():
        return Response({'detail': '권한이 없습니다.'}, status=HTTP_403_FORBIDDEN)

    if request.method=='PUT':
        serializer = CommentSerializer(comment, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(review=review)
            return Response(serializer.data)
    elif request.method=='DELETE':
        comment.delete()
        return Response({'message': '삭제 완료'}, status=HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST'])
def star_list_create(request):
    '''
    GET : 별점 기록 불러오기
    POST : 별점 등록하기 
    '''
    if request.method == 'GET':
        star_rated_list = RatedAllTimeMovies.objects.all()
        serializer = RatedAllTimeMoviesSerializer(star_rated_list, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        # print(request.user.users_star.filter(movie_id=request.data['movie']).exists())
        if request.user.users_star.filter(movie_id=request.data['movie']).exists():
            return Response({'detail': '별점을 이미 등록한 영화입니다.'}, status=HTTP_403_FORBIDDEN)

        serializer = RatedAllTimeMoviesSerializer(data = request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user)
            return Response(serializer.data)

@api_view(['PUT', 'DELETE'])
def star_rated_update_delete(request, alltimemovie_pk, starrated_pk):
    '''
    PUT: 별점 기록 수정
    DELETE: 별점 기록 삭제
    '''
    alltimemovie = get_object_or_404(AllTimeMovies, pk=alltimemovie_pk)
    starrated = get_object_or_404(RatedAllTimeMovies,pk=starrated_pk)

    if not request.user.users_star.filter(pk=starrated_pk).exists():
        return Response({'detail': '권한이 없습니다.'}, status=HTTP_403_FORBIDDEN)

    if request.method=='PUT':
        serializer = RatedAllTimeMoviesSerializer(starrated, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(alltimemovie=alltimemovie)
            return Response(serializer.data)
    elif request.method=='DELETE':
        starrated.delete()
        return Response({'message': '삭제 완료'}, status=HTTP_204_NO_CONTENT)
