from django.db import models
from datetime import date
from django.core.exceptions import ValidationError

def validate_age(value):
    today = date.today()
    age = today.year - value.year - ((today.month, today.day) < (value.month, value.day))
    if age < 18:
        raise ValidationError('Member must be at least 18 years old.')

class Member(models.Model):
    first_name = models.CharField(max_length=50, unique=True)
    last_name = models.CharField(max_length=50, unique=True)
    birth_date = models.DateField(validators=[validate_age])
    country = models.CharField(max_length=50)
    city = models.CharField(max_length=50)

    def __str__(self):
        return f'{self.first_name} {self.last_name}'
