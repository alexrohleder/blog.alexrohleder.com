---
layout        : post
title         : Codeburner Router
date          : 2016-01-14 01:30
categories    : php
github        : https://www.github.com/codeburnerframework/router
tags          : codeburner router
image         : rsrc/codeburner-router/thumbnail.png
comments      : true
---

Hoje vos apresento o segundo componente de um projeto pessoal que vem me deixando muito contente, o codeburner nasceu de meu fanatismo por performance. Não gosto do desempenho entregue por frameworks atuais, que executam muitas operações e passam por muitos caminhos que geralmente não são necessários, obviamente me agrada toda a abstração entregue porem o custo nem sempre é justo, pensando nisso criei o codeburner!

Codeburner inicialmente seria um microframework estilo <a href="http://www.slimframework.com/">slim</a>, onde é possível facilmente extender e usar pacotes de terceiros, porém com muito mais abstração e maior performance. Mas por que lançar um framework inteiro novo? Não seria mais agradável aos olhos da comunidade um conjunto de pacotes bem pensados e programados? Então a ideia de se lançar componentes isolados estilo <a href="https://symfony.com/">symfony</a> surgiu.

Bem o componente Router nasceu após a leitura do <a href="http://nikic.github.io/2014/02/18/Fast-request-routing-using-regular-expressions.html">interessantíssimo artigo</a> do nikic, um dos core dev do php, que trata exatamente de um componente deste tipo lançado por ele, lá ele descreve uma forma bem inteligente de reduzir o tempo de execução de um sistema de rotas.

O sistema do nikic o nomeado FastRoute foi adotado pela comunidade e hoje frameworks famosos como Laravel e Slim o utilizam. FastRoute é extremamente rápido não há como negar, porém não existe forma de conseguir ser mais rápido? Existe e já esta em desenvolvimento!

Codeburner Router consegue ser até 80% mais rápido que o FastRoute de nikic em alguns casos, porém tem uma média de "apenas" 70% de ganho de performance! E entregando uma abstração e funcionalidade que bate com frameworks grandes como Laravel, e confesso que, roubando ideis do ruby on rails :p.
