
import math

a = 0
b = 1
n = 1000

dx = (b-a)/n
sum = 0

def f(x):
    return math.e**x 


for i in range(n):
    
    sum += ( f(a + i*dx)*dx )

print(sum)