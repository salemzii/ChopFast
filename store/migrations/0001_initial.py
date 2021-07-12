# Generated by Django 3.1.1 on 2021-05-01 15:11

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Dish',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=40)),
                ('description', models.TextField()),
                ('image', models.ImageField(default='cake.jpg', upload_to='')),
                ('price', models.IntegerField(default=1500)),
            ],
        ),
        migrations.CreateModel(
            name='Payments',
            fields=[
                ('id', models.CharField(editable=False, max_length=18, primary_key=True, serialize=False)),
                ('email', models.CharField(max_length=60)),
                ('amount', models.IntegerField(default=1500)),
                ('verified', models.BooleanField(default=False)),
                ('time', models.DateTimeField(default=django.utils.timezone.now)),
                ('name', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('time', models.DateTimeField(default=django.utils.timezone.now)),
                ('status', models.CharField(choices=[('Processing', 'Processing'), ('In-Progress', 'In-Progress'), ('Completed', 'Completed')], max_length=16)),
                ('payment', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='store.payments')),
            ],
        ),
        migrations.CreateModel(
            name='Delivery',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('delivered', models.BooleanField(default=False)),
                ('confirm_delivery', models.BooleanField(default=False)),
                ('time', models.DateTimeField(default=django.utils.timezone.now)),
                ('status', models.CharField(choices=[('In-Progress', 'In-Progress'), ('Completed', 'Completed')], max_length=20)),
                ('dish', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='store.dish')),
                ('driver', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to=settings.AUTH_USER_MODEL)),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='store.order')),
            ],
        ),
    ]