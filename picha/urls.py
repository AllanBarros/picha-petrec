from django.urls import path

from photos.views import PhotosView, PhotosCountView
from feedback.views import FeedbackView

urlpatterns = [
    path('feedback/', FeedbackView.as_view(), name="feedback"),
    path('photos/', PhotosView.as_view(), name="photos"),
    path('photos-count/', PhotosCountView.as_view(), name="photos-count"),

]
