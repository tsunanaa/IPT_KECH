from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

class CustomUserCreateSerializer(BaseUserCreateSerializer):
    def create(self, validated_data):
        if 'username' not in validated_data and 'email' in validated_data:
            validated_data['username'] = validated_data['email']
        return super().create(validated_data)

    def perform_create(self, validated_data):
        if 'username' not in validated_data and 'email' in validated_data:
            validated_data['username'] = validated_data['email']
        return super().perform_create(validated_data)
