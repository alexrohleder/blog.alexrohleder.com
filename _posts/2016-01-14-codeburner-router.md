---
layout        : post
title         : Codeburner Router
date          : 2016-01-14 01:30
categories    : php
github        : https://www.github.com/codeburnerframework/router
tags          : codeburner router
image         : rsrc/codeburner-router/thumbnail.png
download      : 
comments      : true
---

Hoje vos apresento o segundo componente de um projeto pessoal que vem me deixando muito contente, o codeburner. Este projeto nasceu de meu fanatismo por performance e controle sobre a aplicação, nos tempos desta publicação nenhum framework atual me agrada no quesito desempenho, e seus inúmeros fluxos desnecessários contendo operações e mais operações me deixavam inquieto.

Obviamente me agrada toda a abstração entregue porém o custo nem sempre é justo, tentando acabar com minha insatisfação criei o codeburner! Ele inicialmente seria um microframework estilo <a href="http://www.slimframework.com">slim framework</a>, onde facilmente é possível extender e usar pacotes de terceiros, porém com muito mais abstração e performance.

Mas ai me veio a cabeça, por que criar e lançar mais um framework por ai? Isso não seria bom para a comunidade, lançar uma nova versão de algo que já existe só dividiria o público e forçaria um aprendizado maior. Então a ideia de se lançar componentes isolados que juntos podem formar um framework, assim como é feito com o <a href="https://symfony.com">symfony</a> surgiu.

O componente que hoje entra em debate é o <a href="https://www.github.com/codeburnerframework/router">Codeburner Router</a>, ele nasceu após a leitura de um <a href="http://nikic.github.io/2014/02/18/Fast-request-routing-using-regular-expressions.html">interessantíssimo artigo</a> do nikic.

Bem o componente Router nasceu após a leitura do <a href="http://nikic.github.io/2014/02/18/Fast-request-routing-using-regular-expressions.html">interessantíssimo artigo</a> do nikic, um dos core dev do php, que trata exatamente de um componente deste tipo lançado por ele, lá ele descreve uma forma bem inteligente de reduzir o tempo de execução de um sistema de rotas.

O sistema do nikic o nomeado FastRoute foi adotado pela comunidade e hoje frameworks famosos como Laravel e Slim o utilizam. FastRoute é extremamente rápido não há como negar, porém não existe forma de conseguir ser mais rápido? Existe e já esta em desenvolvimento!

Codeburner Router consegue ser até 80% mais rápido que o FastRoute de nikic em alguns casos, porém tem uma média de "apenas" 70% de ganho de performance! E entregando uma abstração e funcionalidade que bate com frameworks grandes como <a href="laravel.com">Laravel</a>, e confesso que, roubando ideias do <a href="guides.rubyonrails.org/routing.html">ruby on rails</a> :p. Como prova gostaria de mostrar alguns testes com um php <a href="https://blackfire.io">profiler chamado blackfire</a>, pretendo no futuro fazer posts sobre ele :).

As comparações a seguir foram feitas com a versão atual até o momento de escrita do FastRoute, a 0.7. O codeburner Router foi comparado com duas versões, a v1 que continha a primeira tentativa de otimização e a v2 que aperfeiçoando o desempenho entrega uma abstração maior além de uma sintaxe simples, limpa e intuitiva. Os 3 pacotes foram carregados pelo autoload do composer.

<img src="/rsrc/codeburner-router/1s-profile.jpg">

O primeiro é o tempo do <a href="https://github.com/nikic/FastRoute">FastRoute</a>, o segundo do <a href="https://www.github.com/codeburnerframework/router">Codeburner Router</a> v1 e o terceiro da v2 que ainda se encontra em beta. Todos usaram uma única rota para `/` com uma closure dando `echo 'hello world';`. Vale ressaltar que pelo Codeburner tratar a execução de rotas através de estratégias que podem variar de rota para rota, houve a necessidade de uma chamada a mais ao autoload na hora de execução, exatamente para o carregamento da classe de definição da estratégia o que reduziu em cerca de 20% o desempenho total.

O primeiro parâmetro apresentado pelo profiler é o tempo de relógio, ou seja o tempo total de execução. O segundo representa o tempo gasto com operações de I/O ou seja carregando arquivos do disco, o terceiro diz respeito ao tempo de processamento e o quarto ao uso de memória.

Como pode se notar o Codeburner evita a chamada do autoload já que este é custoso em tempo e processamento, também é possível notar que o consumo de memória usado na v1 já superava mesmo que pouco o do <a href="https://github.com/nikic/FastRoute">FastRoute</a>, porém na v2 este valor teve um aumento significativo comparado aos valores anteriores, isso se da principalmente ao fato de todas as rotas serem objetos e qualquer registro de rota retorna uma coleção de rotas agregando funções de manipulação de rotas individuais e aplicando a coleção inteira, resumindo... Muitos objetos!

Isto foi apenas um teste da implementação parcial da v2 do <a href="https://www.github.com/codeburnerframework/router">Codeburner Router</a>, com a evolução do código pretendo desenvolver avaliações mais especificas e explanar mais sobre o funcionamento interno, profiles e é claro, performance!
