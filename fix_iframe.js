const fs = require('fs');
let html = fs.readFileSync('鶯歌國小一年級社團互動探索樂園.html', 'utf8');

html = html.replace(/src="https:\/\/www\.youtube-nocookie\.com\/embed\/\$\{ytId\}\?autoplay=1&rel=0&modestbranding=1"/g, 
  'src="https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0&modestbranding=1" referrerpolicy="strict-origin-when-cross-origin"');

fs.writeFileSync('鶯歌國小一年級社團互動探索樂園.html', html, 'utf8');
fs.writeFileSync('index.html', html, 'utf8');
console.log('Fixed iframe url');
