# Generated by Django 4.2.3 on 2023-11-04 17:55

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_rename_aadhaar_userkyc_aadhar'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userdetail',
            name='address',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='users.useraddress'),
        ),
    ]
