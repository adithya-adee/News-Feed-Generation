import sys
import json
from keybert import KeyBERT

def extract_keywords(text):
    kw_model = KeyBERT()
    keywords = kw_model.extract_keywords(text, top_n=5)
    return [kw[0] for kw in keywords]

if __name__ == "__main__":
    input_text = sys.argv[1]
    keywords = extract_keywords(input_text)
    print(json.dumps(keywords))
