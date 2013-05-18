from django.conf.urls import patterns, include, url

from kaffee import views

urlpatterns = patterns('',
    url(r'^$', 'kaffee.views.index'),
    url(r'^data$', 'kaffee.api.data')
)