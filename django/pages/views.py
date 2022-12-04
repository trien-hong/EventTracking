from django.utils.safestring import mark_safe
from django.shortcuts import render, redirect
from django.contrib.auth import get_user_model
User = get_user_model()
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from . import views
from . models import UserEvents
from . import forms
import ticketmaster_api
import openweathermap_api

def login_page(request):
    if request.method == "GET":
        login_form = forms.Login()
        return render(request, 'login_page.html', { 'login_form': login_form })
    if request.method == "POST":
        user_info = request.POST
        form = forms.Login(user_info)
        if form.is_valid():
            user = authenticate(request, username=user_info["username"], password=user_info["password"])
            if user is not None:
                login(request, user)
                messages.add_message(request, messages.SUCCESS, "Login successful!")
                return redirect(index)
            else:
                messages.add_message(request, messages.ERROR, "The username and/or password seem to be incorrect. Please try again.")
                return redirect(login_page)
        else:
            messages.add_message(request, messages.ERROR, "The username and/or password seem to be incorrect. Please try again.")
            return redirect(login_page)

def signup_page(request):
    if request.method == "GET":
        signup_form = forms.Signup()
        return render(request, 'signup_page.html', { 'signup_form': signup_form })
    if request.method == "POST":
        user_info = request.POST
        form = forms.Signup(user_info)
        if form.is_valid():
            user = User.objects.create_user(username=form.cleaned_data["username"], password=form.cleaned_data["password"], zip_code=form.cleaned_data["zip_code"])
            messages.add_message(request, messages.SUCCESS, "User has been successfully created. You may now login.")
            return redirect(signup_page)
        else:
            error_string = getFormErrors(form)
            messages.add_message(request, messages.ERROR, mark_safe(error_string))
            return redirect(signup_page)

def password_reset(request):
    if request.method == "GET":
        reset_password_form = forms.ResetPassword()
        return render(request, 'password_reset.html', { 'reset_password_form': reset_password_form })
    if request.method == "POST":
        user_info = request.POST
        form = forms.ResetPassword(user_info)
        if form.is_valid():
            reset_password = User.objects.get(username=form.cleaned_data["username"])
            reset_password.set_password(form.cleaned_data["confirm_password"])
            reset_password.save()
            messages.add_message(request, messages.SUCCESS, "The password associated with the username has been reset. You can now login.")
            return redirect(password_reset)
        else:
            error_string = getFormErrors(form)
            messages.add_message(request, messages.ERROR, mark_safe(error_string))
            return redirect(password_reset)
        
@login_required
def index(request):
    events = ticketmaster_api.getEvents(str(request.user.zip_code))
    if events == False:
        messages.add_message(request, messages.INFO, "The ZIP code on your profile does not contain any events.")
    return render(request, 'index.html', { "events": events })

@login_required
def search(request):
    if request.method == "GET":
        if "events" not in request.session:
            messages.add_message(request, messages.ERROR, "You did not properly search for events.")
            return render(request, 'search.html')
        elif request.session["events"] == False:
            messages.add_message(request, messages.INFO, "Your search came up empty. Try searching something else.")
            request.session["events"] == False
            return render(request, 'search.html', { "input": request.session["input"] })
        else:
            return render(request, 'search.html', { "events": request.session["events"], "input": request.session["input"]})
    if request.method == "POST":
        input = request.POST
        events = ticketmaster_api.getEvents(str(input["user_input"]))
        if events != False:
            request.session["events"] = list(events)
            request.session["input"] = input["user_input"]
            return render(request, 'search.html', { "events": request.session["events"], "input": request.session["input"]})
        else:
            request.session["events"] = False
            request.session["input"] = input["user_input"]
            return redirect(search)

@login_required
def profile(request):
    if UserEvents.objects.filter(user_id=request.user.id).exists():
        events = list(UserEvents.objects.all().filter(user_id=request.user.id))
        return render(request, 'profile.html', { "username": request.user.username, "events": events })
    else:
        messages.add_message(request, messages.INFO, "You currently do not have any events in your list.")
        return render(request, 'profile.html', { "username": request.user.username })

@login_required
def event_details(request):
    if request.method == "POST":
        event_details = ticketmaster_api.getEventDetails(request.POST["eventId"])
        weather_details = openweathermap_api.getWeatherDetails(event_details["latitude"], event_details["longitude"])
        return render(request, 'event_details.html', { "event_details": event_details, "weather_details": weather_details })

@login_required
def settings(request):
    if request.method == "GET":
        settings_form = forms.Settings()
        return render(request, 'settings.html', { "username": request.user.username, 'settings_form': settings_form })
    if request.method == "POST":
        user_info = request.POST
        form = forms.Settings(user_info)
        if form.is_valid():
            if form.cleaned_data["username"] == "" and form.cleaned_data["password"] == "" and form.cleaned_data["confirm_password"] == "" and form.cleaned_data["zip_code"] == "":
                messages.add_message(request, messages.INFO, "All your fields were empty. There were nothing to update.")
                return redirect(settings)
            if form.cleaned_data["username"] != "":
                update_username = User.objects.get(id=request.user.id)
                update_username.username = form.cleaned_data["username"]
                update_username.save()
            if form.cleaned_data["zip_code"] != "":
                update_zip_code = User.objects.get(id=request.user.id)
                update_zip_code.zip_code = form.cleaned_data["zip_code"]
                update_zip_code.save()
            if form.cleaned_data["password"] != "" and form.cleaned_data["confirm_password"] != "":
                update_password = User.objects.get(id=request.user.id)
                update_password.set_password(user_info["confirm_password"])
                update_password.save()
                messages.add_message(request, messages.SUCCESS, mark_safe("All applicable fields have been updated. You have been logged out.<br> Please login again."))
                return redirect(login_page)
            messages.add_message(request, messages.SUCCESS, "All applicable fields have been updatded.")
            return redirect(settings)
        else:
            error_string = getFormErrors(form)
            messages.add_message(request, messages.ERROR, mark_safe(error_string))
            return redirect(settings)

def getFormErrors(form):
    errors = list(form.errors.values())
    error_string = "<u>ERROR(S):</u><br>"
    for i in range(len(errors)):
        error_string = error_string + str(list(form.errors.values())[i][0]) + "<br>"
    return error_string

@login_required
def addEventToDatabase(request):
    if request.method == "POST":
        event_info = request.POST
        if UserEvents.objects.filter(user_id=request.user.id, event_id=event_info["eventId"]).exists():
            messages.add_message(request, messages.ERROR, "You already have this event in your list. Try adding a different event.")
        else:
            add_event = UserEvents(event_id=event_info["eventId"], event_title=event_info["eventTitle"], event_image_url=event_info["eventImageUrl"], event_date=event_info["eventDate"], event_location=event_info["eventLocation"], event_price=event_info["eventPrice"], user_id=request.user.id)
            add_event.save()
            messages.add_message(request, messages.SUCCESS, "Event was successfully added to your list.")
    if event_info["locationOfUrl"] == "search":
        return redirect(search)
    else:
        return redirect(index)

@login_required
def deleteEventFromDatabase(request):
    if request.method == "POST":
        event_info = request.POST
        delete_event = UserEvents.objects.get(event_id=event_info["eventId"], user_id=request.user.id)
        delete_event.delete()
        if UserEvents.objects.filter(user_id=request.user.id).exists():
            messages.add_message(request, messages.SUCCESS, "Event was successfully deleted from your list.")
    return redirect(profile)

@login_required
def logout_action(request):
    logout(request)
    messages.add_message(request, messages.SUCCESS, "Logout Successful!")
    return redirect(login_page)