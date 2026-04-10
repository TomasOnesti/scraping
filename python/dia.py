from selenium import webdriver
from selenium.webdriver.common.by import By
import time, json, re, os
#Abre la web donde se hara el scraping 
driver = webdriver.Chrome()
driver.get("https://diaonline.supermercadosdia.com.ar/huevo%20pascua?_q=huevo%20pascua&map=ft")

time.sleep(10)#Tiempo de espera para que cargue el JS
#Busca el elemento donde estan los productos
productos = driver.find_elements(By.CLASS_NAME, "vtex-product-summary-2-x-clearLink")

lista=[]
#Busqueda de cada producto para posterior guardado en la lista
for i in productos:
    nombre = i.find_element(By.CLASS_NAME, "vtex-product-summary-2-x-productBrand").text
    precio = i.find_element(By.CLASS_NAME,"diaio-store-5-x-sellingPriceValue").text
    aclaracion = i.find_element(By.CLASS_NAME,"vtex-product-highlights-2-x-productHighlightText--promotions").text
    img_element = i.find_element(By.TAG_NAME, "img")
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
#Crea un json y lo guarada en "Datos"
archivo = "datos/productos_dia.json"
with open(archivo, "w", encoding="utf-8") as f:
    json.dump(lista, f, ensure_ascii=False, indent=4)  
        
driver.quit()