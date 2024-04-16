from django.urls import path
from . import views

urlpatterns = [
    path("notes/" , views.NoteListCreate.as_view(),name="note-list"),
    path("notes/delete/<int:pk>/" , views.NoteDelete.as_view(),name="delete-note"),
    path("subjects/" , views.SubjectListCreate.as_view(),name="subject-list"),
    path("subjects/delete/<str:subject_name>/" , views.SubjectDelete.as_view(),name="delete-subject")

]