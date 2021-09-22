(function ($) {
    function csv_data(dataPath) {
        const request = new XMLHttpRequest(); // HTTPでファイルを読み込む
        request.addEventListener('load', (event) => { // ロードさせ実行
            const response = event.target.response; // 受け取ったテキストを返す
            const lines = response.split('\n'); // 改行で区切る
            const data = lines.map((line) => line.split(',')); // 各行をカンマで区切る
            const headers = data[0]; // 先頭行をヘッダーとして抽出
            const rows = data.slice(1); // 先頭行を除いた全行を行として抽出

            create_headers(headers);
            create_rows(rows);
        });
        request.open('GET', dataPath, true); // csvのパスを指定
        request.setRequestHeader('Pragma', 'no-cache');
        request.setRequestHeader('Cache-Control', 'no-cache');
        request.setRequestHeader('If-Modified-Since', 'Thu, 01 Jun 1970 00:00:00 GMT');
        request.send();
    }
    csv_data('../assets/stock.csv'); // csvのパス relative in terms of stocklist.html path

})(window.jQuery);

const create_rows = (row_data) => {
    const tbody = document.querySelector('#stock-table tbody');
    row_data.forEach((row) => {
        const tr = document.createElement('tr');
        row.forEach((data) => {
            const td = document.createElement('td');
            td.innerText = data;
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
}
const create_headers = (header_data) => {
    const thead = document.querySelector('#stock-table thead');
    const tr = document.createElement('tr');
    header_data.forEach((header) => {
        const th = document.createElement('th');
        th.innerText = header;
        tr.appendChild(th);
    });
    thead.appendChild(tr);
}