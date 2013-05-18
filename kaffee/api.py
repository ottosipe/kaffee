from django.http import HttpResponse

def data(request):
	lat = request.GET.get('lat', 0)
	lng = request.GET.get('lng', 0)
	if (not lat or not lng):
		return HttpResponse("Shit is Fucked")

	return HttpResponse("hello max:" + lat + " " + lng)