from django.urls import path
from . import views


urlpatterns = [
    # csv파일에 있는 AllTimeMovie 정보 db에 입력 
    path('get_movies/', views.get_movies),
    # AllTimeMovie에 담긴 정보들 가져오기
    path('load_movies/', views.load_movies),
    
    # 전체 Review GET / Review 생성 POST
    path('', views.review_list_create),
    # Review 1개 GET, PUT, DELETE
    path('<int:review_pk>/', views.review_update_delete),
    path('comments/',views.load_comment_list),
    # 특정 Review에 전체 Comment GET / Comment 생성 POST 
    path('<int:review_pk>/comment/', views.comment_list_create),
    # 특정 Review에 Comment 수정 PUT, Comment 삭제 DELETE
    path('<int:review_pk>/comment/<int:comment_pk>/', views.comment_update_delete),

    # alltimemovie 평점 주기 POST
    path('movies/starmovies/', views.star_list_create),
    path('movies/<int:alltimemovie_pk>/starmovies/<int:starrated_pk>/', views.star_rated_update_delete),
]