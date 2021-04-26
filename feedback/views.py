from feedback.tasks import send_feedback_email_task
from rest_framework.renderers import JSONRenderer
from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse

#Modificação para apenas envio de email após recebimento das informações do front

class FeedbackView(APIView):

    permission_classes = [permissions.AllowAny]
    renderer_classes = [JSONRenderer]

    def post(self, request):
        value = request.data['valor']
        send_feedback_email_task.delay(value['email'], value['message'])  
        return Response(status=status.HTTP_200_OK)
