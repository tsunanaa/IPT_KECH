import os
import django
from django.core.mail import send_mail

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'auth.settings')
django.setup()

def run_test():
    print("Attempting to send a test email via Django using the new custom Brevo HTTP API backend...")
    try:
        send_mail(
            subject='Test Email from Aphrodite via custom Django Brevo Backend',
            message='Congratulations! Your custom Brevo HTTP API backend integrates perfectly with Django!',
            from_email=None, # uses settings.DEFAULT_FROM_EMAIL
            recipient_list=['chonamaesinto03@gmail.com'], # send to self to verify
            fail_silently=False,
        )
        print("Success! The email was sent successfully via Django's send_mail interface.")
    except Exception as e:
        print(f"Error occurred while sending email: {e}")

if __name__ == '__main__':
    run_test()
