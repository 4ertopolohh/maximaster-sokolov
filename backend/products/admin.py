#products\admin.py
from __future__ import annotations

import json

from django import forms
from django.contrib import admin
from django.core.exceptions import ValidationError
from django.forms.models import BaseInlineFormSet

from .models import (
    Product,
    ProductCategory,
    ProductMemoryOption,
    ProductDisabledMemoryOption,
    ProductColorOption,
    ProductColorVariant,
    ProductCharacteristic,
    ProductTerm,
    ProductDescriptionSection,
    ProductDescriptionCharacteristicGroup,
    ProductDescriptionCharacteristicItem,
)


class MaxNumInlineFormSet(BaseInlineFormSet):
    max_num_limit = None

    def clean(self):
        super().clean()
        if self.max_num_limit is None:
            return

        active = 0
        for form in self.forms:
            if form.cleaned_data and not form.cleaned_data.get("DELETE", False):
                active += 1

        if active > self.max_num_limit:
            raise ValidationError(f"Max items allowed: {self.max_num_limit}")


class MemoryInlineFormSet(MaxNumInlineFormSet):
    max_num_limit = 4


class DisabledMemoryInlineFormSet(MaxNumInlineFormSet):
    max_num_limit = 3


class ColorOptionsInlineFormSet(MaxNumInlineFormSet):
    max_num_limit = 10


class ProductMemoryOptionInline(admin.TabularInline):
    model = ProductMemoryOption
    extra = 0
    formset = MemoryInlineFormSet


class ProductDisabledMemoryOptionInline(admin.TabularInline):
    model = ProductDisabledMemoryOption
    extra = 0
    formset = DisabledMemoryInlineFormSet


class ProductColorOptionInline(admin.TabularInline):
    model = ProductColorOption
    extra = 0
    formset = ColorOptionsInlineFormSet


class ProductColorVariantInline(admin.StackedInline):
    model = ProductColorVariant
    extra = 0
    fields = ("color_hex", "title", "image_1", "image_2", "image_3", "image_4")


class ProductCharacteristicInline(admin.TabularInline):
    model = ProductCharacteristic
    extra = 0
    fields = ("icon", "title", "description")


class ProductTermInline(admin.TabularInline):
    model = ProductTerm
    extra = 0
    fields = ("icon", "title", "subtitle")


@admin.register(ProductCategory)
class ProductCategoryAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "order")
    search_fields = ("id", "title")
    list_editable = ("order",)
    prepopulated_fields = {"id": ("title",)}
    fields = ("id", "title", "icon", "order")


class ProductAdminForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = "__all__"

    def clean(self):
        cleaned = super().clean()

        if cleaned.get("category") is None:
            raise ValidationError("Product must have a category")

        if int(self.data.get("color_options-TOTAL_FORMS", 0)) < 1:
            raise ValidationError("Product must have at least one color option")

        if int(self.data.get("characteristics-TOTAL_FORMS", 0)) < 1:
            raise ValidationError("Product must have at least one characteristic")

        return cleaned


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    form = ProductAdminForm

    list_display = ("id", "title", "category", "sale_price", "full_price")
    search_fields = ("id", "title")

    fieldsets = (
        ("Main", {"fields": ("id", "title", "category", "sale_price", "full_price", "preview_image")}),
        ("Images", {"fields": ("image_1", "image_2", "image_3", "image_4")}),
        ("Description", {"fields": ("description_text",)}),
    )

    inlines = (
        ProductMemoryOptionInline,
        ProductDisabledMemoryOptionInline,
        ProductColorOptionInline,
        ProductColorVariantInline,
        ProductCharacteristicInline,
        ProductTermInline,
    )

    def save_model(self, request, obj, form, change):
        has_base_images = any([
            obj.preview_image,
            obj.image_1,
            obj.image_2,
            obj.image_3,
            obj.image_4,
        ])

        has_variant_images = ProductColorVariant.objects.filter(
            product=obj
        ).exclude(
            image_1__isnull=True,
            image_2__isnull=True,
            image_3__isnull=True,
            image_4__isnull=True,
        ).exists()

        if not has_base_images and not has_variant_images:
            raise ValidationError("Product must have at least one image")

        super().save_model(request, obj, form, change)


class ProductDescriptionCharacteristicItemAdminForm(forms.ModelForm):
    value_list = forms.CharField(
        required=False,
        widget=forms.Textarea(attrs={"rows": 3}),
        help_text='Введи одно значение (строка) или несколько через " ; " (получится список).',
        label="Value list",
    )

    class Meta:
        model = ProductDescriptionCharacteristicItem
        fields = ("title", "value_text", "value_list")
        widgets = {"value_text": forms.HiddenInput()}

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        instance = getattr(self, "instance", None)
        if not instance or not getattr(instance, "pk", None):
            return

        raw_list = getattr(instance, "value_list", None)
        if isinstance(raw_list, list) and len(raw_list) > 0:
            self.initial["value_list"] = " ; ".join([str(x) for x in raw_list])
            return

        raw_text = getattr(instance, "value_text", "")
        if isinstance(raw_text, str) and raw_text.strip():
            self.initial["value_list"] = raw_text

    def clean(self):
        cleaned = super().clean()
        raw = cleaned.get("value_list")

        raw_str = raw.strip() if isinstance(raw, str) else ""
        if raw_str == "":
            cleaned["value_list"] = None
            cleaned["value_text"] = ""
            return cleaned

        if raw_str.startswith("[") and raw_str.endswith("]"):
            try:
                parsed = json.loads(raw_str)
                if isinstance(parsed, list) and all(isinstance(x, str) for x in parsed):
                    parts = [x.strip() for x in parsed if x.strip()]
                    if len(parts) <= 1:
                        cleaned["value_list"] = None
                        cleaned["value_text"] = parts[0] if parts else ""
                    else:
                        cleaned["value_list"] = parts
                        cleaned["value_text"] = ""
                    return cleaned
            except Exception:
                pass

        if ";" in raw_str:
            parts = [p.strip() for p in raw_str.split(";")]
            parts = [p for p in parts if p != ""]
            if len(parts) <= 1:
                cleaned["value_list"] = None
                cleaned["value_text"] = parts[0] if parts else ""
                return cleaned
            cleaned["value_list"] = parts
            cleaned["value_text"] = ""
            return cleaned

        cleaned["value_list"] = None
        cleaned["value_text"] = raw_str
        return cleaned

    def save(self, commit=True):
        instance = super().save(commit=False)

        value_list = self.cleaned_data.get("value_list", None)
        value_text = self.cleaned_data.get("value_text", "")

        if isinstance(value_list, list):
            instance.value_list = value_list
            instance.value_text = ""
        else:
            instance.value_list = None
            instance.value_text = value_text if isinstance(value_text, str) else ""

        if commit:
            instance.save()
            self.save_m2m()
        return instance


class ProductDescriptionCharacteristicItemInline(admin.TabularInline):
    model = ProductDescriptionCharacteristicItem
    form = ProductDescriptionCharacteristicItemAdminForm
    extra = 0
    fields = ("title", "value_list")


@admin.register(ProductDescriptionCharacteristicGroup)
class ProductDescriptionCharacteristicGroupAdmin(admin.ModelAdmin):
    list_display = ("id", "section", "title")
    inlines = (ProductDescriptionCharacteristicItemInline,)


class ProductDescriptionCharacteristicGroupInline(admin.TabularInline):
    model = ProductDescriptionCharacteristicGroup
    extra = 0
    fields = ("title",)


@admin.register(ProductDescriptionSection)
class ProductDescriptionSectionAdmin(admin.ModelAdmin):
    list_display = ("product", "details_title")
    fields = ("product", "details_title", "details_desc")
    inlines = (ProductDescriptionCharacteristicGroupInline,)
