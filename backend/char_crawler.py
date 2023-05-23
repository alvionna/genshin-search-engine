import requests
import json
from bs4 import BeautifulSoup
import unicodedata

url = "https://genshin.gg/builds/"
data = requests.get(url)
soup = BeautifulSoup(data.text, 'html.parser')

char_pic = [img["src"] for img in soup.select("img.character-icon")]
char_element = [] # contain a list for each char for the element img and the correspoding text element
char_name = [info.text for info in soup.find_all("div", attrs={'class': 'build-name'})]
char_role = [info.text for info in soup.find_all("div", attrs={'class': 'build-role'})]
char_weapon = []
char_artifacts = []
char_stats = []
char_rarity = []

rarity4_tag = soup.select_one("img.filters-item")
rarity4 = rarity4_tag['src']
rarity5 = rarity4_tag.next_sibling['src']


for img in soup.select("img.character-icon"):
    if "rarity-5" in img["class"]: 
        char_rarity.append(rarity5)
    elif "rarity-4" in img["class"]: 
        char_rarity.append(rarity4) 

for img in soup.select("img.character-type"): 
    char_element.append([img["src"], img["alt"]])

for row in soup.find_all("div", {"class": "build-stats"}): 
    stats = row.find_all("div", {'class': "build-stats-item"})
    each_char_stats = []
    for stat in stats: 
        each_char_stats.append(stat.text)
    char_stats.append(each_char_stats)

for row in soup.find_all("div", {"class": "build-content"}): 
    weapons_list = row.find("div", {"class": "build-weapon full"})
    weapon_pic = weapons_list.img["src"]
    weapon_name = weapons_list.find("div", {"class": "build-weapon-name"}).text
    weapon_info = [weapon_pic, weapon_name]
    char_weapon.append(weapon_info)

    artifacts_list = weapons_list.find_next_siblings("div")
    artifacts_info = []
    artifacts_pic = []
    artifacts_name = []
    artifacts_count = []
    for info in artifacts_list: 
        artifacts_pic.append(info.img["src"])
        artifacts_name.append(info.find("div", {"class": "build-weapon-name"}).text)
        artifacts_count.append(info.find("div", {"class": "build-weapon-count"}).text)
    
    artifacts_info = [artifacts_pic, artifacts_name, artifacts_count]
    char_artifacts.append(artifacts_info)


# sanity check 
# print("pic", len(char_pic))
# print("element", len(char_element))
# print("name", len(char_name))
# print("role", len(char_role))
# print("weapon", len(char_weapon))
# print("artifacts", len(char_artifacts))
# print("stats", len(char_stats))
# print("rarity", len(char_rarity))

result = []

for idx in range(len(char_name)): 
    data = {"id": "characters",
            "name": char_name[idx], 
            "char_pic": char_pic[idx], 
            "rarity": char_rarity[idx],
            "char_element_icon": char_element[idx][0], 
            "char_element_text": char_element[idx][1], 
            "char_role": char_role[idx],
            "char_weapon": {
                "weapon_pic": char_weapon[idx][0], 
                "weapon_name": char_weapon[idx][1], 
            },
            "char_artifacts": { 
                "artifacts_pic": char_artifacts[idx][0], #in a form of a list 
                "artifacts_name": char_artifacts[idx][1], 
                "artifacts_count": char_artifacts[idx][2]
            },
            "char_stats": {
                "sands": char_stats[idx][0], 
                "goblet": char_stats[idx][1], 
                "circlet": char_stats[idx][2]
            }, 
            "tags": ['character', 'characters', "character's build",  char_name[idx], char_role[idx], char_element[idx][1]]}
    result.append(data)

# with open('../frontend/json/data.json','r+') as file:
#     data = json.load(file)
#     data['characters'] = result
#     file.seek(0)
#     json.dump(data, file, indent=4)

with open('../frontend/json/characters.json','w') as file:
    json.dump(result, file, indent=4)
