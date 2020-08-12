<div align="center">

[![Netlify Status](https://api.netlify.com/api/v1/badges/a8ddc86c-21de-453d-b903-aeaa32d2185d/deploy-status)](https://app.netlify.com/sites/ecoleta-nlw/deploys) ![](https://img.shields.io/badge/nextlevelweek-1.0-blueviolet?style=flat-square) ![alt release](https://img.shields.io/github/v/release/jeferson-sb/ecoleta?style=flat-square)

</div>

![alt Mockup frontend](assets/banner.png)
<br>
![alt Mockup mobile](assets/home-mobile.png)![alt Mockup mobile](assets/detalhes-mobile.svg)

## 💡 Projeto

O projeto busca ajudar pessoas a encontrarem pontos de coleta de materias próximos, no objetivo de melhorar o meio ambiente.

## 💻 Demo

[https://ecoleta-nlw.netlify.app](https://ecoleta-nlw.netlify.app)

## 🛠️ Ferramentas

- [Node.js](https://nodejs.org/en/docs/)
- [React](https://reactjs.org/)
- [React Native](http://reactnative.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Knex](http://knexjs.org/)
- [Express](http://expressjs.com/)
- [Multer](https://www.npmjs.com/search?q=multer)
- [Celebrate](https://www.npmjs.com/package/celebrate)
- [Yup](https://www.npmjs.com/package/yup)
- [Axios](https://www.npmjs.com/package/axios)
- [SQLite3](https://www.npmjs.com/package/sqlite3)
- [pg](https://www.npmjs.com/package/pg)
- e mais...

## 🚀 Quick start

### Instalação

```bash
$ cd ecoleta
$ cd web && yarn
```

```bash
$ cd .. && cd server
$ npm run knex:migrate && yarn knex:seed
```

### Utilização

```bash
$ cd front-end
$ npm start
```

> Abra outro terminal na mesma pasta e rode

```bash
$ cd back-end
$ npm run dev
```

> Renomeie `.env.example` para `.env` e mude o seu ip

[Veja todos os endpoints](./server/README.md)

## To-Do List

- [x] Release apk 1.0.0
- [ ] Implementar Yup
- [ ] Implementar Styled Components
- [ ] Criar testes
- [ ] Criar dashboard para visualizar, excluir e deletar pontos

## 🤝 Como Contribuir

1. Faça um Fork no repositório
2. Crie sua branch: `git checkout -b featureXYZ`
3. Faça commit das suas alterações desejadas: `git commit -m "feat: Feature Linda"`
4. Faça o push: `git push origin featureXYZ`
5. Aguarde o review do mantenedor

## 💅 Design

[Figma File](https://www.figma.com/file/1SxgOMojOB2zYT0Mdk28lB/Ecoleta)

## 📝 Licença

Este projeto está sob a licença [MIT](https://github.com/fernandovalenca/ecoleta/blob/master/LICENSE)
