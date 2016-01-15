---
layout            : post
title             : Singleline Form
date              : 2016-01-09 00:11:01
categories        : javascript html css sass
tags              : form minimalist simple jquery
image             : rsrc/singleline-form/thumbnail.jpg
preview           : rsrc/singleline-form/index.html
download          : rsrc/singleline-form/singleline-form.zip
comments          : true
---

Recebi alguns feedbacks positivos sobre o formulário do <a href="https://www.alexrohleder.com.br">meu site pessoal</a>, e hoje como o primeiro post do blog gostaria de compartilhar esta adaptação do <a href="http://tympanus.net/codrops/2014/04/01/minimal-form-interface/">minimal form interface</a> produzido pelo <a href="http://tympanus.net/codrops">codrops</a>. A ideia principal é que o formulário seja extremamente simples e livre de distrações, ele se encaixa muito bem com várias interfaces exibindo apenas um campo de cada vez!

A versão disponibilizada pelo codrops requer a utilização de uma micro biblioteca produzida pelo mesmo, o que me deixou encomodado confesso, e seu código fonte não era tão simples de ser refatorado para seguir as condições do meu site. Por isto optei por desenvolver uma nova versão com vários hooks para facilitar a extenção e aproveitei para simplificar o código utilizando jQuery. Há e além do CSS agora tem SASS!

A baixo um exemplo de marcação do formulário, nada de muito complicado porém note os atributos da tag form, novalidate diz ao navegador que o plugin ira lidar com as validações do formulário, e ele faz isso por padrão usando o navegador hehe, então qualquer atributo de validação nos campos será identificado, no exemplo a baixo o atributo required foi usado.

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
    <!-- Marcação necessária para os controles do formulário, mantenha a mesma ordem! -->
    <div class="next"><div class="arrow"></div></div>
    <div class="progress"><div class="progress-bar"></div></div>
    <div class="error"></div>
    <div class="count"><span class="itr">1</span>/<span class="total">1</span></div>
</form>
{% endhighlight %}

Depois disto é necessário inicializar o formulário definindo uma função de submit para ele. O plugin também suporta a definição de funções de erro e validação, que respectivamente retornam uma string e um boolean, e são auto explicativas. Elas já possuem uma definição padrão que assim como dito utiliza a API do navegador do usuário para validar e gerar uma mensagem de erro.

{% highlight js %}
$('form').form({
    submit: function () {
        // lógica pós submit do formulário.
    },

    // Os parametros a seguir são opcionais.
    // E ambos recebem um campo como argumento.

    validate: function (e) {
        // valida um campo
    },
    error: function (e) {
        // gera uma mensagem de erro de validação
    }
})
{% endhighlight %}

Em <a href="https://www.alexrohleder.com.br">meu site pessoal</a> utilizo o formulário como uma forma de contato direto, onde quando submetido um e-mail é enviado para min contendo os dados dos campos. Para tanto utilizei o <a href="https://mandrillapp.com">Mandrill App</a> um ótimo serviço de envio de e-mails gratuitos com uma API em javascript! Segue o script que utilizei para o envio, você irá precisar de uma API Key do mandrill, para conseguila basta criar uma conta e gerar uma nova API Key. Apenas altere as partes indicadas com seus dados:

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
                key: 'your_mandrill_key',
                message: {
                    autotext: 'true',
                    subject: data.name + ', através do formulário de contato',
                    from_email: data.email,
                    html: data.message,
                    to: [{
                        email: 'your@mail.com',
                        name : 'your_name',
                        type : 'to'
                    }]
                }
            })
        }
    }
});
{% endhighlight %}

Para mais informações e configurações de email do mandrill acesse a documentação <a href="https://mandrillapp.com/api/docs/messages.JSON.html#method-send">neste link</a>. Bom era isto, espero que tenha lhe inspirado e ajudado, serei muito grato por qualquer sugestão e atenderei a qualquer dúvida sobre o post nos comentários!
