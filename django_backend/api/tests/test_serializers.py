# i'll add more test later

from .. import serializers
from django.test import TestCase
from django.contrib.auth import get_user_model
User = get_user_model()

class TestSignupSerializer(TestCase):
    def setUp(self):
        User.objects.create(email="emailexist@emailexist.com", username="usernameexist")

    def test_SignupValidSerializer(self):
        """
        Expected output: True
        Reason: Email is unique, username is unique, passwords match, and zip_code is valid
        """
        # All the keys' value are unique and or valid
        valid_mock_dictionary = {
            "email": "email@email.com",
            "username": "username",
            "password": "password123",
            "confirm_password": "password123",
            "zip_code": "30303"
        }
        serializer = serializers.SignupValidateSerializer(data=valid_mock_dictionary)
        self.assertEqual(serializer.is_valid(), True)

    def test_SignupInvalidEmailSerializer(self):
        """
        Expected output: False
        Reason: You cannot have two of the same email since "emailexist@emailexist.com" already exist in the database
        """
        invalid_mock_dictionary = {
            # email already exist
            "email": "emailexist@emailexist.com",
            "username": "username",
            "password": "password123",
            "confirm_password": "password123",
            "zip_code": "30303"
        }
        serializer = serializers.SignupValidateSerializer(data=invalid_mock_dictionary)
        self.assertEqual(serializer.is_valid(), False)

    def test_SignupInvalidUsernameSerializer(self):
        """
        Expected output: False
        Reason: You cannot have two of the same username since "usernameexist" already exist in the database
        """
        invalid_mock_dictionary = {
            "email": "email@email.com",
            # username already exist
            "username": "usernameexist",
            "password": "password123",
            "confirm_password": "password123",
            "zip_code": "30303"
        }
        serializer = serializers.SignupValidateSerializer(data=invalid_mock_dictionary)
        self.assertEqual(serializer.is_valid(), False)

    def test_SignupInvalidPasswordsSerializer(self):
        """
        Expected output: False
        Reason: The value of key password and key confirm_password need to have the same value
        """
        invalid_mock_dictionary = {
            "email": "email@email.com",
            "username": "username",
            # Passwords do not match
            "password": "password123",
            "confirm_password": "confirm_password123",
            "zip_code": "30303"
        }
        serializer = serializers.SignupValidateSerializer(data=invalid_mock_dictionary)
        self.assertEqual(serializer.is_valid(), False)

    def test_SignupInvalidZipcodeSerializer(self):
        """
        Expected output: False
        Reason: Zip_code of "3030a" is not an actual valid zip_code
        """
        invalid_mock_dictionary = {
            "email": "email@email.com",
            "username": "username",
            "password": "password123",
            "confirm_password": "password123",
            # Zip_code is not an actual valid zip_code as it contains the character 'a'
            "zip_code": "3030a"
        }
        serializer = serializers.SignupValidateSerializer(data=invalid_mock_dictionary)
        self.assertEqual(serializer.is_valid(), False)

class TestUpdateUserInfoSerializer(TestCase):
    """
    i am aware that this is more or less a mirrow of TestSignupSerializer
    """
    def setUp(self):
        User.objects.create(email="emailexist@emailexist.com", username="usernameexist")
    
    def test_UpdateUserInfoValidSerializer(self):
        """
        Expected output: True
        Reason: Email is unique, username is unique, passwords match, and zip_code is valid
        """
        # All the keys' value are unique and or valid
        valid_mock_dictionary = {
            "email": "email@email.com",
            "username": "username",
            "password": "password123",
            "confirm_password": "password123",
            "zip_code": "30303"
        }
        serializer = serializers.UpdateUserInfoValidateSerializer(data=valid_mock_dictionary)
        self.assertEqual(serializer.is_valid(), True)

    def test_UpdateUserInfoInvalidEmailSerializer(self):
        """
        Expected output: False
        Reason: You cannot have two of the same email since "emailexist@emailexist.com" already exist in the database
        """
        invalid_mock_dictionary = {
            # email already exist
            "email": "emailexist@emailexist.com",
            "username": "username",
            "password": "password123",
            "confirm_password": "password123",
            "zip_code": "30303"
        }
        serializer = serializers.UpdateUserInfoValidateSerializer(data=invalid_mock_dictionary)
        self.assertEqual(serializer.is_valid(), False)
    
    def test_UpdateUserInfoInvalidUsernameSerializer(self):
        """
        Expected output: False
        Reason: You cannot have two of the same username since "usernameexist" already exist in the database
        """
        invalid_mock_dictionary = {
            "email": "email@email.com",
            # username already exist
            "username": "usernameexist",
            "password": "password123",
            "confirm_password": "password123",
            "zip_code": "30303"
        }
        serializer = serializers.UpdateUserInfoValidateSerializer(data=invalid_mock_dictionary)
        self.assertEqual(serializer.is_valid(), False)

    def test_UpdateUserInfoInvalidPasswordSerializer(self):
        """
        Expected output: False
        Reason: The value of key password and key confirm_password need to have the same value
        """
        invalid_mock_dictionary = {
            "email": "email@email.com",
            "username": "username",
            # Passwords do not match
            "password": "password123",
            "confirm_password": "confirm_password123",
            "zip_code": "30303"
        }
        serializer = serializers.UpdateUserInfoValidateSerializer(data=invalid_mock_dictionary)
        self.assertEqual(serializer.is_valid(), False)
    
    def test_UpdateUserInfoInvalidZipcodeSerializer(self):
        """
        Expected output: False
        Reason: Zip_code of "3030a" is not an actual valid zip_code
        """
        invalid_mock_dictionary = {
            "email": "email@email.com",
            "username": "username",
            "password": "password123",
            "confirm_password": "password123",
            # Zip_code is not an actual valid zip_code as it contains the character 'a'
            "zip_code": "3030a"
        }
        serializer = serializers.UpdateUserInfoValidateSerializer(data=invalid_mock_dictionary)
        self.assertEqual(serializer.is_valid(), False)