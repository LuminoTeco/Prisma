## Prisma

Prisma é uma plataforma de aprendizado dinâmico com fórum integrado para instituições de ensino.

### Configuração da Aplicação

Para utilizar nossa aplicação, siga os passos abaixo:

1. **Instale as dependências**: Navegue para a pasta `Prism` e execute o comando:

    ```bash
    cd Prism
    npm install
    ```

2. **Inicie a aplicação**:

    ```bash
    npm run dev
    ```

3. **Inicie o backend**: Navegue para a pasta `server` e execute o comando:

    ```bash
    cd server
    npm start
    ```

4. **Caso haja erros de instalação**: Se o script apresentar erros, reinstale as seguintes dependências:

    ```bash
    npm install axios express cors
    ```

   Se o problema persistir, reinstale também:

    ```bash
    npm install cors bcrypt jsonwebtoken mysql2
    ```

5. **Atualize o npm (se necessário)**: Se você encontrar problemas relacionados ao npm, atualize-o com o comando:

    ```bash
    npm install -g npm@10.8.3
    ```

   Após atualizar, refaça as instalações e execute o programa.

   **Observação**: Pode haver problemas com o npm nos computadores da escola. Se a instalação falhar, siga as instruções acima para atualizar o npm.

---

### Acesso às Páginas do Front-end

Algumas páginas do front-end não têm links diretos. Utilize os seguintes URLs para acessá-las:

- [Cadastro de Unidades](http://localhost:5173/units)
- [Login](http://localhost:5173/login)

Se você acessar um link incorreto, será redirecionado para uma tela de erro personalizada.

---

Desculpe por qualquer inconveniente, Professores!
