# views.py
from rest_framework import generics
from .models import Member
from .serializers import MemberSerializer
from datetime import date, timedelta
from django.db.models import Case, When, F, IntegerField


class MemberListCreate(generics.ListCreateAPIView):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer


class MemberListSorted(generics.ListAPIView):
    serializer_class = MemberSerializer

    def get_queryset(self):
        today = date.today()
        upcoming_birthdays = Member.objects.annotate(
            days_until_birthday=(
                Case(
                    When(
                        birth_date__month=today.month,
                        birth_date__day__gte=today.day,
                        then=F('birth_date__day') - today.day
                    ),
                    When(
                        birth_date__month__gt=today.month,
                        then=(
                                (F('birth_date__month') - today.month) * 31 + F('birth_date__day') - today.day
                        )
                    ),
                    When(
                        birth_date__month=today.month + 1,
                        then=F('birth_date__day') + (31 - today.day)
                    ),
                    default=F('birth_date__day') + timedelta(days=365) - today,
                    output_field=IntegerField()
                )
            )
        ).order_by('days_until_birthday')
        return upcoming_birthdays
