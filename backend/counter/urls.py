from django.urls import path
from .views import visits_api

urlpatterns = [
    path("api/visits/", visits_api, name="visits_api"),
]
