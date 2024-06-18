# serializers.py
from rest_framework import serializers
from .models import Member
from datetime import date


class MemberSerializer(serializers.ModelSerializer):
    days_until_birthday = serializers.SerializerMethodField()

    class Meta:
        model = Member
        fields = ['id', 'first_name', 'last_name', 'birth_date', 'country', 'city', 'days_until_birthday']

    def get_days_until_birthday(self, obj):
        today = date.today()
        next_birthday = date(today.year, obj.birth_date.month, obj.birth_date.day)

        if next_birthday < today:
            next_birthday = date(today.year + 1, obj.birth_date.month, obj.birth_date.day)

        delta = next_birthday - today
        return delta.days
