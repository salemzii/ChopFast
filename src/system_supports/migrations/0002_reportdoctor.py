# Generated by Django 3.1.1 on 2021-04-14 21:16

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('system_supports', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='reportDoctor',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('report', models.TextField()),
                ('rating', models.IntegerField(default=0)),
                ('doctor', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='doctor', to=settings.AUTH_USER_MODEL)),
                ('patient', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='patient', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
