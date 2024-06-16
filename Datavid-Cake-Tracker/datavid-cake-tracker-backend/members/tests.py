from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import Member

class MemberModelTest(TestCase):
    def setUp(self):
        self.member = Member.objects.create(
            first_name='John',
            last_name='Doe',
            birth_date='1990-01-01'
        )

    def test_member_creation(self):
        self.assertEqual(self.member.first_name, 'John')
        self.assertEqual(self.member.last_name, 'Doe')
        self.assertEqual(str(self.member.birth_date), '1990-01-01')

class MemberAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.member = Member.objects.create(
            first_name='John',
            last_name='Doe',
            birth_date='1990-01-01'
        )

    def test_get_members(self):
        response = self.client.get(reverse('member-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['first_name'], 'John')

    def test_create_member(self):
        data = {
            'first_name': 'Jane',
            'last_name': 'Doe',
            'birth_date': '1995-05-15'
        }
        response = self.client.post(reverse('member-list'), data, format='json')
        print(response.content)  # Add this line to print the response content
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Member.objects.count(), 2)
        self.assertEqual(Member.objects.get(id=2).first_name, 'Jane')


    def test_get_sorted_members(self):
        response = self.client.get(reverse('member-list-sorted'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['first_name'], 'John')
