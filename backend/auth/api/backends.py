from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend

User = get_user_model()

class EmailBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        email = kwargs.get('email', username)
        if not email:
            return None
        try:
            user = User.objects.filter(email=email).first()  # ✅ use filter instead of get
            if user and user.check_password(password) and self.user_can_authenticate(user):
                return user
        except Exception:
            return None
        return None