import mysql.connector
import tkinter as tk

def insert_data():
    username_val = username_entry.get()
    password_val = password_entry.get()
    name_val = name_entry.get()
    email_val = email_entry.get()

    sql = "INSERT INTO guestbook (username, password, name, email) VALUES (%s, %s, %s, %s)"
    val = (username_val, password_val, name_val, email_val)
    
    mycursor.execute(sql, val)
    mydb.commit()
    
    print(mycursor.rowcount, "record(s) affected")
    
    update_database_display()

def update_database_display():
    mycursor.execute("SELECT * FROM guestbook")
    data = mycursor.fetchall()
    database_display.delete('1.0', tk.END) 
    for row in data:
        database_display.insert(tk.END, f"{row}\n")

mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="database guestbook"
)
mycursor = mydb.cursor()

window = tk.Tk()
window.title("Insert Data")

username_label = tk.Label(window, text="Username:")
username_label.grid(row=1, column=0)
username_entry = tk.Entry(window)
username_entry.grid(row=1, column=1)

password_label = tk.Label(window, text="Password:")
password_label.grid(row=2, column=0)
password_entry = tk.Entry(window)
password_entry.grid(row=2, column=1)    

name_label = tk.Label(window, text="Name:")
name_label.grid(row=3, column=0)
name_entry = tk.Entry(window)
name_entry.grid(row=3, column=1)

email_label = tk.Label(window, text="Email:")
email_label.grid(row=4, column=0)
email_entry = tk.Entry(window)
email_entry.grid(row=4, column=1)

insert_button = tk.Button(window, text="Insert Data", command=insert_data)
insert_button.grid(row=5, column=0, columnspan=2)

database_window = tk.Toplevel(window)
database_window.title("Database Contents")
database_display = tk.Text(database_window)
database_display.pack()

update_database_display()

window.mainloop()
