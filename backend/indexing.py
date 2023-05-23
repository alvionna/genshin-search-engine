import os
import json 

import whoosh.index as index
from whoosh.qparser import *
from whoosh.fields import Schema, TEXT, KEYWORD, NUMERIC
from whoosh.analysis import StandardAnalyzer
from whoosh.fields import *
from whoosh import scoring


schema = Schema(
            name=TEXT(analyzer=StandardAnalyzer(),stored=True), 
            pic=TEXT(stored=True),
            rarity=TEXT(stored=True),
            two_piece=TEXT(analyzer=StandardAnalyzer(), stored=True),
            four_piece=TEXT(analyzer=StandardAnalyzer(), stored=True),
            type_img=TEXT(stored=True),
            atk=NUMERIC(stored=True),
            secondary=TEXT(analyzer=StandardAnalyzer(), stored=True),
            drop=TEXT(stored=True),
            char_element_icon= TEXT(stored=True),
            char_element_text= TEXT(analyzer=StandardAnalyzer(), stored=True),
            char_role= TEXT(analyzer=StandardAnalyzer(), stored=True),
            char_weapon= KEYWORD(stored=True), 
            char_artifacts= KEYWORD(stored=True),
            char_stats= KEYWORD(stored=True),
            story = TEXT(analyzer=StandardAnalyzer(), stored=True), 
            videos = TEXT(stored=True),
            keywords=KEYWORD(commas=True, field_boost=3.0, scorable=True) # to use the keyword field for searching -> scorable = True, and keywords are separated by commas 
        )  

# Create the index directory
index_dir = "indexdir"
if not os.path.exists(index_dir):
    os.mkdir(index_dir)
ix = index.create_in(index_dir, schema)

ix = index.open_dir("indexdir")
#create a writer object to add documents to the index
writer = ix.writer()
json_files = ['../frontend/json/artifacts.json', '../frontend/json/weapons.json', '../frontend/json/story.json', '../frontend/json/characters.json'] 
for json_file in json_files: 
    with open(json_file) as f:
        data = json.load(f)

        for obj in data:
            if json_file == '../frontend/json/characters.json':
                main_pic = obj["char_pic"]
            elif json_file == '../frontend/json/artifacts.json': 
                main_pic = obj["pic"]
            elif json_file == '../frontend/json/weapons.json': 
                main_pic = obj["weapon_pic"]
            else: 
                main_pic = ''

            writer.add_document(
                name=obj["name"],
                pic=main_pic,
                rarity=obj.get("rarity", ''),
                two_piece=obj.get("two_piece", ""),
                four_piece=obj.get("four_piece", ""),
                type_img=obj.get("type_img", ""),
                atk=int(float(obj.get("atk", 0))),
                secondary=obj.get("secondary", ""),
                drop=obj.get("drop", ""),
                char_element_icon= obj.get("char_element_icon", ""),
                char_element_text= obj.get("char_element_text", ""),
                char_role= obj.get("char_role",""),
                char_weapon= str(obj.get("char_weapon", "")), 
                char_artifacts= str(obj.get("char_artifacts", "")), 
                char_stats= str(obj.get("char_stats", "")),
                story = obj.get("story", ""), 
                videos = obj.get("videos", ""),
                keywords= ", ".join(obj.get("tags", []))
            )

writer.commit()

