print("#" * 77)
print("{: <76}{}".format("#", "#"))
print("{}{:^75}{}".format("#", "Entrez le prénom suivi du nom d'une personne puis appuyez sur \"Entrée\".", "#"))
print("{}{:^75}{}".format("#", "Une fois toutes les personnes ajoutées, appuyez sur \"Entrée\".", "#"))
print("{: <76}{}".format("#", "#"))
print("#" * 77 + "\n")

ret = []
i = 0

while True:
    i += 1
    personne = input(f"Personne {i} : " )
    if (personne == "" or personne == " "):
        break
    ret.append(personne.split())

print('\n' + " - ".join([' '.join(personne) for personne in sorted(ret, key=lambda x: x[-1])]))
input('\n' + "\"Entrée\" pour quitter...")