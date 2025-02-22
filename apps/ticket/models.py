from django.db import models
from apps.client.models import Client
from apps.product.models import Product

# MODEL TICKET
class Ticket(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    order_type = models.CharField(max_length=150, default="mesa")
    payment_cash = models.DecimalField(max_digits=13, decimal_places=2, default=0.00)
    payment_qr = models.DecimalField(max_digits=13, decimal_places=2, default=0.00)
    payment_card = models.DecimalField(max_digits=13, decimal_places=2, default=0.00)
    total_amount = models.DecimalField(max_digits=13, decimal_places=2, default=0.00)
    total_canceled = models.DecimalField(max_digits=13, decimal_places=2, default=0.00)
    change = models.DecimalField(max_digits=13, decimal_places=2, default=0.00)
    date = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'ticket'
        verbose_name = ('Ticket')
        verbose_name_plural = ('Tickets')
        order_with_respect_to = 'date'

    def calculate_total(self):
        self.total_amount = sum(detail.subtotal_product for detail in self.details.all())
        self.save()
    
    def calculate_total_canceled(self):
        self.total_canceled = self.payment_cash + self.payment_qr + self.payment_card
        self.save()

    def calculate_change(self):
        self.change = self.total_canceled - self.total_amount

    def __str__(self):
        return f"Ticket {-self.pk} - {self.client.name} {self.client.last_name}"


# MODEL DETAIL.
class Detail(models.Model):
    ticket = models.ForeignKey(Ticket, on_delete=models.CASCADE, related_name='details')
    product = models.ForeignKey(Product, on_delete = models.CASCADE)
    quantity_product = models.PositiveIntegerField()
    subtotal_product = models.DecimalField(max_digits=10, decimal_places=2)
    created = models.DateTimeField(auto_now_add=True)

    @property
    def price_product(self):
        return self.product.price_product

    class Meta:
        db_table = 'detail'
        verbose_name = ('Detail')
        verbose_name_plural = ('Details')
        order_with_respect_to = 'product'

    def save(self, *args, **kwargs):
        self.subtotal = self.quantity_product * self.product.price_product
        # self.product.stock -= self.quantity_product  # Reducir stock del producto
        self.product.save()
        super().save(*args, **kwargs)
        self.ticket.calculate_total()
        self.ticket.calculate_total_canceled()
        self.ticket.calculate_change()

    def __str__(self):
        return f"{self.quantity_product} x {self.product.name_product} (Ticket {self.ticket.pk})"