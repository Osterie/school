#GEOMETRISK

a1 = 1000 #startverdi
k = 0.9   #k
n = 0     #antall ledd
sum = 0   #ikke endre

while sum < 8000: #Finner ut hvor mange ledd som kreves for at sum blir >= 8000
    n += 1
    sum += a1*(k)**(n-1)

print("trenger", n, "ledd")