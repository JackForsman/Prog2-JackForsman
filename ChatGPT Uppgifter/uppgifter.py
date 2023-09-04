from getpass import getpass


def exercise3():
    year = int(input("Type in a year to check if it is a leap year: "))
    IsLeapYear = 0
    if year % 4 == 0:
        if year % 100 == 0:
            if year % 400 == 0:
                IsLeapYear = True
            else:
                IsLeapYear= False
        else:
            IsLeapYear = True
    else:
        IsLeapYear = False
    if IsLeapYear == True:
        print(f"{year} är ett skottår")
    else:
        print(f"{year} är inte ett skottår")

#exercise3()


def exercise4():
    total_sum = 0
    for number in range(1, 1000):
        if number % 3 == 0 or number % 5 == 0:
            total_sum += number

    print(f"The sum of multiples of 3 and 5 below 1000 is: {total_sum}")

#exercise4()


def exercise5():
    password = getpass()
    längd = False
    storBokstav = False
    litenBokstav = False
    nummer = False
    print(password)
    if len(password) >= 8:
        längd = True
        for tecken in password:
            if tecken.isalpha():
                if tecken.lower() != tecken:
                    storBokstav = True
                else: 
                    litenBokstav = True
            elif tecken.isdigit():
                nummer = True
    if längd and storBokstav and litenBokstav and nummer == True:
        print("Lösenordet är godkänt :)")
    else:
        print("Lösenordet är inte godkänt :(")
    



exercise5()
