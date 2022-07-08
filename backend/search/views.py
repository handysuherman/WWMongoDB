from django.shortcuts import render
from rest_framework.views import APIView
from django.db.models import Q
from rest_framework.views import APIView, Response
from .models import Chats
from .serializers import ChatSerializer
import math
# Create your views here.
class ChatFrontendAPIView(APIView):
    
    def get(self, request):
        chats = Chats.objects.all()
        serializer = ChatSerializer(chats, many=True)
        return Response(serializer.data)

class ChatBackendAPIView(APIView):

    def get(self, request):
        s = request.GET.get('s')
        sort = request.GET.get('sort')
        page = int(request.GET.get('page', 1))
        per_page = 9


        chats = Chats.objects.all()

        if s:
            chats = chats.filter(Q(nomor__icontains=s) | Q(nama__icontains=s) | Q(text__icontains=s) | Q(time__icontains=s))
        
        if sort == 'asc':
            chats = chats.order_by('time')
        elif sort == 'desc':
            chats = chats.order_by('-time')

        total = chats.count()
        start = (page - 1) * per_page
        end = page * per_page

        serializer = ChatSerializer(chats[start:end], many=True)
        return Response({
            'data': serializer.data,
            'total': total,
            'page': page,
            'last_page': math.ceil(total / per_page)
            })