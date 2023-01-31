from cmath import log
import numpy as np


summen = 0
for i in range(1, 1000000):
    summen += 1/i
    a = i


summen -= np.log(a)
print(summen)