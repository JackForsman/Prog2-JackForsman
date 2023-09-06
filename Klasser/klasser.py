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