// Vamos falar de coisas basicas da progarmação em JavaScript

// Variáveis 

//const mensagem = "Oi, como vai você?"// String
//const number = 2.5 // number


// console.log(number) // Console.log()envia uma mensagem para o terminal
// console.log(mensagem) //  Console.log()envia uma mensagem para o terminal

//function soma(numero1, numero2) {
//const numero1 = 10
//const numero2 = 20

//console.log( "A soma dos Nº1 + Nº2 e de ->", numero1 + numero2)
//}

//soma(10,20)
//soma(5,5)
//soma(6,7)
//soma(8,9)
//soma(0,4)

/*const xicara = {
    cor: "branco" , 
    tamanho: 10, 
    estaSujo(simNao) {
        console.log(simNao)
        // logica de programção
    }
}


console.log(xicara.cor)

const cor = "preto"
const tamanho =5
function sujo(esta){
    console.log(esta)
}

const xicara2 = {
    cor,
    tamanho,
    sujo
}  */

// iniciando servidor, digitar no terminal npm init -y , vai iniciar 


//usei o express para criar e configurar meu servidor 
const express = require("express")
const server = express()

const db = require ("./db")


/*const ideas = [
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729007.svg",
        title: "Cursos de programação",
        category: "Estudo",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque quaerat odit mollitia",
        url: "https://rocketseat.com.br",
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729064.svg",
        title: "Exercicios",
        category: "Aerobico",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque quaerat odit mollitia",
        url: "https://rocketseat.com.br",
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729027.svg",
        title: "Meditação",
        category: "Saúde",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque quaerat odit mollitia",
        url: "https://rocketseat.com.br",
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729032.svg",
        title: "Karaokê",
        category: "Diversão em família",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque quaerat odit mollitia",
        url: "https://rocketseat.com.br",
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729038.svg",
        title: "Pintura",
        category: "Criatividade",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque quaerat odit mollitia",
        url: "https://rocketseat.com.br",
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729048.svg",
        title: "Recortes",
        category: "Criatividade",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque quaerat odit mollitia",
        url: "https://rocketseat.com.br",
    },

] */


//configurar arquivos estaticos (css, scripts, imagens)
server.use(express.static("public"))

//habilitar uso do req.body
server.use(express.urlencoded({ extended: true}))

//configuração do nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server,
    noCache: true, // boolean
})

// criei uma rota /
//e capturo o pedido do cliente para responder
server.get("/", function (req, res) {

         db.all(`SELECT * FROM ideas`, function(err, rows) {
             if (err) {
                 console.log(err)
                 return res.send("Erro no banco de dados")
             }

        const reverseIdeas = [...rows].reverse()

        let lastIdeas = []
        for (let idea of reverseIdeas) {
            if (lastIdeas.length < 2) {
                lastIdeas.push(idea)
            }
        }
    
    
    
        return res.render("index.html", { ideas: lastIdeas })

        
    })

})
    


server.get("/ideias", function (req, res) {

    db.all(`SELECT * FROM ideas`, function(err, rows) {
            if (err) return console.log(err)
        
    const reverseIdeas = [...rows].reverse()

    return res.render("ideias.html", { ideas: reverseIdeas })
    
    })

})

server.post("/" , function (req, res){
      //Inserir dado na Tabela 
      const query = `
      INSERT INTO ideas (
          image,
          title,
          category,
          description,
          link
      )VALUES(?,?,?,?,?);
      `    

      const values = [
             req.body.image,
             req.body.title,
             req.body.category,
             req.body.description,
             req.body.link,

      ]

     db.run(query, values,function(err) {
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados")
         
        }

        return res.redirect("/ideias")
     })

          
})

// Liguei meu servidor na porta 3000 
server.listen(3000)

