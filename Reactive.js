/**
 * Classe que implementa um sistema básico de reatividade.
 */
class Reactive {
  /**
   * Construtor da classe Reactive.
   * @param {object} options - Objeto de opções para inicializar a classe.
   *                           Espera-se que contenha uma propriedade 'data'
   *                           com os dados iniciais.
   */
  constructor(options) {
    // _data armazena os valores reais das propriedades
    this._data = {};

    // data é um objeto proxy que usa getters e setters para reatividade
    this.data = {};

    // Configura as propriedades com getters e setters
    for (const key in options.data) {
      // Define uma propriedade no objeto data
      Object.defineProperty(this.data, key, {
        // Getter retorna o valor da propriedade do _data
        get: () => {
          return this._data[key];
        },
        // Setter atualiza o valor e altera o DOM conforme necessário
        set: (newValue) => {
          this._data[key] = newValue;
          // Atualiza todos os elementos DOM com data-bind correspondente
          document.querySelectorAll(`[data-bind=${key}]`).forEach((el) => {
            el.textContent = newValue;
          });
        },
      });
    }

    // Inicializa as propriedades para acionar os setters
    for (const key in options.data) {
      this.data[key] = options.data[key];
    }
  }
}

// Exemplo de uso
// const app = new Reactive({
//     data: {
//         message: 'Olá, mundo!'
//     }
// });
