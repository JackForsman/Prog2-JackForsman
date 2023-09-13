def multiplicera(*args):
    produkt = args[0]
    args = list(args)
    args.pop(0)

    for tal in args:
        produkt *= tal
    return produkt

print(multiplicera(3,5,6,3))

def food(mat, vegan = False):
    if vegan == True:
        print(f"soja{mat}")
    else:
        print(mat)

food("mjölk", True)

