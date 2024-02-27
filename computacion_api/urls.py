"""point_experts_api URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from computacion_api.views import bootstrap
from computacion_api.views import users
from computacion_api.views import auth
#Importaciones para alumno y maestros 
# from computacion_api.views import alumnos
# from computacion_api.views import maestros

urlpatterns = [
    #Version
        path('bootstrap/version', bootstrap.VersionView.as_view()),
    #Create Admin
        path('admin/', users.AdminView.as_view()),
    #Lista de Admins
        path('lista-admins/', users.AdminAll.as_view()),
    #TO DO ALUMNO Y MAESTRO
    #Create Alumn
       # path('Alumno/', users.AlumnoView.as_view()),
    #Lista de Admins
        #path('lista-alumno/', users.AlumnoAll.as_view()),
    #Create Maestro
        #path('Maestro/', users.MaestroView.as_view()),
    #Lista de Maestros
       # path('lista-maestro/', users.MaestroAll.as_view()),   
        
    #Login
        path('token/', auth.CustomAuthToken.as_view()),
    #Logout
        path('logout/', auth.Logout.as_view())
]
