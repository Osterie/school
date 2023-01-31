import math

a = 1
b = 2

n = 10000
dx = (b-a)/n 

def f(x):
    return 1/x

sum = 0
for i in range(1, n):

    sum += f(a + i*dx)*dx

print(sum)


