from django.conf.urls import patterns, include, url

from kaffee import view
import settings

urlpatterns = patterns('',
    url(r'^$', 'kaffee.view.index'),
    url(r'^data$', 'kaffee.api.data'),
    url(r'^static/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.STATIC_ROOT, 'show_indexes': False,}),

)