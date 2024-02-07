import math

tor_tid = input("Tors tid:")
mor_tid = input("Mors tid:")

tor_antal_morötter = 40*(int(mor_tid)/(int(tor_tid)+int(mor_tid)))
mor_antal_morötter = 40*(int(tor_tid)/(int(tor_tid)+int(mor_tid)))

tor_antal_morötter = math.floor(tor_antal_morötter)
mor_antal_morötter = round(mor_antal_morötter)

print(f"Tor {tor_antal_morötter}")
print(f"Mor {mor_antal_morötter}")
