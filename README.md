# 30 sites — São Luís

Sites estáticos independentes, com conteúdo editável, catálogo, carrossel, localização e contato por WhatsApp. O painel da coleção fica em `index.html`.

## Rodar e editar

Necessário: Node.js 20 ou mais recente. Nenhuma dependência paga ou instalação de pacotes é necessária.

```sh
npm run build
npm test
npm run dev
```

Abra `http://127.0.0.1:4173`. Cada empresa tem um arquivo em `content/` e uma pasta pronta para hospedagem em `sites/`.

1. Edite o JSON da empresa em `content/`: telefone, descrição, horários, catálogo, preços e imagens.
2. Execute `npm run build` e `npm test`.
3. Envie as alterações ao GitHub. A integração de hospedagem pode republicar o mesmo projeto.

Também é possível construir só um site:

```sh
npm run build -- --site 30-fenix-lanches
```

`src/site.css` e `src/site.js` são compartilhados na origem e copiados para cada pasta publicada. Os sites publicados não dependem de outro site da coleção.

## Catálogos e contato

- Todos os botões de agendamento, pedido e orçamento levam ao WhatsApp da própria empresa.
- O visitante pode selecionar itens/serviços, indicar preferência de data nas barbearias e incluir observações. O envio abre uma conversa no WhatsApp com a seleção; não envia uma mensagem automaticamente.
- Nenhum pedido, pagamento ou agendamento é confirmado no site. A empresa confirma disponibilidade e valores na conversa.
- `catalog[].price` aceita um número em reais ou `null`. Os valores não confirmados aparecem como **Consultar valor**. Não há total de compra porque não há preço vigente confirmado para todos os itens.
- O catálogo inclui apenas opções identificadas na pesquisa; não representa necessariamente o cardápio completo e atual de cada empresa.
- O carrossel usa imagens selecionadas do perfil. Onde faltam imagens adequadas, utiliza a identidade da marca e uma composição de texto, sem inventar fotos de produtos.

## Publicar na Cloudflare Pages

Para cada empresa, conecte **este mesmo repositório** a um projeto Pages distinto:

- Branch: `main`
- Comando de build: `npm run build -- --site SLUG`
- Diretório de saída: `sites/SLUG`
- `SLUG` é o nome exato da pasta em `sites/` ou do campo `slug` no JSON.

O site completo também pode ser enviado por Direct Upload usando apenas sua pasta `sites/SLUG`. O painel completo pode ser hospedado separadamente na raiz.

O arquivo `catalog.json` mapeia IDs, nomes e pastas. As URLs efetivamente publicadas devem ser registradas em `deployments.json`; não assumir uma URL antes do retorno da Cloudflare.

## Revisão de conteúdo

São **propostas demonstrativas para apresentação**; não se apresentam como sites oficiais autorizados. `preview: true` mantém o aviso de prévia e impede indexação. Após validação pelo responsável, altere para `false` e reconstrua.

Dados e imagens foram pesquisados nos canais públicos em 13/10/2026. Confirme contatos, horários, serviços, cardápio e uso das imagens com a empresa antes de adotar o site como oficial. Sem avaliações, depoimentos, estatísticas ou preços inventados.

`research/empresas.json` registra fontes e divergências. `media/sources.json` registra a origem dos arquivos. A pesquisa detalhada está em `research/Conteudo_pesquisado.md`.

Pontos de atenção:

- Boleiragem e Rei do Corte: telefone da bio difere do Maps; os sites usam o da bio.
- Express: a bio completa informa **(98) 98468-9832**. O site usa esse telefone; a planilha anterior tinha o número do Maps.
- Open Barba: WhatsApp **(98) 98112-2411**, divulgado no destaque oficial **Telefones**. O destaque é antigo e exige confirmação de vigência.
- Ilha Brasa: link da bio com dígito divergente; usado o número comercial do Maps. Confirmar antes de considerar o canal validado.
- Pais e Filhos: endereço da bio adotado; difere do Maps.
- Legends: endereço da bio/Maps no Cohatrac adotado; Linktree aponta endereço antigo.
- Rancho Caseiro: localização de Araçagi/Jardim II precisa de confirmação; o site orienta consultar a equipe.
- Fernando: horário de segunda não confirmado; foi omitido.

Não foram enviadas mensagens às empresas nem testadas entregas de mensagens WhatsApp.
