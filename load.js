var baseUrl = 'http://127.0.0.1:3000/lanfin';
const methods = ['Receita','Despesa'];

function loadLanfin (){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', baseUrl, true);
    xmlhttp.onreadystatechange = function(){
        if(xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var lanfin = JSON.parse(xmlhttp.responseText);
            var tbltop = `<table>
                            <tr><th>ID</th><th>Valor</th><th>Método</th><th>Conta</th><th>Categoria</th>`;
            var main = '';
            for(i = 0; i < lanfin.length ; i++){
                main += '<tr><td>' +lanfin[i].IDLANFIN+'</td><td>'+parseFloat(lanfin[i].VALUE).toFixed(2)+'</td><td>'+methods[lanfin[i].METHOD]+'</td><td>'+lanfin[i].ACCOUNTID+'</td><td>'+lanfin[i].CATEGORY+'</td></tr>';
            }
            var tblbottom = '</table>'
            var tbl = tbltop + main + tblbottom;
            document.getElementById('lanfinInfo').innerHTML = tbl;
        }
    };
    xmlhttp.send();
}
window.onload = function(){
    loadLanfin();
}
