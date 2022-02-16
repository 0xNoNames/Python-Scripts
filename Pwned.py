import requests
import os
import re
import time
from art import tprint
  
API_KEY = '5ba7a651-9545-4fbc-a9cd-152d7aae3bf7'
API_URL = 'https://2.intelx.io'
API_USER = "PYTHON"

os.system('cls' if os.name == 'nt' else 'clear')
tprint("LeakChecker")

def search(term, maxresults=100, buckets=[], timeout=5, datefrom="", dateto="", sort=4, media=0, terminate=[]):
    h = {'x-key': API_KEY, 'User-Agent': API_USER}
    p = {
        "term": term,
        "buckets": buckets,
        "lookuplevel": 0,
        "maxresults": maxresults,
        "timeout": timeout,
        "datefrom": datefrom,
        "dateto": dateto,
        "sort": sort,
        "media": media,
        "terminate": terminate
    }
    r = requests.post(API_URL + '/intelligent/search', headers=h, json=p)
    if r.status_code == 200:
        return r.json()['id']
    else:
        return r.status_code

def result(id, limit):
    h = {'x-key': API_KEY, 'User-Agent': API_USER}
    r = requests.get(API_URL + f'/intelligent/search/result?id={id}&limit={limit}', headers=h)
    if(r.status_code == 200):
        return r.json()
    else:
        return r.status_code

def terminate(uuid):
    h = {'x-key': API_KEY, 'User-Agent': USERAPI_USER_AGENT}
    r = requests.get(API_URL + f'/intelligent/search/terminate?id={uuid}', headers=h)
    if(r.status_code == 200):
        return True
    else:
        return r.status_code


while True:
    email = input("Entrez l'adresse mail à vérifier ('q' pour quitter): ")
    
    # Quitte si l'utilisateur entre "q" sinon vérifie que l'email est valide
    if email == "q":
        exit(0)  
    elif(not re.search('^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$', email)): 
        print("\nE-mail non valide !\n")  
        continue 

    # Pour récupérer l'id de recherche (c'est l'api qui est comme ça mais en gros tu fais search -> request -> terminate)
    search_id = search(email)
    
    # Initialisation des variables
    results = []
    done = False
    maxresults = 100
    
    # Pour laisser le temps au site de faire la request 
    while done == False:
            time.sleep(1)
            r = result(search_id, maxresults)
            for a in r['records']:
                results.append(a)
            maxresults -= len(r['records'])
            if(r['status'] == 1 or r['status'] == 2 or maxresults <= 0):
                if(maxresults <= 0):
                    terminate(uuid)(search_id)
                done = True

    # Tu peux voir les résultats en print(results) (c'est du json normalement)
    if (len(results) > 0):
        print("\nLEAKED !\n")
    else :
        print("\nL'adresse mail n'a pas leak !\n")
