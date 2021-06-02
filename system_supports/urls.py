from django.urls import path
from . import views


urlpatterns = [
    path('submit-feedback/', views.create_feedback, name='create-feedback'),
    path('feedback-list/', views.feedback_list, name='feedback_list'),
    path('report-doc/<int:id>', views.report_doc, name='report-doctor'),
    path('doc-reports/<int:id>', views.doc_reports, name='doctors-report'),
]
