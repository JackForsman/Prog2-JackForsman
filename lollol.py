from tkinter import *
import random
root = Tk()

robot = 0 
person = 0
choices = ["sten", "sax", "påse"]
person_choice = ""
robot_choice = ""

beaten_by = {'sten': 'sax',
             'sax': "påse",
             'påse': "sten",
            }

sten = Button(root, text ="Sten")
sax = Button(root, text ="Sax")
påse = Button(root, text ="Påse")

def click_sten(self):
    person_choice = "sten"
    print("sten")

def click_sax(self):
    person_choice = "sax"
    print("sax")

def click_påse(self):   
    persom_choice = "påse"
    print("påse")

def click_handler(self):			# skapa en "callback"-funktion
    print("Någon klickade på knappen!")
sten.bind("<Button-1>", click_sten)	# knyt funktionen till händelse
sten.pack()
sax.bind("<Button-1>", click_sax)	# knyt funktionen till händelse
sax.pack()
påse.bind("<Button-1>", click_påse)	# knyt funktionen till händelse
påse.pack()


while person < 3 and robot < 3:
    
    robot_choice = random.choice(choices)
    print(robot_choice)
    person_choice = "sten"
    if robot_choice in beaten_by[person_choice]:
        print("You won!")
        person += 1
    elif person_choice in beaten_by[robot_choice]:
        print("Computer won!")
        robot += 1
    else:
        print("Draw!")

    print("Person: " + str(person_choice))
    print("Robot: " + str(robot_choice))

root.mainloop()