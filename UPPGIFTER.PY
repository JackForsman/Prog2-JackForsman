
def greet(name, lang="swe"):
    if lang == "swe":
        print(f"Hej {name}")
    elif lang == "eng":
        print(f"Hello {name}")
    elif lang == "fr":
        print(f"Bonjour {name}")
    else:
        print(f"¯\_(ツ)_/")

greet("Martin")
greet("Martin", "eng")
greet("Martin", "fin")