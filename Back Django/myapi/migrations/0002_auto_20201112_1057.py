# Generated by Django 3.1.2 on 2020-11-12 15:57

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('myapi', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='hero',
            old_name='alias',
            new_name='price',
        ),
    ]
