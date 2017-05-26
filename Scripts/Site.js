function AbrirCamera()
{
    ///VERIFICAR SE JÁ ESTÁ LOGADO (SE JÁ LEU O QR CODE)
    var s = EstaLogado();
    if (s == 'sim') {
        window.location.href = "Pedido.html";
    }
    else {
        ///ABRIR A CÂMERA PARA LER O QRCODE
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(function (stream) {
            var video = document.querySelector('video');
            video.srcObject = stream;
            video.play();
        });
    }
}

function EstaLogado()
{
    ///VERIFICAR SE JÁ ESTÁ LOGADO (SE JÁ LEU O QR CODE) E RETORNA A RESPOSTA
    var s = sessionStorage.getItem('logado');
    if (s == 'sim') {
        return 'sim';
    }
    else {
        return 'não';
    }
}

function GravarLogin() {
    ///GRAVAR LEITURA DO AR CODE
    sessionStorage.setItem('logado', 'sim');
}

function Sair() {
    ///SAIR (REMOVER SESSÃO)
    sessionStorage.removeItem('logado');
    sessionStorage.removeItem('lista');
    sessionStorage.removeItem('forma');
    window.location.href = "Index.html";
}

function AcessoRestrito()
{
    var s = EstaLogado();
    if (s == 'não') {
        alert("Você deve ler o QR Code primeiro para identificar-mos a localização");
        window.location.href = "Login.html";
    }
}


function CalcularValor()
{
    var list = CarregarPedido();
    var total = 0;
    $(list).find("> li").each(function () {
        var valor = Number($(this).attr('data-value'));
        if (!isNaN(valor)) {
            total += valor;
        }
    });
    return "R$ " + total.toFixed(2);
}

function CarregarPedido()
{
    var s = sessionStorage.getItem('lista');
    if (s!=null) {
        var list = "<ul  class='list-group'>" + s + "</ul>";
        //var total = 0;
        //$(list).find("> li").each(function () {
        //    total++;
        //    $(this).setAttribute("data-id", total);
        //});
        return list;
    }
    return "<ul  class='list-group text-center'><b>Nenhum</b> produto foi encontrado</ul>";
}

function SelecionarPeido(produto, valor, idResultado, idCalcularValor)
{
    var s = sessionStorage.getItem('lista');
    if (s==null) {
        s = "<li data-value=" + valor + " class='list-group-item'>" + produto + "<span class='pull-right'><b>R$ " + valor + "</b> <button type='button' class='btn btn-danger btn-xs'>X</button></span></li>";
    }
    else
    {
        s = s + "<li data-value=" + valor + " class='list-group-item'>" + produto + "<span class='pull-right'><b>R$ " + valor + "</b> <button type='button' class='btn btn-danger btn-xs'>X</button></span></li>";
    }
    sessionStorage.setItem('lista', s);
    document.getElementById(idResultado).innerHTML = CarregarPedido();
    document.getElementById(idCalcularValor).innerHTML = CalcularValor();
}

function RemoverProduto(produto, valor)
{
    var list = CarregarPedido();
    var total = 0;
    $(list).find("> li").each(function () {
        var valor = Number($(this).attr('data-value'));
        if (!isNaN(valor)) {
            total += valor;
        }
    });
}