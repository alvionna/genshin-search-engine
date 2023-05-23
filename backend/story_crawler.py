import requests
import json
from bs4 import BeautifulSoup

url = "https://ag.hyperxgaming.com/article/11923/genshin-impact-the-story-so-far"
data = requests.get(url)
soup = BeautifulSoup(data.content, 'html5lib')

result = []
video_list = []
for video in soup.find_all('iframe'): 
    video_list.append(video['src'])

idx = 0
for heading in soup.find_all('h2'): 
    values = []
    for sibling in heading.find_next_siblings():
        if sibling.name == "h2":  # iterate through siblings until separator is encoutnered
            break

        if sibling.text != '' and '\n' not in sibling.text: 
            values.append(sibling.text)
    out = {'id': 'story', 
           'name': heading.text, 
           'story': " ".join(values), 
           'videos': video_list[idx:idx+2], #change it to video1 and video2
           'tags': ["story"]}
    idx += 2
    result.append(out)

# with open('../frontend/json/data.json','r+') as file:
#     data = json.load(file)
#     data['story'] = result
#     file.seek(0)
#     json.dump(data, file, indent=4)

with open('../frontend/json/story.json','w') as file:
    json.dump(result, file, indent=4)