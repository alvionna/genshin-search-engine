from flask import Flask, request, jsonify
from whoosh.qparser import MultifieldParser
from whoosh.fields import *
from whoosh.qparser import *
from whoosh import scoring
from whoosh import index
import ast

app = Flask(__name__)

@app.route('/api/search', methods=['GET'])
def search(): 
    # search_query = 'geo'
    search_query = request.args.get('query')
    # Perform search using Whoosh and get search results
    results = perform_search(search_query)
    # Return search results as JSON response
    # print(jsonify(results))
    # print(results)
    return jsonify(results)

def perform_search(search_query): 
    index_dir = "indexdir"
    ix = index.open_dir(index_dir)

    fields = ['name', 'pic', 'rarity',  'two_piece', 'four_piece', 'atk', 'drop', 'secondary', 'char_element_text', 'char_role', 'story', 'keywords']
    og = OrGroup.factory(0.8)
    parser = MultifieldParser(fields, ix.schema, group=og) 
    parser.add_plugin(FuzzyTermPlugin())

    parsed_query = parser.parse(f"{search_query}")

    search_results = []
    with ix.searcher(weighting=scoring.BM25F) as searcher:
        results = searcher.search(parsed_query, limit=None)
        id = 1
        for result in results: 
            each_result = {}
            for field_name in ix.schema.stored_names():
                each_result["id"] = id
                each_result[f"{field_name}"] = f"{result[field_name]}"
                if ((field_name == "videos" and result[field_name] != '') or (field_name == "char_weapon" and result[field_name] != '') or (field_name == "char_artifacts" and result[field_name] != '') or (field_name == "char_stats" and result[field_name] != '')): 
                    each_result[f"{field_name}"] = ast.literal_eval(f"{result[field_name]}")

            if each_result["drop"] != "": 
                each_result["type"] = "weapons"
            elif each_result["story"] != "": 
                each_result["type"] = "story"
            elif each_result["two_piece"] != "": 
                each_result["type"] = "artifacts"
            else: 
                each_result["type"] = "characters"

            search_results.append(each_result)
            id += 1
    
    return search_results


if __name__ == '__main__': 
    # with app.app_context(): 
    #     search()
    app.run(debug=True, port=8000)