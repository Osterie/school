import math

a = 1
b = 2
n = 100000


def f(x):
    return (math.e**(x**2))**2 #need to power of 2


sum = 0
dx = (b-a)/n

for i in range(1, n):
    sum += math.pi*( f(a + i*dx) * dx)


print(sum)
