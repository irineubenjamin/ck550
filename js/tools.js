// Localizador 
$.get("https://ipinfo.io/json", function (response) {
  $("#address").html(response.region);
}, "jsonp");

// Função para obter a data atual no formato desejado (ex: 30/12/2023)
function obterDataAtual() {
  const dataAtual = new Date();
  const dia = dataAtual.getDate();
  const mes = dataAtual.getMonth() + 1;
  const ano = dataAtual.getFullYear();
  return `${dia}/${mes}/${ano}`;
}

// Função para exibir a data de escassez nas frases
function exibirDataEscassez() {
  const dataDiaElements = document.querySelectorAll(".data-dia");
  const dataAtual = obterDataAtual();

  dataDiaElements.forEach(element => {
    element.textContent = dataAtual;
  });
}

// Chama a função para exibir a data de escassez ao carregar a página
exibirDataEscassez();

// Função para mostrar o próximo mês em cada elemento com a classe "month"
function showNextMonth() {
  var d = new Date();
  var nextMonth = new Date(d.getFullYear(), d.getMonth() + 1);
  var monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  var nextMonthName = monthNames[nextMonth.getMonth()];

  var monthElements = document.querySelectorAll(".month");
  monthElements.forEach(function (element) {
    element.innerHTML = " " + nextMonthName;
  });
}

// Chama a função para mostrar o próximo mês ao carregar a página
showNextMonth();


// PlaceHolder OFF
function esconderPlaceholder() {
  var inputBusca = document.getElementById("input-busca");
  inputBusca.setAttribute("placeholder", "");
}

// Contador
// Função para gerar um número aleatório e exibir na página
function mostrarNumeroAleatorio() {
  // Número máximo que você deseja exibir
  const numeroMaximo = 25;

  // Gera um número aleatório entre 1 e o número máximo
  const numeroAleatorio = Math.floor(Math.random() * numeroMaximo) + 1;

  // Atualiza o conteúdo da tag com o número gerado
  const numeroSpan = document.getElementById("randomNumber");
  numeroSpan.textContent = numeroAleatorio;
}

// Chama a função quando a página é carregada ou atualizada
window.addEventListener("load", mostrarNumeroAleatorio);

//* Carregar comentários FB
function loadMore() {
  $('#more').show()
  $('.fb-comments-loadmore').hide().remove()
}
$(document).ready(function () {
  $('date').each(function () {
    if ($(this).attr('data-date-minus')) {
      $(this).html(dateMinus($(this).attr('data-date-minus')))
    }
  })
})

function dateMinus(what) {
  var today = Date.now()
  var nw = today - what * 10000
  var newd = new Date()
  newd.setTime(nw)
  var mthName = ['Janeiro', 'Fevereiro', 'MarÃƒÂ§o', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
  var mthNm = mthName[newd.getMonth()]
  return (newd.getDate()
    + ' de '
    + mthNm
    + ' de '
    + newd.getFullYear()
    + ' '
    + newd.getHours()
    + ':'
    + round(newd.getMinutes()))
}

function round(what) {
  if (what < 10) {
    return '0' + what
  } else {
    return what
  }
}
$('like').on('click', function () {
  if ($(this).hasClass('liked')) {
    $(this).parents('.fb-comments-wrapper, .fb-comments-reply-wrapper').find('likes').text(parseInt($(this).parents('.fb-comments-wrapper, .fb-comments-reply-wrapper').find('likes').text()) - 1)
    $(this).removeClass('liked')
    $(this).text('Curtir')
  } else {
    $(this).parents('.fb-comments-wrapper, .fb-comments-reply-wrapper').find('likes').text(parseInt($(this).parents('.fb-comments-wrapper, .fb-comments-reply-wrapper').find('likes').text()) + 1)
    $(this).addClass('liked')
    $(this).text('Descurtir')
  }
})
$('reply').on('click', function () {
  if (fbobj != null) {
    handleReply($(this).parents('.fb-comments-wrapper, .fb-comments-reply-wrapper').attr('id'))
  } else {
    logInWithFacebook(handleReply, $(this).parents('.fb-comments-wrapper, .fb-comments-reply-wrapper').attr('id'))
  }
})

function handleReply(id) {
  var text = ''
  var obj = $('#' + id)
  if (obj.hasClass('fb-comments-reply-wrapper')) {
    text = '@' + obj.find('name').text()
    obj = $('#' + id.split('-')[0])
  }
  obj.find('.row.reply-box').remove()
  obj.append('<div class="row reply-box" id="reply-'
    + obj.attr('id')
    + '"><div class="col-xs-10"><input type="text" value="'
    + text
    + '" placeholder="AÃƒÂ±ade una respuesta..." class="fb-reply-input" /></div><div class="col-xs-2"><button class="fb-reply-button" onclick="javascript:postReply('
    + obj.attr('id')
    + ');">Responder</button></div></div>')
}

function postReply(id) {
  var obj = $('#reply-' + id)
  if (obj && obj.find('.fb-reply-input').val()) {
    var date = new Date()
    var fbreply = {
      forid: id,
      date: date,
      text: obj.find('.fb-reply-input').val()
    }
    fbreplies.push(fbreply)
    var replyc = reply.clone()
    replyc.attr('id', id + '-' + Math.floor(Math.random() * 100 + 10))
    replyc.find('name').text(fbobj.name)
    replyc.find('.fb-comments-comment-img').find('img').attr('src', fbobj.pictureURL)
    replyc.find('.fb-comments-comment-text').text(obj.find('.fb-reply-input').val())
    replyc.find('date').each(function () {
      if ($(this).attr('data-date-minus')) {
        $(this).html(dateMinus($(this).attr('data-date-minus')))
      }
    })
    $('#' + id).after(replyc)
    obj.remove()
    var today = new Date()
    today.setDate(today.getFullYear() + 1)
    setCookie('fbreplies', JSON.stringify(fbreplies), today)
  }
}

// Função para mostrar a promotarja quando o usuário rolar a página até uma determinada quantidade de scroll
function showPromotarja() {
  const promotarja = document.getElementById('promotarja');
  const desktopTriggerScrollAmount = 12750; // Defina a quantidade de scroll que irá acionar a promotarja no desktop
  const mobileTriggerScrollAmount = 17300; // Defina a quantidade de scroll que irá acionar a promotarja no mobile

  // Função para verificar a largura da tela e determinar o ponto de acionamento correto
  function checkScrollAmount() {
    const triggerScrollAmount = window.innerWidth >= 700 ? desktopTriggerScrollAmount : mobileTriggerScrollAmount;

    if (window.pageYOffset >= triggerScrollAmount) {
      promotarja.style.display = 'block';
    } else {
      promotarja.style.display = 'none';
    }
  }

  window.addEventListener('scroll', checkScrollAmount);
  window.addEventListener('resize', checkScrollAmount);

  // Mostra a promotarja ao carregar a página, caso a rolagem já esteja além do ponto de acionamento
  checkScrollAmount();

  // Mantém a promotarja fixa durante toda a rolagem do site
  window.addEventListener('scroll', () => {
    promotarja.style.position = 'fixed';
    promotarja.style.bottom = '0';
  });
}

// Chama a função para mostrar a promotarja quando a página carregar
showPromotarja();

// Chama a função para mostrar a promotarja quando a página carregar
showPromotarja();

// Contador 
// Defina o tempo desejado em minutos
var tempoMinutos = 15;

// Calcula a data final com base no tempo desejado
var dataFinal = new Date();
dataFinal.setMinutes(dataFinal.getMinutes() + tempoMinutos);

// Função para atualizar o contador regressivo
function atualizarContador() {
  var agora = new Date().getTime();
  var diferenca = dataFinal - agora;

  // Verifica se o tempo acabou
  if (diferenca < 0) {
    // Se o tempo acabou, reinicia o contador
    dataFinal = new Date();
    dataFinal.setMinutes(dataFinal.getMinutes() + tempoMinutos);
    diferenca = dataFinal - agora;
  }

  // Calcula horas, minutos e segundos restantes
  var horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
  var segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

  // Formata os valores para duas casas decimais (por exemplo, 01, 02, 10)
  horas = horas.toString().padStart(2, "0");
  minutos = minutos.toString().padStart(2, "0");
  segundos = segundos.toString().padStart(2, "0");

  // Atualiza o elemento HTML com o contador regressivo
  document.getElementById("contador").textContent = horas + ":" + minutos + ":" + segundos;
}

// Chama a função inicialmente para iniciar o contador
atualizarContador();

// Atualiza o contador a cada segundo
var contadorInterval = setInterval(atualizarContador, 1000);

// DATAS

// Função para calcular a data 3 dias atrás
function calcularDataAtras() {
  // Obtém a data atual
  var dataAtual = new Date();

  // Subtrai 3 dias da data atual
  dataAtual.setDate(dataAtual.getDate() - 3);

  // Formata a data no formato desejado (DD/MM/AAAA)
  var dia = dataAtual.getDate().toString().padStart(2, '0');
  var mes = (dataAtual.getMonth() + 1).toString().padStart(2, '0');
  var ano = dataAtual.getFullYear();

  // Exibe a data na página
  document.getElementById("dataAtras").textContent = dia + '/' + mes + '/' + ano;
}

// Chama a função para calcular e exibir a data 3 dias atrás
calcularDataAtras();

// Função para obter a data atual no formato desejado (ex: 30/12/2023)
function obterDataAtual() {
  const dataAtual = new Date();
  const dia = dataAtual.getDate();
  const mes = dataAtual.getMonth() + 1;
  const ano = dataAtual.getFullYear();
  return `${dia}/${mes}/${ano}`;
}

// Função para exibir a data de escassez nas frases
function exibirDataEscassez() {
  const dataDiaElements = document.querySelectorAll(".data-dia");
  const dataAtual = obterDataAtual();

  dataDiaElements.forEach(element => {
    element.textContent = dataAtual;
  });
}

// Chama a função para exibir a data de escassez ao carregar a página
exibirDataEscassez();
