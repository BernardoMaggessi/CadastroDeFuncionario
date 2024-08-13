// Classe base Funcionario
class Funcionario {
    constructor(nome, idade, cargo) {
        if (!nome || !idade || !cargo) {
            throw new Error("Todos os campos obrigatórios devem ser preenchidos.");
        }
        this.nome = nome;
        this.idade = idade;
        this.cargo = cargo;
    }

    seApresentar() {
        return `Olá, meu nome é ${this.nome}, tenho ${this.idade} anos e sou ${this.cargo}.`;
    }

    trabalhar() {
        return `${this.nome} está trabalhando.`;
    }
}

// Classe Gerente que herda de Funcionario
class Gerente extends Funcionario {
    constructor(nome, idade, cargo, departamento) {
        super(nome, idade, cargo);
        if (!departamento) {
            throw new Error("O campo departamento é obrigatório para gerentes.");
        }
        this.departamento = departamento;
    }

    gerenciar() {
        return `${this.nome} está gerenciando o departamento de ${this.departamento}.`;
    }
}

// Classe Desenvolvedor que herda de Funcionario
class Desenvolvedor extends Funcionario {
    constructor(nome, idade, cargo, linguagem) {
        super(nome, idade, cargo);
        if (!linguagem) {
            throw new Error("O campo linguagem é obrigatório para desenvolvedores.");
        }
        this.linguagem = linguagem;
    }

    programar() {
        return `${this.nome} está programando em ${this.linguagem}.`;
    }
}

// Função para criar instâncias dos funcionários
function criarFuncionario() {
    const nome = document.getElementById("nome").value;
    const idade = document.getElementById("idade").value;
    const cargo = document.getElementById("cargo").value;
    const departamento = document.getElementById("departamento").value;
    const linguagem = document.getElementById("linguagem").value;

    let funcionario;
    try {
        if (cargo === "gerente") {
            funcionario = new Gerente(nome, idade, cargo, departamento);
        } else if (cargo === "desenvolvedor") {
            funcionario = new Desenvolvedor(nome, idade, cargo, linguagem);
        }

        document.getElementById("resultado").innerText = 
            funcionario.seApresentar() + "\n" + 
            funcionario.trabalhar() + "\n" + 
            (cargo === "gerente" ? funcionario.gerenciar() : funcionario.programar());

        document.getElementById("erro").innerText = ""; // Limpa a mensagem de erro

    } catch (error) {
        exibirErro(error.message);
    }
}

// Função para exibir mensagens de erro
function exibirErro(mensagem) {
    document.getElementById("erro").innerText = "Erro: " + mensagem;
}

// Mostra ou esconde os campos adicionais com base no cargo selecionado
document.getElementById("cargo").addEventListener("change", function() {
    if (this.value === "gerente") {
        document.getElementById("departamentoDiv").style.display = "block";
        document.getElementById("linguagemDiv").style.display = "none";
    } else if (this.value === "desenvolvedor") {
        document.getElementById("departamentoDiv").style.display = "none";
        document.getElementById("linguagemDiv").style.display = "block";
    }
});

// Inicializa a exibição dos campos de acordo com o cargo selecionado
document.getElementById("cargo").dispatchEvent(new Event('change'));
