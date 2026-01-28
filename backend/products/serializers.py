#products\serializers.py
from __future__ import annotations

from rest_framework import serializers
from rest_framework.request import Request

from .models import (
    Product,
    ProductCategory,
    ProductDescriptionSection,
)


class ProductCategorySerializer(serializers.ModelSerializer):
    icon = serializers.SerializerMethodField()

    class Meta:
        model = ProductCategory
        fields = ("id", "title", "icon", "order")

    def _abs(self, request: Request | None, url: str | None) -> str:
        if not url:
            return ""
        if request is None:
            return url
        return request.build_absolute_uri(url)

    def get_icon(self, obj: ProductCategory) -> str:
        request = self.context.get("request")
        return self._abs(request, obj.icon.url if obj.icon else "")


class ProductSerializer(serializers.ModelSerializer):
    fullPrice = serializers.CharField(source="full_price")
    salePrice = serializers.CharField(source="sale_price")
    descriptionText = serializers.CharField(source="description_text")
    previewImage = serializers.SerializerMethodField()
    images = serializers.SerializerMethodField()
    memoryOptions = serializers.SerializerMethodField()
    disabledMemoryOptions = serializers.SerializerMethodField()
    colorOptions = serializers.SerializerMethodField()
    colorVariants = serializers.SerializerMethodField()
    characteristics = serializers.SerializerMethodField()
    terms = serializers.SerializerMethodField()
    descriptionSection = serializers.SerializerMethodField()
    category = serializers.SerializerMethodField()
    categoryId = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = (
            "id",
            "title",
            "category",
            "categoryId",
            "fullPrice",
            "salePrice",
            "previewImage",
            "images",
            "memoryOptions",
            "disabledMemoryOptions",
            "colorOptions",
            "colorVariants",
            "characteristics",
            "descriptionText",
            "terms",
            "descriptionSection",
        )

    def _abs(self, request: Request | None, url: str | None) -> str:
        if not url:
            return ""
        if request is None:
            return url
        return request.build_absolute_uri(url)

    def get_category(self, obj: Product) -> str:
        if obj.category is None:
            return ""
        return obj.category.title

    def get_categoryId(self, obj: Product) -> str:
        if obj.category is None:
            return ""
        return obj.category.id

    def get_previewImage(self, obj: Product) -> str:
        request = self.context.get("request")
        return self._abs(request, obj.preview_image.url if obj.preview_image else "")

    def get_images(self, obj: Product) -> list[str]:
        request = self.context.get("request")
        return [self._abs(request, img.url) for img in obj.images_list]

    def get_memoryOptions(self, obj: Product) -> list[str]:
        return [m.value for m in obj.memory_options.all()]

    def get_disabledMemoryOptions(self, obj: Product) -> list[str] | None:
        values = [m.value for m in obj.disabled_memory_options.all()]
        return values if values else None

    def get_colorOptions(self, obj: Product) -> list[str]:
        return [c.hex_value for c in obj.color_options.all()]

    def get_colorVariants(self, obj: Product) -> dict[str, dict[str, object]] | None:
        request = self.context.get("request")
        variants = obj.color_variants.all()
        if not variants:
            return None

        data: dict[str, dict[str, object]] = {}
        for v in variants:
            data[v.color_hex] = {
                "title": v.title,
                "images": [self._abs(request, img.url) for img in v.images_list],
            }
        return data

    def get_characteristics(self, obj: Product) -> list[dict[str, str]]:
        request = self.context.get("request")
        return [
            {
                "icon": self._abs(request, ch.icon.url if ch.icon else ""),
                "title": ch.title,
                "description": ch.description,
            }
            for ch in obj.characteristics.all()
        ]

    def get_terms(self, obj: Product) -> list[dict[str, str]]:
        request = self.context.get("request")
        return [
            {
                "icon": self._abs(request, t.icon.url if t.icon else ""),
                "title": t.title,
                "subtitle": t.subtitle,
            }
            for t in obj.terms.all()
        ]

    def get_descriptionSection(self, obj: Product) -> dict[str, object]:
        section: ProductDescriptionSection | None = getattr(obj, "description_section", None)
        if section is None:
            return {"detailsTitle": "Details", "detailsDesc": "", "characteristics": []}

        groups: list[dict[str, object]] = []
        for g in section.characteristics_groups.all():
            items: list[dict[str, object]] = []
            for it in g.items.all():
                items.append({
                    "title": it.title,
                    "value": it.get_value(),
                })
            groups.append({
                "title": g.title,
                "items": items,
            })

        return {
            "detailsTitle": section.details_title,
            "detailsDesc": section.details_desc,
            "characteristics": groups,
        }


class ProductListItemSerializer(serializers.ModelSerializer):
    productIcon = serializers.SerializerMethodField()
    price = serializers.CharField(source="sale_price")
    category = serializers.SerializerMethodField()
    categoryId = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ("id", "title", "productIcon", "price", "category", "categoryId")

    def get_category(self, obj: Product) -> str:
        if obj.category is None:
            return ""
        return obj.category.title

    def get_categoryId(self, obj: Product) -> str:
        if obj.category is None:
            return ""
        return obj.category.id

    def get_productIcon(self, obj: Product) -> str:
        request = self.context.get("request")
        if obj.preview_image:
            return request.build_absolute_uri(obj.preview_image.url) if request else obj.preview_image.url
        imgs = obj.images_list
        if imgs:
            return request.build_absolute_uri(imgs[0].url) if request else imgs[0].url
        return ""
