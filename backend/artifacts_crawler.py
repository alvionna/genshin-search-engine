import requests
import json
from bs4 import BeautifulSoup

url = "https://genshin.gg/artifacts/"
data = requests.get(url)
soup = BeautifulSoup(data.content, 'html5lib')

artifacts_name = []
artifacts_rarity = [img["src"] for img in soup.select("img.table-rarity")]
artifacts_pic = []
artifacts_two_piece= []
artifacts_four_piece= []
stats_list = []

for row in soup.find_all("div", attrs={'class': 'rt-tr-group'}): 
    artifacts_pic.append(row.find('img')['src'])

for row in soup.find_all("div", attrs={'class': 'rt-td'}): 
    if row.text != '': 
        stats_list.append(row.text)

for idx in range(0, len(stats_list), 3): 
    artifacts_name.append(stats_list[idx])
    artifacts_two_piece.append(stats_list[idx+1])
    artifacts_four_piece.append(stats_list[idx+2])

# sanity check
# print(len(artifacts_pic))
# print(len(artifacts_name))
# print(len(artifacts_two_piece))
# print(len(artifacts_four_piece))

whole_data = []
for idx in range(len(artifacts_name)): 
    data = {'id': 'artifacts', 
            'name': artifacts_name[idx], 
            'pic': artifacts_pic[idx], 
            'rarity': artifacts_rarity[idx], 
            'two_piece': artifacts_two_piece[idx], 
            'four_piece': artifacts_four_piece[idx], 
            'tags': ['artifacts', artifacts_name[idx]]
            }
    whole_data.append(data)

# with open('../frontend/json/data.json','r+') as file:
#     data = json.load(file)
#     data['artifacts'] = whole_data
#     file.seek(0)
#     json.dump(data, file, indent=4)

with open('../frontend/json/artifacts.json','w') as file:
    json.dump(whole_data, file, indent=4)
