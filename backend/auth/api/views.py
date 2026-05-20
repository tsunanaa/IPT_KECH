from django.core.mail import send_mail
from django.conf import settings
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def send_login_notification(request):
    user = request.user
    if not user.email:
        return Response({'detail': 'No email address is set for this account.'}, status=400)

    send_mail(
        subject='Aphrodite login notification',
        message=f'You just logged in with {user.email}. If this was not you, please secure your account.',
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[user.email],
        fail_silently=False,
    )

    return Response({'detail': 'Login notification email has been sent.'})

