# Contract api
## Зависимости:
На странице должна быть подключена библиотека `web3.js` и `contractApi.js`
## Использование:
```
let contractApi = new ContractApi(provider, period, contractOptions);
```
## Описание параметров конструктора
- provider(String): провайдер для web3.js через которого происходит обращение к контракту
- period(Number): промежуток времени между 2 вызовами метода контракта(в миллисекундах)
- contractOptions(Object)
    - abi(Array): abi контракта
    - address(String): адрес контракта в Ethereum сети

Пример использования можно посмотреть в файле main.js    