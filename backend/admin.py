from django.contrib import admin
from .models import Image, FoodItem, Meal, MealItem, Profile
from .models import WeightEntry, CorrectedPrediction

admin.site.register(Image)
admin.site.register(FoodItem)
admin.site.register(MealItem)
admin.site.register(Meal)
admin.site.register(Profile)
admin.site.register(WeightEntry)
admin.site.register(CorrectedPrediction)
