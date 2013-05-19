from django.http import HttpResponse
import json
import foursquare
import json
import config
import datetime
from mongoengine import *

connect('kaffee', host='dharma.mongohq.com', port=10009, username='kaffee', password=config.db_password)

class Venue(Document):
    name = StringField(required=True, max_length=200)
    score = IntField(required=True)
    lat = FloatField(required=True)
    lng = FloatField(required=True)
    time = DateTimeField(default=datetime.datetime.now)

def data(request):
    lat = request.GET.get('lat', 0)
    lng = request.GET.get('lng', 0)
    radius = request.GET.get('radius', 0)
    search = request.GET.get('search', 'coffee');
    print search
    if (not lat or not lng or not radius): 
        return HttpResponse("Shit is Fucked")
    
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