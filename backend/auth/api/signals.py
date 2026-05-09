from django.core.mail import send_mail
from django.conf import settings
from django.dispatch import receiver
from djoser.signals import user_registered


@receiver(user_registered)
def send_registration_notification(sender, user, request, **kwargs):
    if not user.email:
        return

    send_mail(
        subject='Welcome to Aphrodite',
        message=(
            f'Hi {user.get_full_name() or user.username},\n\n'
            'Thank you for registering with Aphrodite.\n'
            'Your email address has been registered successfully and you can now log in using your email and password.\n\n'
            'If you did not create this account, please contact support immediately.\n\n'
            'Best regards,\n'
            'The Aphrodite Team'
        ),
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[user.email],
        fail_silently=False,
    )
