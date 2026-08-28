import re
import json

with open('鶯歌國小一年級社團互動探索樂園.html', 'r', encoding='utf-8') as f:
    html = f.read()

match = re.search(r'const clubs = (\[[\s\S]*?\]);', html)
if not match:
    print("Could not find clubs array")
    exit(1)

clubs_str = match.group(1)
# we need to be careful. The json contains unquoted keys in JS, so it's not valid JSON.
# let's just use regex to replace specific youtube IDs based on the name nearby.

def replace_youtube_id(name, new_id, text):
    # Find the block for the given name
    pattern = r"(name:\s*'" + name + r"'[\s\S]*?youtubeId:\s*)'[^']*'"
    return re.sub(pattern, r"\g<1>'" + new_id + "'", text)

clubs_str = replace_youtube_id('小小醫師社', 'eY-b19hRH_Q', clubs_str)
clubs_str = replace_youtube_id('蝶谷巴特拼豆創意手作', '5iXGeQpKDos', clubs_str)
clubs_str = replace_youtube_id('流行舞蹈表演社（基礎）', 'e04hKty1eFQ', clubs_str)
clubs_str = replace_youtube_id('初階排球', 'zXkCycV2G7A', clubs_str)
clubs_str = replace_youtube_id('流行舞蹈表演社（進階）', 'GzOafm9LC8M', clubs_str)

html = html[:match.start(1)] + clubs_str + html[match.end(1):]

with open('鶯歌國小一年級社團互動探索樂園.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Updated youtube IDs.")
