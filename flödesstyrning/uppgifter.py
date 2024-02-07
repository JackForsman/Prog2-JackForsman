def uppgift1():
    for i in range(1000):
        if i % 7 == 0:
            print(i)

#uppgift1()

def uppgift2():
    string = input("Mata in din sträng: ")
    print(string)
    counter = 0
    for i in string:
        if i.isnumeric():
            counter += 1
        else:
            continue
    print(f"Det finns {counter} stycken siffror i strängen")

#uppgift2()



def uppgift3():
    counter = 0
    number = 2
    while counter < 1000:
        primtal = True
        for i in range(2, number):
            if number % i == 0:
                primtal = False
                break
        if primtal == True:
            counter +=1
            number += 1
            continue
        else:
            number +=1 
            continue
    print(f"Primtal nummer tusen är {number-1}.")


#uppgift3()

