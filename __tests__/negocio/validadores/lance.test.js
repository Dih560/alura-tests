import {
  VALIDO,
  INVALIDO,
  MENOR_QUE_VALOR_INICIAL,
  MENOR_OU_IGUAL_AOS_LANCES,
} from "../../../src/negocio/constantes/estadosLance";
import {
  validaFormatoNumericoDoLance,
  validaLance,
} from "../../../src/negocio/validadores/lance";
import { describe, it, expect } from "@jest/globals";

describe("negocio/validadores/lance", () => {
  describe("validaFormatoNumericoDoLance", () => {
    it("deve retornar mensagem de VALIDO quando valor for '8,59'", () => {
      const result = validaFormatoNumericoDoLance("8,59");
      expect(result).toBe(VALIDO);
    });

    it("deve retornar mensagem de INVALIDO quando valor for '8.59'", () => {
      const result = validaFormatoNumericoDoLance("8.59");
      expect(result).toBe(INVALIDO);
    });
  });

  describe("validaLance", () => {
    it("deve retornar mensagem de VALIDO quando valor form 100, lances for [] e valorInicial = 50", () => {
      const valor = 100;
      const lances = [];
      const valorInicial = 50;
      const result = validaLance(valor, { lances, valorInicial });
      expect(result).toBe(VALIDO);
    });

    it("deve retornar mensagem de VALIDO quando valor form 100, lances for [{valor: 60}, {valor: 80}] e valorInicial = 50", () => {
      const valor = 100;
      const lances = [{valor: 60}, {valor: 80}];
      const valorInicial = 50;
      const result = validaLance(valor, { lances, valorInicial });
      expect(result).toBe(VALIDO);
    });

    it("deve retornar mensagem de MENOR_QUE_VALOR_INICIAL quando valor form 40, lances for [] e valorInicial = 50", () => {
        const valor = 40;
        const lances = [];
        const valorInicial = 50;
        const result = validaLance(valor, { lances, valorInicial });
        expect(result).toBe(MENOR_QUE_VALOR_INICIAL);
      });

      it("deve retornar mensagem de MENOR_OU_IGUAL_AOS_LANCES quando valor form 70, lances for [{valor: 70}, {valor: 80}] e valorInicial = 50", () => {
        const valor = 70;
        const lances = [{valor: 70}, {valor: 80}];
        const valorInicial = 50;
        const result = validaLance(valor, { lances, valorInicial });
        expect(result).toBe(MENOR_OU_IGUAL_AOS_LANCES);
      });

      it("deve retornar mensagem de MENOR_OU_IGUAL_AOS_LANCES quando valor form 60, lances for [{valor: 70}, {valor: 80}] e valorInicial = 50", () => {
        const valor = 60;
        const lances = [{valor: 70}, {valor: 80}];
        const valorInicial = 50;
        const result = validaLance(valor, { lances, valorInicial });
        expect(result).toBe(MENOR_OU_IGUAL_AOS_LANCES);
      });
  });
});
