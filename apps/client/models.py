from django.db import models

# Create your models here.
class Client(models.Model):
    class Meta:
        verbose_name = 'Client'
        verbose_name_plural = 'Clients'

    name = models.CharField(max_length=255, unique=False)
    last_name = models.CharField(max_length=255, unique=False)
    telephone = models.PositiveIntegerField(unique=True, null=True, blank=True)
    email = models.EmailField(max_length=255, unique=True, null=True, blank=True)


    def __str__(self):
        return self.name
    