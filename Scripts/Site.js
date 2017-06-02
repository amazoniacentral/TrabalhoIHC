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
    sessionStorage.removeItem('listaCarrinho');
    sessionStorage.removeItem('listaPedido');
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


function CalcularValor(id)
{
    var total = 0;
    $(id).find("li").each(function () {
        var valor = Number($(this).attr('data-value'));
        if (!isNaN(valor)) {
            total += valor;
        }
    });
    return "R$ " + total.toFixed(2);
}

function CarregarCarrinho()
{
    var s = sessionStorage.getItem('listaCarrinho');
    var list = "<ul  class='list-group text-center'><b>Nenhum</b> produto no carrinho</ul>";
    if (s!=null) {
        list = "<ul  class='list-group'>" + s + "</ul>";
        $("#btnFinalizarPedido").html("<button onclick='$(valFinal).html(CalcularValor(listaCarrinho))' type='button' class='btn btn-success btn-lg btn-block' data-toggle='modal' data-target='#myModal'>Finalizar pedido</button>");
    }
    else {
        $("#btnFinalizarPedido").html("");
    }
    $("#listaCarrinho").html(list);
    $("#valorCarrinho").html(CalcularValor("#listaCarrinho"));
}

function CarregarPedido() {
    var s = sessionStorage.getItem('listaPedido');
    var list = "<ul  class='list-group text-center'>Você ainda <b>Não fez</b> pedido</ul>";
    if (s != null) {
        list = "<ul  class='list-group'>" + s + "</ul>";
    }
    $("#listaPedido").html(list);
    $("#valorPedido").html(CalcularValor("#listaPedido"));
    $("#listaPedido button").remove();
}

function FinalizarPedido(formaDePagamento) {
    var s = sessionStorage.getItem('listaCarrinho');
    var p = sessionStorage.getItem('listaPedido');
    if (s != null) {
        if (p != null) {
            p += s;
        }
        else {
            p = s;
        }
        sessionStorage.setItem('listaPedido', p);
        sessionStorage.setItem('forma', formaDePagamento);
        sessionStorage.removeItem('listaCarrinho');
    }
    CarregarCarrinho();
    CarregarPedido();
    getFormaPagamento();
}

function getFormaPagamento()
{
    var valor = CalcularValor("#listaPedido");
    var m = sessionStorage.getItem('forma');
    if (m!=null) {
        $("#formaPagamento").html("Forma de pagamento: <span class='text-danger'>" + m + "</span> " + valor);
    }    
}

function AdicionarProduto(produto, valor)
{
    var s = sessionStorage.getItem('listaCarrinho');
    if (s==null) {
        s = "<li data-value=" + valor + " class='list-group-item'>" + produto + "<span class='pull-right'><b>R$ " + valor + "</b> <button type='button' onclick='RemoverProduto(this)' class='btn btn-danger btn-xs'>X</button></span></li>";
    }
    else
    {
        s = s + "<li data-value=" + valor + " class='list-group-item'>" + produto + "<span class='pull-right'><b>R$ " + valor + "</b> <button type='button' onclick='RemoverProduto(this)' class='btn btn-danger btn-xs'>X</button></span></li>";
    }
    sessionStorage.setItem('listaCarrinho', s);
    CarregarCarrinho();
    $("#valorCarrinho").html(CalcularValor("#listaCarrinho"));
}

function RemoverProduto(item) {
    var index = $(item).closest('li');
    index.remove();    
    var s = "";
    $("#listaCarrinho").find("li").each(function () {
        s = $(this).closest('ul').html();
    });
    sessionStorage.setItem('listaCarrinho', s);
    $("#valorCarrinho").html(CalcularValor("#listaCarrinho"));
}