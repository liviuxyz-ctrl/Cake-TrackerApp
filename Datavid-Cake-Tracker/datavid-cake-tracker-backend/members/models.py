from django.core.exceptions import ValidationError
from datetime import date
from django.db import models


def validate_age(birth_date):
    today = date.today()
    age = today.year - birth_date.year - ((today.month, today.day) < (birth_date.month, birth_date.day))
    if age < 18:
        raise ValidationError("Member must be at least 18 years old.")


class Member(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    birth_date = models.DateField(validators=[validate_age])
    country = models.CharField(max_length=100)
    city = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
