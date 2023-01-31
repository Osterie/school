#venstretilnærming
#tilnærmingsverdi
#integrasjon
#tabellverdier


x = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4]
fx = [13.1, 16.3, 0, 8.2, 19.7, 24.8, 28.1, 27.3, 21.0]

dx = x[1] -x[0] #Rektangelbredde
n = len(x)


sum = 0
for i in range(0, n-1):
    sum += fx[i] *dx

print(sum)
