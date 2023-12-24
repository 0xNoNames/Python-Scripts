
#!/usr/bin/python3
from rich.progress import track
import unicodedata
import requests
import json
import sys


def main(argv):
    dictionnary = []
    
    if (len(argv) != 1):
        sys.exit("Utilisation: cemantix.py path:'/path/to/dictionary.txt'")
                
    try:
        with open(argv[0], "r", encoding="utf8") as file:
            for word in file:
                dictionnary.append("".join(char.lower() for char in unicodedata.normalize("NFD", word) if unicodedata.category(char) != "Mn")[:-1])
            dictionnary = list(sorted(set(dictionnary), key=len))
    except Exception as e:
        sys.exit(e)

    if (len(dictionnary) == 0):
        sys.exit("File not found")

    for word in track(dictionnary):
        res = requests.post("https://cemantix.certitudes.org/pedantix/score", data = json.dumps({"word": word, "answer": [word]}), headers={"Origin": "https://cemantix.certitudes.org", "Content-Type": "application/json"})
        matches = []
        for score in res.json()["score"]:
            if (isinstance(res.json()["score"][score], str)):
                matches.append(res.json()["score"][score].lower())
        if len(matches): 
            print(", ".join(set(matches)))

if __name__ == "__main__":
    main(sys.argv[1:])
