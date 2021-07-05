# Cadastro de Carro

## RF  (Requisitos Funcionais)
 - Deve ser possível cadastrar um novo carro.

        
 
## RN  (Regras de Negócios)
 - Não dever ser possível cadastrar um carro com uma placa já existente.
 - O carro deve ser cadastrado por padrão com disponibilidade.
 - * O usuário responsável pelo cadastro deve ser um admin.

# Listagem de Carros

## RF
 - Deve ser possível listar todos os carros disponíveis.
 - Deve ser possível listar todos os carros disponíveis pela categoria.
 - Deve ser possível listar todos os carros disponíveis pela marca.
 - Deve ser possível listar todos os carros disponíveis pelo nome.

## RN 
 - O usuário não precisa estar logado no sistema.

# Cadastro de espeficação no Carro

## RF  
- Deve ser possível cadastrar uma especificação para um carro.
- Deve ser possível listar todas as especificação.
- Deve ser possível listar todos os carros.



## RN 
- Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
- Não deve ser possível cadastrar uma especificação já existem para o mesmo carro.
- O usuário responsável pelo cadastro deve ser um admin.

# Cadastro de imagens do carro

## RF 
- Deve ser possível cadastrar a imagem do carro.
- Deve ser possível listar todos os carros.

## RNF 
- Utilizar o multer para upload dos arquivos.

## RN 
- O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
- O usuário responsável pelo cadastro deve ser um admin.

# Aluguel de Carros

## RF 
- Deve ser possível cadastrar um aluguel.

## RN 
- O aluguel deve ter duração miníma de 24 horas.
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.
