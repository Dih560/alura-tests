import { formataMaiorLanceDoLeilao } from "../../../src/negocio/formatadores/lance";
import { describe, it, expect } from "@jest/globals";

describe("negocio/formatadores/lance", () => {
  describe("formataMaiorLanceDoLeilao", () => {
    it("deve retornar 150 quando a array for lances for [{valor: 100}, {valor: 150}] e valorInicial from 50", () => {
      const lances = [{valor: 100}, {valor: 150}];
      const valorInicial = 50
      const result = formataMaiorLanceDoLeilao(lances, valorInicial);
      expect(result).toBe(150);
    });

    it("deve retornar 150 quando a array for lances for [{valor: 100}, {valor: 90}, {valor: 150}] e valorInicial from 50", () => {
        const lances = [{valor: 100}, {valor: 90}, {valor: 150}];
        const valorInicial = 50
        const result = formataMaiorLanceDoLeilao(lances, valorInicial);
        expect(result).toBe(150);
      });

    it("deve retornar 200 quando a array for lances for [] e valorInicial from 200", () => {
        const lances = [];
        const valorInicial = 200
        const result = formataMaiorLanceDoLeilao(lances, valorInicial);
        expect(result).toBe(200);
    });
  });
});
