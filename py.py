input = input()
input = input.split(" ")
output = ""
print(input)
try:
    for i in range(6):
        if i == 0 or i == 1:
            output += str(1-int(input[i]))
        elif i == 2 or i == 3 or i == 4:
            output += str(2-int(input[i]))
        elif i == 5:
            output += str(8-int(input[i]))
        output += " "
    print(output)
except:
    print("Ogiltig input!")
