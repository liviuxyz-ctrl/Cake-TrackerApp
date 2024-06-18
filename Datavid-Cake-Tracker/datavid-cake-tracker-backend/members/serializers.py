from rest_framework import serializers
from .models import Member
from datetime import date
from rest_framework.exceptions import ValidationError


class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = '__all__'

    def validate_birth_date(self, value):
        if value > date.today():
            raise ValidationError("Birth date cannot be in the future.")
        age = date.today().year - value.year
        if age < 18:
            raise ValidationError("Member must be at least 18 years old.")
        return value
