
#!/usr/bin/python3
import sys
import unicodedata
import requests
from rich.progress import track

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
        res = requests.post("https://cemantix.certitudes.org/score", data={"word": word}, headers={"Origin": "https://cemantix.certitudes.org"})
        try:    
            score = float(res.json()["score"])
            if (score < 0.2267):
                continue
            elif(score < 0.3613):
                print("{:<10}{:.2f}°C{:>10}".format(word, score*100, "😎"))
            elif(score < 0.5203):
                print("{:<10}{:.2f}°C{:>10}".format(word, score*100, "🥵"))
            elif(score < 0.7122):
                print("{:<10}{:.2f}°C{:>10}".format(word, score*100, "🔥"))
            elif(score < 1):
                print("{:<10}{:.2f}°C{:>10}".format(word, score*100, "😱"))
            elif(score >= 1):
                print("{:<10}{:.2f}°C{:>10}".format(word, score*100, "🥳"))
                break
        except:
            continue

if __name__ == "__main__":
    main(sys.argv[1:])
