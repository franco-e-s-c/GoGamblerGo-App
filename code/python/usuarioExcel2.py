import psycopg2
from psycopg2 import DatabaseError
import pandas as pd
import json
import io
import zipfile
from zipfile import ZipFile
import os
datos=input()
datos = json.loads(datos)
# if i == '':
#     i = '0'
# i = [i]
i = json.loads(datos['datos'])
print("III", i)
i = i["id"]
# datosC = input()
# datosC = json.load(datosC)
# print(datosC)
def conexion():
    try:
        return psycopg2.connect(
            host=datos["host"],
            user=datos["user"],
            password=datos["password"],
            database=datos["database"],
            port = datos["porto"]
        )
    except DatabaseError as ex:
        raise ex
ids = []
fecha = []
escolaridad = []
genero=[]
telefono=[]
idE=[]
nombre=[]
config = []
fechaAp = []
database = conexion()
def usuariosExcel():
    if database: 
        cursor = database.cursor()
        col1 = "Tiempo"
        col2 = "Tipo"
        col4 = "Clic"
        col5 = "Feedback"
        col6 = "Interval"
        col7 = "Pick"
        col8 = "Gain"
        col9 = "Loss"
        col10 = "Balance"
        col11 = "Iteration"

        with zipfile.ZipFile(os.path.join(os.path.dirname(__file__), '../experimentos/archive.zip'), "w") as zf:
        # with zipfile.ZipFile('experimentos/archive.zip', 'w') as zf:
            for j in i:
                print("JJJ", j)
                # cursor.execute("SELECT participante.id_participante, nombre ||' '|| apellidos as nombre_completo,  (CURRENT_DATE - fechanac)/365 as edad, escolaridad, case when sexo = false then 'Woman' when sexo = true then 'Man' end as sexo, telefono, id_exp, nombreconf FROM participante, experimento WHERE id_exp = %s AND participante.id_participante = experimento.id_participante", (j,)) 
                cursor.execute("SELECT participante.id_participante, nombre ||' '|| apellidos as nombre_completo,  fechanac, escolaridad, case when sexo = false then 'Woman' when sexo = true then 'Man' end as sexo, telefono, id_exp, nombreconf, fecha FROM participante, experimento WHERE id_exp = %s AND participante.id_participante = experimento.id_participante", (j,)) 
                d = cursor.fetchall()
                print("dddddd", d)
                ids.append(d[0][0]) 
                nombre.append(d[0][1]) 
                fecha.append(d[0][2])
                escolaridad.append(d[0][3]) 
                genero.append(d[0][4])  
                telefono.append(d[0][5])
                idE.append(d[0][6]) 
                config.append(d[0][7])
                fechaAp.append(d[0][8])
                
                cursor.execute("SELECT tclic FROM resultado WHERE id_exp = %s AND iteracion != 0;", (j,))
                rows = cursor.fetchall()
                tclic = [row[0].time().strftime('%H:%M:%S.%f') for row in rows]

                cursor.execute("SELECT tretroalimentacion FROM resultado WHERE id_exp = %s AND iteracion != 0;", (j,))
                rows= cursor.fetchall()
                tretro = [row[0].time().strftime('%H:%M:%S.%f') for row in rows]

                cursor.execute("SELECT tintervalo FROM resultado WHERE id_exp =%s AND iteracion != 0;", (j,))
                tinter = cursor.fetchall()

                cursor.execute("SELECT tinicio FROM resultado WHERE id_exp =%s AND iteracion != 0;", (j,))
                rows = cursor.fetchall()
                tinicio = [row[0].time().strftime('%H:%M:%S.%f') for row in rows]

                cursor.execute("SELECT tfinretro FROM resultado WHERE id_exp =%s AND iteracion != 0;", (j,))
                rows= cursor.fetchall()
                tfinretro = [row[0].time().strftime('%H:%M:%S.%f') for row in rows]

                cursor.execute("SELECT seleccion FROM resultado WHERE id_exp = %s AND iteracion != 0;", (j,))
                sel = cursor.fetchall()

                cursor.execute("SELECT ganancia FROM resultado WHERE id_exp = %s AND iteracion != 0;", (j,))
                ganancia = cursor.fetchall()

                cursor.execute("SELECT perdida FROM resultado WHERE id_exp = %s AND iteracion != 0;", (j,))
                perdida = cursor.fetchall()

                cursor.execute("SELECT total FROM resultado WHERE id_exp = %s AND iteracion != 0;", (j,))
                balance = cursor.fetchall()

                cursor.execute("SELECT iteracion FROM resultado WHERE id_exp = %s AND iteracion != 0;", (j,))
                iteration = cursor.fetchall()

                #exportar = pd.DataFrame({col1:tiempo, col2:tipo, col3:gsr})
                exportar2 = pd.DataFrame({col11:iteration, "Start": tinicio, col4:tclic, col5:tretro, "Feedback end":tfinretro, col6:tinter, col7:sel, col8:ganancia, col9:perdida, col10:balance})
                
                with zf.open(f"Game_"+str(j)+"_IGT.xlsx", "w") as buffer:
                    exportar2.to_excel(buffer, index=True)
                #exportar2.to_csv("experimentos/Exp_"+str(j)+"_IGT.csv", encoding='utf-8-sig')  
            # exportar = pd.DataFrame({"Participant ID":ids, "Game ID":idE, "Name":nombre,"Age":fecha, "Education Level":escolaridad, "Sex": genero, "Phone Number":telefono}) 
            exportar = pd.DataFrame({"Game ID":idE, "Participant ID":ids, "Name":nombre, "Application date":fechaAp, "Date of birth":fecha, "Phone Number":telefono, "Education Level":escolaridad, "Sex": genero, "Selected settings": config}) 

            with zf.open(f"Participants.xlsx", "w") as buffer:
                    exportar.to_excel(buffer, index=True)

usuariosExcel()