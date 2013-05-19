
from django.shortcuts import render
from django.shortcuts import redirect

def index(request):

	return render(request, 'index.jade', {
		"api_key": "AIzaSyB90zrBnc0zcmRuIKxkTvMxuBTBs4u-aHE"
	})

