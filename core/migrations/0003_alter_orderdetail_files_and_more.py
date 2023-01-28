# Generated by Django 4.1.5 on 2023-01-28 17:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_rename_instruction_orderdetail_files_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='orderdetail',
            name='files',
            field=models.FileField(blank=True, null=True, upload_to='orders/'),
        ),
        migrations.AlterField(
            model_name='orderdetail',
            name='instructions',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='orderdetail',
            name='paper_format',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='orderdetail',
            name='subject',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='orderdetail',
            name='topic',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
