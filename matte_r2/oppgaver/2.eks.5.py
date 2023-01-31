
#VENSTRETILNÆRMING
a = 1
b = 5
n = 10 #10 rektangler
dx = (b-a)/n #rektangel bredde


def f(x):
    return x**2 - 2*x + 2

sum = 0
#Høyretilnærming om 0 endres til 1 tror jeg:)
for i in range(0, n):
    sum += f(a + i*dx)*dx

print(sum)