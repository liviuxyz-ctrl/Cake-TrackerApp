from django.core.management.base import BaseCommand
from django.db import connections
from django.db.utils import OperationalError

class Command(BaseCommand):
    help = 'Clears the database'

    def handle(self, *args, **kwargs):
        # Get all the tables in the database
        cursor = connections['default'].cursor()
        cursor.execute('PRAGMA foreign_keys=OFF;')
        cursor.execute('SELECT name FROM sqlite_master WHERE type="table";')
        tables = cursor.fetchall()

        # Clear all tables
        for table in tables:
            cursor.execute(f'DELETE FROM {table[0]};')

        cursor.execute('PRAGMA foreign_keys=ON;')
        self.stdout.write(self.style.SUCCESS('Successfully cleared the database'))
