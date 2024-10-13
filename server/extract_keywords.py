import sys
import re
from keybert import KeyBERT

def main():
    content = sys.argv[1]  # Get content from command line argument
    kw_model = KeyBERT()

    # Remove numbers from the news descrption or content so that the numbers dosent get stored in mongo db
    content_no_numbers = re.sub(r'\d+', '', content)
    
    # I have Extracted keywords (only 2) per article the user reads 
    keywords = kw_model.extract_keywords(content, top_n=2,stop_words="english",use_mmr=True) 
    keyword_list = [kw[0] for kw in keywords]  # Extract just the keywords (ignore scores)
    
    print(",".join(keyword_list))

if __name__ == "__main__":
    main()
