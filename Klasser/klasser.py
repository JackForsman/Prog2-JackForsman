class Elev:
    def __init__(self, namn, ålder, godkänd):
        self.namn = namn
        self.ålder = ålder
        self.godkänd = godkänd
    
    def presentera():
        print(f"Hej! Jag heter {person1.namn}")

person1 = Elev("Erik", 25, True) 

if person1.godkänd == True:
    person1.glad = True 

print(person1.glad)

Elev.presentera()

class Bil:
    antalbilar = 0
    def __init__(self, __maxHastighet):
        self.__maxHastighet = __maxHastighet
        Bil.antalbilar += 1
    
    def getMaxhastighet(self):
        return self.__maxHastighet
    
    def setMaxhastighet(maxHastighet):
        self.__maxHastighet = maxHastighet
        
    
    def milestokm(miles):
        return 1.6093*miles
    
bil1 = Bil(65)
bil2 = Bil(54)

print(Bil.antalbilar)
print(Bil.milestokm(15)) 

print(bil2.getMaxhastighet())

bil1.setMaxhastighet(1)
print(bil2.getMaxhastighet())

