from selenium import webdriver
from selenium.webdriver.common.by import By
import time, json, re, os
 #Igual que dia.py con leves diferencias(la paagina y los nombres de clases o tag donde estan los datos de los productos)
 
driver = webdriver.Chrome()

driver.get("https://www.cotodigital.com.ar/sitios/cdigi/productos/huevo-de-pascua")

time.sleep(5)

productos = driver.find_elements(By.CLASS_NAME, "card-container")

lista=[]
for i in productos:
    nombre = i.find_element(By.TAG_NAME, "h3").text
    precio = i.find_element(By.TAG_NAME,"h4").text
    aclaracion = i.find_element(By.CLASS_NAME,"offer-crum").text
    img_element = i.find_element(By.CLASS_NAME, "product-image")
    imagen = img_element.get_attribute("src")
    gramaje= ""
    match = re.search(r'((\d+(?:[.,]\d+)?)\s?(g|gr|grm))',nombre.lower())
    gramaje= match.group() if match else ""
    
    lista.append({
        "nombre": nombre,
        "precio": precio,
        "aclaracion":aclaracion,
        "imagen": imagen, 
        "gramaje": gramaje
    })

archivo = "datos/productos.json"


with open(archivo, "w", encoding="utf-8") as f:
    json.dump(lista, f, ensure_ascii=False, indent=4)  
        
driver.quit()