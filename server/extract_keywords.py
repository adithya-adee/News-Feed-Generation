import sys
import re
from keybert import KeyBERT

def main():
    content = sys.argv[1]  # Get content from command line argument
    kw_model = KeyBERT()

    # Remove numbers from the content
    content_no_numbers = re.sub(r'\d+', '', content)
    
    # Extract keywords
    keywords = kw_model.extract_keywords(content, top_n=2) 
    keyword_list = [kw[0] for kw in keywords]  # Extract just the keywords (ignore scores)
    
    # Return keywords as a comma-separated string
    print(",".join(keyword_list))

if __name__ == "__main__":
    main()
