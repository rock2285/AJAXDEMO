from django.shortcuts import render
from django.views import View
from django.http import JsonResponse
from .models import MyItem
import json


class Home(View):
    def get(self, request):
        return render(request, "home.html", {})


class Item(View):
    def get(self, request):

        # Json doesn't support tuples, so a list of
        # objects (dictionaries) is constructed to return
        ret = MyItem.objects.all().values()
        print(list(ret))
        return JsonResponse(json.dumps(list(ret)), safe=False)

    def post(self, request):
        name = request.POST.get("name", None)
        cost = request.POST.get("cost", None)

        if name:
            thisItem = MyItem(name=name)
            if len(MyItem.objects.filter(name=name)) > 0:
                thisItem = MyItem.objects.filter(name=name)[0]
            thisItem.cost = cost

            thisItem.save()
        # Json doesn't support tuples, so a list of
        # objects (dictionaries) is constructed to return
        ret = MyItem.objects.all().values()
        return JsonResponse(json.dumps(list(ret)), safe=False)
