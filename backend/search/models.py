from django.db import models
from django_unixdatetimefield import UnixDateTimeField



class Chats(models.Model):
    text = models.TextField(unique=True)
    time = UnixDateTimeField()
    nama = models.TextField()
    nomor = models.TextField()
    
    