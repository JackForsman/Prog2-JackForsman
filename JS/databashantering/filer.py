import csv

data = []
with open('teams.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    lista_xGoalsFor = []
    lag_namn = []

    for row in csv_reader:
        if row[5] == "all":
            lista_xGoalsFor.append(row[12])
            if max(lista_xGoalsFor) == row[12]:
                lag_namn.clear()
                lag_namn.append(row[0])
                lag_namn.append(row[12])
    print(lag_namn)


    csv_file.seek(0)

    lag_namn.clear()
    lista_xGoalsFor.clear()
    dict_data = {}

    for row_2 in csv_reader:
        if row_2[5] == "5on4":
            dict_data[row_2[0]] = float(row_2[7])

    sorted_dict = sorted(dict_data.items(), key=lambda x: x[1], reverse=True)

    for key, value in sorted_dict[:10]:
        print(key)
