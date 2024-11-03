from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils import timezone
from django.utils.translation import gettext_lazy as _

# Custom User Manager
class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)

# Custom User Model
class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_('email address'), unique=True)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    date_of_birth = models.DateField(blank=True, null=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(auto_now_add=True)

    # Set the custom manager
    objects = CustomUserManager()

    # The field to use for login (username in the default model)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']  # Fields required when creating superuser

    def __str__(self):
        return self.email
    
# Model for Business (one per backend instance)
class Business(models.Model):
    name = models.CharField(max_length=255)
    owner = models.OneToOneField(CustomUser, on_delete=models.CASCADE)  # The owner of the business (super admin)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.name

# Extending User model for Client Profile
class ClientProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    business = models.ForeignKey(Business, on_delete=models.CASCADE)
    billing_info = models.TextField(blank=True, null=True)  # Billing information like payment details

    def __str__(self):
        return self.user.email

# Model for a virtual office space
class Office(models.Model):
    business = models.ForeignKey(Business, on_delete=models.CASCADE)  # Office belongs to a specific business
    name = models.CharField(max_length=255)
    team = models.ForeignKey('Team', on_delete=models.CASCADE)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.name

# Model for teams/departments using the workspace
class Team(models.Model):
    business = models.ForeignKey(Business, on_delete=models.CASCADE)  # Team belongs to a specific business
    name = models.CharField(max_length=255)
    members = models.ManyToManyField(CustomUser, related_name='teams')
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

# Model for virtual rooms within an office
class Room(models.Model):
    office = models.ForeignKey(Office, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    purpose = models.CharField(max_length=255, choices=(
        ('meeting', 'Meeting Room'),
        ('discussion', 'Discussion Room'),
        ('work', 'Work Room'),
    ))
    members = models.ManyToManyField(CustomUser, related_name='rooms', blank=True)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.name} - {self.office.name}"

# Model for messages in a real-time chat system
class Message(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE, related_name='messages')
    sender = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    content = models.TextField()
    sent_at = models.DateTimeField(default=timezone.now)
    is_read = models.BooleanField(default=False)

    def __str__(self):
        return f"Message from {self.sender.email} in {self.room.name}"

# Model for video conferencing sessions
class VideoCall(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    host = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='video_calls')
    started_at = models.DateTimeField(default=timezone.now)
    ended_at = models.DateTimeField(blank=True, null=True)
    participants = models.ManyToManyField(CustomUser, related_name='video_participants')

    def __str__(self):
        return f"Video call in {self.room.name} hosted by {self.host.email}"

# Model for a collaborative whiteboard
class Whiteboard(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    content = models.TextField()  # JSON or other serialized format for whiteboard data
    last_updated_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"Whiteboard for {self.room.name}"

# Model for shared calendar events
class CalendarEvent(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    organizer = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    room = models.ForeignKey(Room, on_delete=models.SET_NULL, null=True, blank=True)
    attendees = models.ManyToManyField(CustomUser, related_name='calendar_events')

    def __str__(self):
        return f"Event: {self.title}"

# Model for task and project management
class Task(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    assigned_to = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='tasks')
    created_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='created_tasks')
    due_date = models.DateTimeField()
    completed = models.BooleanField(default=False)
    priority = models.CharField(max_length=50, choices=(
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
    ))
    room = models.ForeignKey(Room, on_delete=models.CASCADE, related_name='tasks')

    def __str__(self):
        return f"Task: {self.title}"

# Model for task notifications
class Notification(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='notifications')
    message = models.CharField(max_length=255)
    created_at = models.DateTimeField(default=timezone.now)
    is_read = models.BooleanField(default=False)

    def __str__(self):
        return f"Notification for {self.user.email}: {self.message}"

# Model for presence/status indicators
class PresenceStatus(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='presence_status')
    status = models.CharField(max_length=50, choices=(
        ('available', 'Available'),
        ('busy', 'Busy'),
        ('in_a_meeting', 'In a Meeting'),
        ('offline', 'Offline'),
    ))
    last_updated_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.user.email}: {self.status}"