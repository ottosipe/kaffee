from django.http import HttpResponse
import json
import foursquare
import json
import config

def data(request):
    lat = request.GET.get('lat', 0)
    lng = request.GET.get('lng', 0)
    radius = request.GET.get('radius', 0)
    search = request.GET.get('search', 'coffee');
    
    if (not lat or not lng or not radius): 
        raise Http404
    
    client = foursquare.Foursquare(client_id=config.client_id, client_secret=config.client_secret)

    ll = str(lat) + ',' + str(lng)
    results = client.venues.search(params={
	    								'll':ll, 
	    								'query' : search, 
	    								'radius' : radius,
	    								'limit' : 50,
	    								'intent' : "browse"
    								})
    
    output = json.dumps(results, sort_keys=True, indent=4, separators=(',', ': '))
    return HttpResponse(output )