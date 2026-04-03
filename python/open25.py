from selenium import webdriver
from selenium.webdriver.common.by import By
import time, json, re, os
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

driver = webdriver.Chrome()
driver.get("https://tienda.open25.com.ar/pascuas/")

productos = WebDriverWait(driver, 10).until(
    EC.presence_of_all_elements_located((By.CLASS_NAME, "js-item-product"))
)

driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
time.sleep(2)
lista=[]
for i in productos:
    try:
        nombre = i.find_element(By.CLASS_NAME, "js-item-name").text
    except:
        nombre = ""
    
    try:     
        precio = i.find_element(By.CLASS_NAME,"js-price-display").text
    except:
        precio = ""
    
    try:
        aclaracion = i.find_element(By.CLASS_NAME,"js-offer-label-private").text
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

    match = re.search(r'((\d+(?:[.,]\d+)?)\s?(g|gr|grm))', nombre.lower())
    gramaje = match.group() if match else ""
    
    lista.append({
        "nombre": nombre,
        "precio": precio,
        "aclaracion":aclaracion,
        "imagen": imagen, 
        "gramaje": gramaje
    })

archivo = "datos/productos_open25.json"
with open(archivo, "w", encoding="utf-8") as f:
    json.dump(lista, f, ensure_ascii=False, indent=4)  
        
driver.quit()