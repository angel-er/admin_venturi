from django.db import models
from apps.client.models import Client
from apps.product.models import Product

# MODEL TICKET
class Ticket(models.Model):
    PAYMENT_CHOICES = [
        ('cash', 'Efectivo'),
        ('qr', 'QR'),
        ('card', 'Tarjeta'),
    ]
    SERVICE_CHOICES = [
        ('dine_in', 'Para servir en mesa'),
        ('takeaway', 'Para llevar'),
    ]
    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='tickets')
    service_type = models.CharField(max_length=10, choices=SERVICE_CHOICES, default='dine_in')
    payment_cash = models.DecimalField(max_digits=13, decimal_places=2, default=0.00)
    payment_qr = models.DecimalField(max_digits=13, decimal_places=2, default=0.00)
    payment_card = models.DecimalField(max_digits=13, decimal_places=2, default=0.00)
    payment_type = models.CharField(max_length=10, choices=PAYMENT_CHOICES, default='cash')
    total_amount = models.DecimalField(max_digits=13, decimal_places=2, default=0.00)
    total_canceled = models.DecimalField(max_digits=13, decimal_places=2, default=0.00)
    change = models.DecimalField(max_digits=13, decimal_places=2, default=0.00)
    date = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'ticket'
        verbose_name = ('Ticket')
        verbose_name_plural = ('Tickets')
        order_with_respect_to = 'date'

    # def calculate_total(self):
    #     self.total_amount = sum(detail.subtotal_product for detail in self.details.all())
    #     self.save()
    
    # def calculate_total_canceled(self):
    #     self.total_canceled = self.payment_cash + self.payment_qr + self.payment_card
    #     self.save()

    # def calculate_change(self):
    #     self.change = self.total_canceled - self.total_amount

    def __str__(self):
        return f"Ticket {-self.id} - {self.client.name} {self.client.last_name}"

    def save(self, *args, **kwargs):
        # Calcula el cambio
        self.change = self.total_amount - self.total_canceled
        super().save(*args, **kwargs)

# MODEL DETAIL.
class TicketItem(models.Model):
    ticket = models.ForeignKey(Ticket, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete = models.CASCADE)
    quantity= models.PositiveIntegerField(default=1)
    subtotal= models.DecimalField(max_digits=10, decimal_places=2)
    created = models.DateTimeField(auto_now_add=True)
    class Meta:
        db_table = 'ticket_item'
        verbose_name = ('TicketItem')
        verbose_name_plural = ('TicketsItems')
        order_with_respect_to = 'product'

    @property
    def price(self):
        return self.product.price_product


    def __str__(self):
        return f"{self.quantity} x {self.product.name_product} (Ticket {self.ticket})"
    def save(self, *args, **kwargs):
        self.subtotal = self.quantity * self.product.price_product
        # self.product.stock -= self.quantity_product  # Reducir stock del producto
        self.product.save()
        super().save(*args, **kwargs)
        self.update_ticket_total()

    def update_ticket_total(self):
        ticket = self.ticket
        ticket.total_amount = sum(item.price for item in ticket.items.all())
        ticket.save()