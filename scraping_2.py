from selenium import webdriver
from selenium.webdriver.common.by import By
import time
import json
driver = webdriver.Chrome()

driver.get("https://listado.mercadolibre.com.ar/huevos-pascua#D[A:huevos%20pascua]")

time.sleep(5)
productos=""

for i in productos:
    driver.find_element(By.CSS_SELECTOR)