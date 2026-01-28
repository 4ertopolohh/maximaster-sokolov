#products\models.py
from __future__ import annotations

from django.db import models
from django.db.models.fields.files import ImageFieldFile


class ProductCategory(models.Model):
    id = models.SlugField(primary_key=True, max_length=64)
    title = models.CharField(max_length=64, unique=True)
    icon = models.ImageField(upload_to="categories/icons/", blank=True, null=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ("order", "title")

    def __str__(self) -> str:
        return self.title


class Product(models.Model):
    id = models.SlugField(primary_key=True, max_length=64)
    title = models.CharField(max_length=255)

    category = models.ForeignKey(
        ProductCategory,
        related_name="products",
        on_delete=models.PROTECT,
        blank=True,
        null=True,
    )

    full_price = models.DecimalField(max_digits=10, decimal_places=2)
    sale_price = models.DecimalField(max_digits=10, decimal_places=2)

    preview_image = models.ImageField(upload_to="products/preview/", blank=True, null=True)

    image_1 = models.ImageField(upload_to="products/images/", blank=True, null=True)
    image_2 = models.ImageField(upload_to="products/images/", blank=True, null=True)
    image_3 = models.ImageField(upload_to="products/images/", blank=True, null=True)
    image_4 = models.ImageField(upload_to="products/images/", blank=True, null=True)

    description_text = models.TextField(blank=True, default="")

    def __str__(self) -> str:
        return f"{self.id}: {self.title}"

    @property
    def images_list(self) -> list[ImageFieldFile]:
        images: list[ImageFieldFile] = []
        for img in (self.image_1, self.image_2, self.image_3, self.image_4):
            if img:
                images.append(img)
        return images


class ProductMemoryOption(models.Model):
    product = models.ForeignKey(Product, related_name="memory_options", on_delete=models.CASCADE)
    value = models.CharField(max_length=32)


class ProductDisabledMemoryOption(models.Model):
    product = models.ForeignKey(Product, related_name="disabled_memory_options", on_delete=models.CASCADE)
    value = models.CharField(max_length=32)


class ProductColorOption(models.Model):
    product = models.ForeignKey(Product, related_name="color_options", on_delete=models.CASCADE)
    hex_value = models.CharField(max_length=7)


class ProductColorVariant(models.Model):
    product = models.ForeignKey(Product, related_name="color_variants", on_delete=models.CASCADE)
    color_hex = models.CharField(max_length=7)
    title = models.CharField(max_length=255)

    image_1 = models.ImageField(upload_to="products/variants/", blank=True, null=True)
    image_2 = models.ImageField(upload_to="products/variants/", blank=True, null=True)
    image_3 = models.ImageField(upload_to="products/variants/", blank=True, null=True)
    image_4 = models.ImageField(upload_to="products/variants/", blank=True, null=True)

    @property
    def images_list(self) -> list[ImageFieldFile]:
        images: list[ImageFieldFile] = []
        for img in (self.image_1, self.image_2, self.image_3, self.image_4):
            if img:
                images.append(img)
        return images


class ProductCharacteristic(models.Model):
    product = models.ForeignKey(Product, related_name="characteristics", on_delete=models.CASCADE)
    icon = models.ImageField(upload_to="products/icons/", blank=True, null=True)
    title = models.CharField(max_length=128)
    description = models.CharField(max_length=255)


class ProductTerm(models.Model):
    product = models.ForeignKey(Product, related_name="terms", on_delete=models.CASCADE)
    icon = models.ImageField(upload_to="products/icons/", blank=True, null=True)
    title = models.CharField(max_length=128)
    subtitle = models.CharField(max_length=255)


class ProductDescriptionSection(models.Model):
    product = models.OneToOneField(Product, related_name="description_section", on_delete=models.CASCADE)
    details_title = models.CharField(max_length=255)
    details_desc = models.TextField(blank=True, default="")


class ProductDescriptionCharacteristicGroup(models.Model):
    section = models.ForeignKey(
        ProductDescriptionSection,
        related_name="characteristics_groups",
        on_delete=models.CASCADE,
    )
    title = models.CharField(max_length=255)


class ProductDescriptionCharacteristicItem(models.Model):
    group = models.ForeignKey(
        ProductDescriptionCharacteristicGroup,
        related_name="items",
        on_delete=models.CASCADE,
    )
    title = models.CharField(max_length=255)
    value_text = models.CharField(max_length=255, blank=True, default="")
    value_list = models.JSONField(blank=True, null=True)

    def get_value(self) -> str | list[str]:
        raw = self.value_list
        if isinstance(raw, list) and len(raw) > 0 and all(isinstance(x, str) for x in raw):
            return raw
        return self.value_text
