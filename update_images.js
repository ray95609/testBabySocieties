const fs = require('fs');
let html = fs.readFileSync('鶯歌國小一年級社團互動探索樂園.html', 'utf8');

function replaceImages(html, clubName, img1, img2) {
    const regex = new RegExp(`(name:\\s*'${clubName}'[\\s\\S]*?images:\\s*\\[)[^\\]]*(\\])`, 'g');
    return html.replace(regex, `$1'${img1}', '${img2}'$2`);
}

const doc1 = 'https://upload.wikimedia.org/wikipedia/commons/4/43/Female_doctor_giving_small_child_apple_closeup.jpg';
const doc2 = 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Doctor_examining_child%2C_Seattle%2C_circa_1970s_%2820851540008%29.jpg';
html = replaceImages(html, '小小醫師社', doc1, doc2);

const craft1 = 'https://upload.wikimedia.org/wikipedia/commons/e/e2/Crafts_for_kids_%285002405%29.jpg';
const craft2 = 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Kids_birthday_backdrop.jpg';
html = replaceImages(html, '蝶谷巴特拼豆創意手作', craft1, craft2);

const volley1 = 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Children_playing_volleyball.jpg';
const volley2 = 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Children_play_volleyball.jpg';
html = replaceImages(html, '初階排球', volley1, volley2);

const dance1 = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Hip_Hop_Dance.jpg/800px-Hip_Hop_Dance.jpg';
const dance2 = 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Two_dancers.jpg/800px-Two_dancers.jpg';
html = replaceImages(html, '流行舞蹈表演社（基礎）', dance1, dance2);
html = replaceImages(html, '流行舞蹈表演社（進階）', dance1, dance2);

fs.writeFileSync('鶯歌國小一年級社團互動探索樂園.html', html, 'utf8');
fs.writeFileSync('index.html', html, 'utf8');
console.log('Done!');
