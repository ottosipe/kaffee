
from django.shortcuts import render

def index(request):
	return render(request, 'index.jade', {
		"api_key": "AIzaSyB90zrBnc0zcmRuIKxkTvMxuBTBs4u-aHE"
	})