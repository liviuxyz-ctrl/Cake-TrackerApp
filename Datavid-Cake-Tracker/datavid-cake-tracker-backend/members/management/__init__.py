from django.core.management.base import BaseCommand
from django.db import connections
from django.db.utils import OperationalError

class Command(BaseCommand):
    help = 'Clears the database'

    def handle(self, *args, **kwargs):
        # Get all the tables in the database
        cursor = connections['default'].cursor()
        cursor.execute('SET FOREIGN_KEY_CHECKS=0;')
        cursor.execute('SHOW TABLES;')
        tables = cursor.fetchall()

        # Clear all tables
        for table in tables:
            cursor.execute(f'TRUNCATE TABLE {table[0]};')

        cursor.execute('SET FOREIGN_KEY_CHECKS=1;')
        self.stdout.write(self.style.SUCCESS('Successfully cleared the database'))
