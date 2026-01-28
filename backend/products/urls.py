#products\urls.py
from django.urls import path
from .views import ProductListView, ProductDetailView, CategoryListView

urlpatterns = [
    path("categories/", CategoryListView.as_view(), name="categories-list"),
    path("products/", ProductListView.as_view(), name="products-list"),
    path("products/<slug:id>/", ProductDetailView.as_view(), name="products-detail"),
]
