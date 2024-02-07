def rövarspråk():
    vokaler = ["a","e","i","o","u","y","å","ä","ö"]
    ord = input("Skriv in ditt ord på svenska:")
    rövarord = []
    for bokstav in ord:
        if bokstav != " " and bokstav.lower() not in vokaler:
            rövarord.append(bokstav + "o" + bokstav)
        else:
            rövarord.append(bokstav)
    rövarord = "".join(rövarord)
    print(rövarord)

rövarspråk()

def baklänges(ord):
    ord = ord[::-1]
    print(ord)

baklänges("jag")
