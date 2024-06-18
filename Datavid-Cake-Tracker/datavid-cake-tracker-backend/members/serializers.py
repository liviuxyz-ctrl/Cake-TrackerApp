from rest_framework import serializers
from .models import Member
from datetime import date


class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = '__all__'

    def validate_birth_date(self, value):
        if value > date.today():
            raise serializers.ValidationError("Birth date cannot be in the future.")
        age = (date.today() - value).days // 365
        if age < 18:
            raise serializers.ValidationError("Member must be at least 18 years old.")
        return value
