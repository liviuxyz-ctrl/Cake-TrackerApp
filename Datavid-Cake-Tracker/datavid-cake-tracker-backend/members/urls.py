from django.urls import path
from .views import MemberListCreate, MemberListSorted

urlpatterns = [
    path('members/', MemberListCreate.as_view(), name='member-list-create'),
    path('members/sorted/', MemberListSorted.as_view(), name='member-list-sorted'),
]
