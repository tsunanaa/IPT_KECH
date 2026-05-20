import os
import requests
from django.core.mail.backends.base import BaseEmailBackend
from django.conf import settings

class BrevoEmailBackend(BaseEmailBackend):
    def send_messages(self, email_messages):
        if not email_messages:
            return 0

        api_key = os.getenv('BREVO_API_KEY')
        if not api_key:
            # Fallback to django settings if available
            api_key = getattr(settings, 'BREVO_API_KEY', None)

        if not api_key:
            raise ValueError("BREVO_API_KEY is not configured in environment variables or Django settings.")

        headers = {
            'accept': 'application/json',
            'api-key': api_key,
            'content-type': 'application/json',
        }

        sent_count = 0
        for message in email_messages:
            sender_email = message.from_email or getattr(settings, 'DEFAULT_FROM_EMAIL', None) or os.getenv('EMAIL_HOST_USER')
            
            # Construct recipient list for Brevo format
            to_list = [{"email": to_email} for to_email in message.to]
            if not to_list:
                continue

            payload = {
                "sender": {"email": sender_email, "name": "Aphrodite Team"},
                "to": to_list,
                "subject": message.subject,
            }

            # Handle body (HTML or Text)
            html_content = None
            if hasattr(message, 'alternatives') and message.alternatives:
                for alt in message.alternatives:
                    if alt[1] == 'text/html':
                        html_content = alt[0]
                        break

            if html_content:
                payload["htmlContent"] = html_content
                # Brevo still allows text content fallback
                payload["textContent"] = message.body
            else:
                payload["textContent"] = message.body

            try:
                response = requests.post(
                    'https://api.brevo.com/v3/smtp/email',
                    headers=headers,
                    json=payload,
                    timeout=15
                )
                if response.status_code in [200, 201]:
                    sent_count += 1
                else:
                    print(f"Brevo API error: {response.status_code} - {response.text}")
            except Exception as e:
                print(f"Exception during Brevo HTTP API request: {e}")

        return sent_count
