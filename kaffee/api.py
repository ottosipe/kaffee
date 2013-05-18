from django.http import HttpResponse
import json
import foursquare

def data(request):
    lat = request.GET.get('lat', 0)
    lng = request.GET.get('lng', 0)
    radius = request.GET.get('radius', 0)
    if (not lat or not lng or not radius): 
        return HttpResponse("Shit is Fucked")

    client = foursquare.Foursquare(client_id='51747628')
    ll = str(lat) + ',' + str(lng)
    results = client.venues.search(params={'ll':ll, 'query' : 'coffee', 'radius' : radius})
    
