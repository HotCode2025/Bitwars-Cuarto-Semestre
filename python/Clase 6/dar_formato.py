nombre = "Ariel"
edad = 28
mensaje_con_formato = "Mi nombre es %s y tengo %d años" % (nombre, edad)


persona = ("Carla", "Gomez", 5000.00)
mensaje_con_formato = "Hola %s %s. Tu sueldo es: %.2f" % persona
# print(mensaje_con_formato)

nombre = "Juan"
edad = 19
sueldo = 3000
mensaje_con_formato = "Nombre {} Edad {} Sueldo {:.2f}".format(nombre, edad, sueldo)

print(mensaje_con_formato)

mensaje = "Nombre {0} Edad {1} Sueldo {2}".format(nombre, edad, sueldo)

print(mensaje)

diccionario = {'Nombre': 'Ivan', 'edad': 35, 'sueldo': 5000.00}
mensaje = 'Nombre {dic[Nombre]} Edad {dic[edad]} Sueldo {dic[sueldo]:.2f}'.format(dic=diccionario)

print(mensaje)

