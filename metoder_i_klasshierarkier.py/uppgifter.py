class Djur:
    def __init__(self, namn):
        self.namn = namn
    def at():
        print("Djuret äter!")
    def sov():
        print("zzzZZZzZZZz")

class Fagel(Djur):
    def __init__(self, namn, vingspann):
        super().__init__(namn)
        self.vingspann = vingspann

class Fisk(Djur):
    def __init__(self, namn, maxdjup):
        super().__init__(namn)
        self.maxdjup = maxdjup
    def simma():
        print("Fisken simmar!")

class Haj(Fisk):
    def __init__(self, namn, maxdjup, antalTänder):
        super().__init__(namn, maxdjup)
        self.antalTänder = antalTänder
    def at(self, djur):
        print(f"{self} äter {djur}!")

class Torsk(Fisk):
    def __init__(self, namn, maxdjup, hastighet):
        super().__init__(namn, maxdjup)
        self.hastighet = hastighet  

class Fordon():
    pass
class Bil():
    def kör():
        print("Bilen kör!")
class Sportbil(Bil):
    def kör():
        print("Bilen kör!")
class Cykel(Fordon):
    def plinga():
        print("Pliiiing!!!")

def fånga(haj, torsk):
    if haj.maxdjup >= torsk.hastighet and torsk.hastighet < 30:
        return True
    else:
        return False
    
haj = Haj("Broo", 100, 80)
torsk = Torsk("hahah", 90, 28)
print(fånga(haj, torsk))  