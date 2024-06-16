from rest_framework import generics
from .models import Member
from .serializers import MemberSerializer
from datetime import date, timedelta

class MemberListCreate(generics.ListCreateAPIView):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer

class MemberListSorted(generics.ListAPIView):
    serializer_class = MemberSerializer

    def get_queryset(self):
        today = date.today()
        upcoming_birthdays = Member.objects.all().annotate(
            days_until_birthday=(
                models.Case(
                    models.When(
                        birth_date__month=today.month,
                        birth_date__day__gte=today.day,
                        then=models.F('birth_date__day') - today.day
                    ),
                    models.When(
                        birth_date__month__gt=today.month,
                        then=(
                                     models.F('birth_date__month') - today.month
                             ) * 31 + models.F('birth_date__day') - today.day
                    ),
                    models.When(
                        birth_date__month=today.month + 1,
                        then=models.F('birth_date__day') + (31 - today.day)
                    ),
                    default=models.F('birth_date') + timedelta(days=365) - today,
                    output_field=models.IntegerField()
                )
            )
        ).order_by('days_until_birthday')
        return upcoming_birthdays
