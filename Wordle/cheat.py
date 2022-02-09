#!/usr/bin/python3
import sys
import unicodedata

def main(argv):
    dictionnary, wordGuesses = [], []
    wordLen, charsPlace, charsGood, charsBad = "", "", "", ""
    ischarsGoodEmpty = False

    if (len(argv) < 2 or len(argv) > 4):
        sys.exit("Utilisation: cheat.py path:'/path/to/dictionary.txt' word:'h***rd' [good_letters:'hrd'] [bad_letters:'qp']")
                
    try:
        with open(argv[0], "r", encoding="utf8") as file:
            for word in file:
                dictionnary.append("".join(char.lower() for char in unicodedata.normalize("NFD", word) if unicodedata.category(char) != "Mn")[:-1])
            dictionnary = list(sorted(set(dictionnary), key=len))
    except Exception as e:
        sys.exit(e)

    if (len(dictionnary) == 0):
        sys.exit("File not found")
        
    wordLen = len(argv[1])
        
    charsPlace = argv[1].lower()

    if (len(argv) > 2):
        charsGood = argv[2].lower()

    if (len(argv) > 3):
        charsBad = argv[3].lower()

    if (charsGood == "*"):
        ischarsGoodEmpty = True

    for word in dictionnary:
        if (len(word) < wordLen):
            continue
        elif (len(word) == wordLen and (all([chars in word for chars in charsGood]) or ischarsGoodEmpty) and all([chars not in word for chars in charsBad]) and all([word[i] == charsPlace[i] or charsPlace[i] == "*" for i in range(len(word))])):
            wordGuesses.append(word)
        elif (len(word) > wordLen):
            break

    print("  =|=  ".join(sorted(wordGuesses)))

if __name__ == "__main__":
    main(sys.argv[1:])

# if __name__ == "__main__":
#     print(f"Arguments count: {len(sys.argv)}")
#     for i, arg in enumerate(sys.argv):
#         print(f"Argument {i:>6}: {arg}")
