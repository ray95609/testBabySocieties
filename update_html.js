const fs = require('fs');
let html = fs.readFileSync('鶯歌國小一年級社團互動探索樂園.html', 'utf8');

function replaceYoutubeId(html, clubName, newId) {
    const regex = new RegExp(`(name:\\s*'${clubName}'[\\s\\S]*?youtubeId:\\s*)'[^']*'`, 'g');
    return html.replace(regex, `$1'${newId}'`);
}

html = replaceYoutubeId(html, '小小醫師社', 'eY-b19hRH_Q');
html = replaceYoutubeId(html, '蝶谷巴特拼豆創意手作', '5iXGeQpKDos');
html = replaceYoutubeId(html, '流行舞蹈表演社（基礎）', 'e04hKty1eFQ');
html = replaceYoutubeId(html, '初階排球', 'zXkCycV2G7A');
html = replaceYoutubeId(html, '流行舞蹈表演社（進階）', 'GzOafm9LC8M');

// We also need to fix the fake images for these 4 clubs, replace with picsum or something for now so it's not a broken unsplash link
function replaceImages(html, clubName) {
    // just replacing the whole images array
    const regex = new RegExp(`(name:\\s*'${clubName}'[\\s\\S]*?images:\\s*\\[)[^\\]]*(\\])`, 'g');
    // Using simple colored placeholders that definitely work
    return html.replace(regex, `$1'https://placehold.co/800x600/FFB6C1/FFF?text=${encodeURIComponent(clubName)}1', 'https://placehold.co/800x600/87CEFA/FFF?text=${encodeURIComponent(clubName)}2', 'https://placehold.co/800x600/98FB98/FFF?text=${encodeURIComponent(clubName)}3'$2`);
}
html = replaceImages(html, '小小醫師社');
html = replaceImages(html, '蝶谷巴特拼豆創意手作');
html = replaceImages(html, '流行舞蹈表演社（基礎）');
html = replaceImages(html, '初階排球');
html = replaceImages(html, '流行舞蹈表演社（進階）');


fs.writeFileSync('鶯歌國小一年級社團互動探索樂園.html', html, 'utf8');
console.log('Done!');
