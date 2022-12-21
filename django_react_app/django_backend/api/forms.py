from django import forms
from django.contrib.auth import get_user_model
User = get_user_model()

class Signup(forms.Form):
    username = forms.CharField(required=True)
    password = forms.CharField(required=True)
    confirm_password = forms.CharField(required=True)
    zip_code = forms.CharField(required=True)

    def clean_username(self):
        username = self.cleaned_data["username"]
        if User.objects.filter(username=username).exists():
            raise forms.ValidationError("Username already exist.")
        return username
    
    def clean_confirm_password(self):
        password = self.cleaned_data["password"]
        confirm_password = self.cleaned_data["confirm_password"]
        if password != confirm_password:
            raise forms.ValidationError("Passwords do not match.")
        return password
    
    def clean_zip_code(self):
        zip_code = self.cleaned_data["zip_code"]
        if len(zip_code) != 5:
            raise forms.ValidationError("ZIP code needs to be 5 numeric (0-9) characters in length.")
        if zip_code.isnumeric() == False:
            raise forms.ValidationError("ZIP code can only contain 5 numeric (0-9) characters.")
        return zip_code