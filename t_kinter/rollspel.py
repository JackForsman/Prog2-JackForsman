from tkinter import *
import tkinter.ttk as ttk
import random

window = Tk()
nummer = ["3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18"]
raser = Label(window, text= "Raser")
raser.pack()
dropdown = ttk.Combobox(window, values=["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"])
dropdown.pack()

yrken = Label(window, text= "Yrken")
yrken.pack()
dropdown2 = ttk.Combobox(window, values=["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"])
dropdown2.pack()

styrka = Label(window, text= "Styrka")
styrka.pack()
strength = random.choice(nummer)
S = Text(window, height=1, width=2)
S.pack()
S.insert(END,strength)

fysik = Label(window, text= "Fysik")
fysik.pack()
physic = random.choice(nummer)
F = Text(window, height=1, width=2)
F.pack()
F.insert(END,physic)

storlek = Label(window, text= "Storlek")
storlek.pack()
size = random.choice(nummer)
ST = Text(window, height=1, width=2)
ST.pack()
ST.insert(END,size)

intelligens = Label(window, text= "Intelligens")
intelligens.pack()
intelligence = random.choice(nummer)
I = Text(window, height=1, width=2)
I.pack()
I.insert(END,intelligence)

window.geometry("500x500")
window.mainloop()
