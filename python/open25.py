from selenium import webdriver
from selenium.webdriver.common.by import By
import time, json, re, os
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
#Abre la web donde se hara el scraping
driver = webdriver.Chrome()
driver.get("https://tienda.open25.com.ar/pascuas/")
#Busca el elemento donde estan los productos
productos = driver.find_elements(By.CLASS_NAME, "js-item-product")
time.sleep(2)#Tiempo de espera para que cargue el JS

lista=[]
#Busqueda de cada producto para posterior guardado en la lista
for i in productos:
    #Con cada try se verifica que no se guarde nada vacio
    try:
        nombre = i.find_element(By.CLASS_NAME, "js-item-name").text
    except:
        nombre = ""
    
    try:     
        precio = i.find_element(By.CLASS_NAME,"js-price-display").text
    except:
        precio = ""
    
    try:
        aclaracion = i.find_element(By.CLASS_NAME,"js-payment-discount-price-product-container").text
    except:
        aclaracion = ""
        
    img_element = i.find_element(By.TAG_NAME, "img")
    imagen = img_element.get_attribute("src")
    if not imagen or "data:image" in imagen:
        imagen = img_element.get_attribute("data-src")

    if not imagen:
        imagen = img_element.get_attribute("srcset")

    if imagen and " " in imagen:
        imagen = imagen.split(" ")[0]
            
    if nombre == "":
        continue
    #Se para el gramaje del nombre(normalmente suele decirlo jusnto con el nombre)
    match = re.search(r'((\d+(?:[.,]\d+)?)\s?(g|gr|grm))', nombre.lower())
    gramaje = match.group() if match else ""
    
    lista.append({
        "nombre": nombre,
        "precio": precio,
        "aclaracion":aclaracion,
        "imagen": imagen, 
        "gramaje": gramaje
    })
#Crea un json y lo guarda en "datos"
archivo = "datos/productos_open25.json"
with open(archivo, "w", encoding="utf-8") as f:
    json.dump(lista, f, ensure_ascii=False, indent=4)  
        
driver.quit()