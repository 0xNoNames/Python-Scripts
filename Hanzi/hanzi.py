#!/usr/bin/python3
import sys
import random
import os


def main(argv):
    if (len(argv) != 1):
        sys.exit("Utilisation: hanzi.py mots.txt")

    mots = {}

    try:
        with open(argv[0], "r", encoding='utf8') as f:
            for ligne in f.read().splitlines():
                mot, hanzi = ligne.split(",")
                mots[mot] = hanzi
    except Exception as e:
        sys.exit(e)

    if (len(mots) == 0):
        sys.exit(1)
        
    mots_apprendre = []
    nombre_mots = len(mots)
    nombre_connus = 0
    indice_mot = 0

    while(bool(mots)):
        indice_mot += 1
        mot_random, hanzi_random = random.choice(list(mots.items()))
        mots.pop(mot_random, None)

        reponse = None
        while reponse not in ("", "n"):
            os.system('cls' if os.name == 'nt' else 'clear')

            print("#" * 48)
            print("{: <47}{}".format("#", "#"))
            print("{}{:^46}{}".format("#", mot_random + " (" + str(indice_mot) + "/" + str(nombre_mots) + ")", "#"))
            print("{: <47}{}".format("#", "#"))
            print("#" * 48 + "\n")

            input("Appuyez sur \"Entrée\" pour afficher le sinogramme...")  

            os.system('cls' if os.name == 'nt' else 'clear')
            
            print("#" * 48)
            print("{: <47}{}".format("#", "#"))
            print("{}{:^45}{}".format("#", mot_random + " : " + hanzi_random + " (" + str(indice_mot) + "/" + str(nombre_mots) + ")", "#"))
            print("{: <47}{}".format("#", "#"))
            print("#" * 48 + "\n")
            
            reponse = input("Avez-vous bien tracé ce sinogramme ? (Entrée/N) : ").lower()
            if (reponse == ""):
                nombre_connus += 1
            else:
                mots_apprendre.append(mot_random + "," + hanzi_random + "\n")


    os.system('cls' if os.name == 'nt' else 'clear')

    print("Vous connaissez " + str(nombre_connus) + " mots sur " + str(nombre_mots) + " soit un total de " + '{:.0%}'.format(nombre_connus/nombre_mots) + "." + "\n")
    if (len(mots_apprendre) > 0) :
        try:
            with open("a_apprendre.txt", "w", encoding='utf8') as f:
                f.writelines(mots_apprendre)
        except Exception as e:
            sys.exit(e)
        input("Vous trouverez dans le fichier \"a_apprendre.txt\" les mots que vous ne connaissez pas." + "\n" + "Entrer pour quitter...")
    else :
        input("Entrer pour quitter...")

    sys.exit(1)


if __name__ == "__main__":
    main(sys.argv[1:])
