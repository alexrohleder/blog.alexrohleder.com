---
layout            : post
title             : Singleline Form
date              : 2016-01-09 00:11:01
categories        : javascript html css sass
tags              : javascript html css sass
image             : /content/2016/singleline-form/thumbnail.jpg
preview           : /content/2016/singleline-form/index.html
download          : /content/2016/singleline-form/singleline-form.zip
comments          : true
excerpt_separator : <!-- more -->
---

Hoje gostaria de compartilhar o formulário que utilizo na <a href="https://www.alexrohleder.com.br">homepage do meu site</a>, é uma adaptação do post <a href="http://tympanus.net/codrops/2014/04/01/minimal-form-interface/">minimal form interface</a> do <a href="http://tympanus.net/codrops">codrops</a>. Um formulário extremamente simples que mostra apenas um campo por vêz que em sua versão disponibilizada pelo codrops requer a utilização da biblioteca deles, com um javascript e css grandes<strike>(e charopes de adaptar)</strike> perante a real necessidade. Por isto acabei por fazer esta versão com um código mais simples e com versões em <b>SASS</b> e utilizando <b>jQuery</b>!
<!-- more -->
A ideia do formulário é ser simples não ocupando espaço e utilizando apenas os elementos necessários, sem nenhuma distração! A marcação dele segue o mesmo princípio, simplicidade.

{% highlight html %}
<form novalidate autocomplete="off" class="ar-form">
    <ol class="questions">
        <!-- lista de questões, note que só a primeira tem a class current -->
        <li class="question current">
            <!-- também é possível incluir labels -->
            <!-- <label for="name">Qual seu nome?</label> -->
            <input type="text" id="name" placeholder="Qual o seu nome?" required>
        </li>
    </ol>
    <div class="next"><div class="arrow"></div></div>
    <div class="progress"><div class="progress-bar"></div></div>
    <div class="error"></div>
    <div class="count"><span class="itr">1</span>/<span class="total">1</span></div>
</form>
{% endhighlight %}

Para inicializar o formulário basta utilizar o plugin do jQuery no formulário, o plugin recebe como argumento um json que pode conter as funções de <b>submit</b>, <b>error</b> e <b>validate</b>. As funções <b>error</b> e <b>validate</b> já possuem uma definição padrão que utiliza apis do navegador para fazer seu trabalho, já a <b>submit</b> deve ser implementada pelo usuário, ela executa a lógica após o submit do formulário.

{% highlight js %}
$('form').form({
    submit: function () {
        // lógica pós submit do formulário.
        // ex. envio via ajax para o servidor.
    }
})
{% endhighlight %}

Eu em meu site utilizei este formulário para enviar um e-mail do usuário para min, tudo através do javascript! Para isto criei uma conta no <a href="https://mandrillapp.com/">mandrill app</a>, e peguei minha <b>API key</b>. Após isso você pode utilizar sua key para **enviar 2000 emails por mês gratuítamente**! Segue o javascript utilizado para tanto, basta alterar as partes indicadas:

{% highlight js %}
$('form').form({
    submit: function () {
        
        /**
         * Passando os dados do formulário, que no caso contem
         * três campos para a função que envia o e-mail
         */
        
        sendEmailWithMandril({
            name    : $('#name').val(),
            email   : $('#email').val(),
            message : $('#message').val()
        });

        /**
         * Após o envio do e-mail o formulário é ocultado
         * e uma mensagem de sucesso é exibida.
         */

        $('form').fadeOut({
            complete: function () {
                $('h3').html('OBRIGADO! LOGO ENTRAREI EM CONTATO :)').fadeIn();
            }
        });

        /**
         * O email pode ser escrito diretamente em html, usando os
         * dados do formulário.
         */

        function sendEmailWithMandril(data) {
            $.post('https://mandrillapp.com/api/1.0/messages/send.json', {
                key: 'your_mandrilapp_key',
                message: {
                    autotext: 'true',
                    subject: data.name + ' got in touch',
                    from_email: data.email,
                    html: 
                        '<p>' + data.name + ' ' +
                        '<b>' + data.email + '</b></p>' + 
                        '<p>' + data.message + '</p>',
                    to: [{
                        email: 'your_email@mail.com',
                        name : 'your_name',
                        type : 'to'
                    }]
                }
            })
        }
    }
});
{% endhighlight %}

Para mais informações e configurações de email do mandrill acesse a documentação <a href="https://mandrillapp.com/api/docs/messages.JSON.html#method-send">neste link</a>. Bom era isto, espero que tenha lhe inspirado e ajudado, serei muito grato por qualquer sugestão e atenderei a qualquer dúvida sobre o post com prazer!
