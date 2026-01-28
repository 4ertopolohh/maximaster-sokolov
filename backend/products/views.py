#products\views.py
from rest_framework import generics

from .models import Product, ProductCategory
from .serializers import (
    ProductSerializer,
    ProductListItemSerializer,
    ProductCategorySerializer,
)


class CategoryListView(generics.ListAPIView):
    queryset = ProductCategory.objects.all()
    serializer_class = ProductCategorySerializer

    def get_serializer_context(self):
        return {"request": self.request}


class ProductListView(generics.ListCreateAPIView):
    queryset = Product.objects.all().order_by("id")

    def get_serializer_class(self):
        if self.request.method == "GET":
            return ProductListItemSerializer
        return ProductSerializer

    def get_serializer_context(self):
        return {"request": self.request}


class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = "id"

    def get_serializer_context(self):
        return {"request": self.request}
