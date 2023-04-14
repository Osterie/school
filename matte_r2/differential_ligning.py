import math
from pylab import *

# Constants
growth_factor = 0.5

# starting conditions
function_value = 100
time = 0

# Step length and end time
step_length = 0.001
time_end = 10

# Lister
function_y_values = [function_value]
function_x_values = [time]

# Eulers metode

while time < time_end:

    function_value += growth_factor*function_value*step_length
    time += step_length

    function_y_values.append(function_value)
    function_x_values.append(time)

# Plotting 

plot(function_x_values, function_y_values)
xlabel("Dager")
ylabel("Populasjon")

show()