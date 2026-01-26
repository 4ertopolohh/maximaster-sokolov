from django.http import JsonResponse

def visits_api(request):
    visits = request.session.get("visits", 0)
    visits += 1
    request.session["visits"] = visits
    return JsonResponse({"visits": visits})
