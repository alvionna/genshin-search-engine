import requests
import json
from bs4 import BeautifulSoup

url = "https://genshin.gg/weapons/"
data = requests.get(url)
soup = BeautifulSoup(data.content, 'html5lib')

weapon_name = []
weapon_rarity = [img["src"] for img in soup.select("img.table-rarity")]
weapon_pic = []
weapon_type = []
weapon_atk = []
weapon_sec = []
weapon_wish = []
stats_list = []

for name in soup.find_all("div", attrs={'class': 'table-image-wrapper'}): 
    weapon_name.append(name.text)
    weapon_pic.append(name.img['src'])

for type in soup.find_all("img", attrs={'class': 'table-image sm'}): 
    weapon_type.append(type['src'])

for stats in soup.find_all("div", attrs={'class': 'rt-td t1'}): 
    stats_list.append(stats.text)

for idx in range(0, len(stats_list), 3):
    weapon_atk.append(stats_list[idx])
    weapon_sec.append(stats_list[idx+1])
    weapon_wish.append(stats_list[idx+2])

# sanity check
# print(len(weapon_type))
# print(len(weapon_name))
# print(len(weapon_pic))
# print(len(weapon_atk))
# print(len(weapon_sec))
# print(len(weapon_wish))

whole_data = []
for idx in range(len(weapon_atk)): 
    data = {"id": "weapons", 
            "name": weapon_name[idx], 
            "weapon_pic": weapon_pic[idx], 
            "type_img": weapon_type[idx], 
            "rarity": weapon_rarity[idx], 
            "atk": weapon_atk[idx], 
            "secondary": weapon_sec[idx], 
            "drop": weapon_wish[idx], 
            "tags": ['weapon', weapon_name[idx]]}
    whole_data.append(data)

# sanity check
# print(len(result))
# result = {"weapons": whole_data, "artifacts": [], "characters": [], "story": []}

# with open('../frontend/json/data.json','w') as file:
#     json.dump(result, file, indent=4)

with open('../frontend/json/weapons.json','w') as file:
    json.dump(whole_data, file, indent=4)