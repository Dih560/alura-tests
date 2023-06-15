import { obtemLancesDoLeilao, adicionaLance } from "../../src/repositorio/lance";
import apiLeiloes from "../../src/servicos/apiLeiloes";
import { describe, it, expect, jest, beforeEach } from "@jest/globals";

jest.mock("../../src/servicos/apiLeiloes");

const mockLances = [
  {
    valor: 1000,
    leilaoId: 1,
    id: 1,
  },
  {
    valor: 1000.01,
    leilaoId: 1,
    id: 2,
  },
];

const mockRequest = (data) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data });
    }, 200);
  });

const mockRequestErro = () =>
  new Promise((_, reject) => {
    setTimeout(() => {
      reject();
    }, 200);
  });

describe("repositorio/lances", () => {
  beforeEach(() => {
    apiLeiloes.get.mockClear()
    apiLeiloes.post.mockClear()
  });

  describe("obtemLancesDoLeilao", () => {
    it("deve retornar os lances do leilao de id 1", async () => {
      apiLeiloes.get.mockImplementation(() => mockRequest(mockLances));
      const result = await obtemLancesDoLeilao(1);

      expect(result).toEqual(mockLances);
      expect(apiLeiloes.get).toHaveBeenCalledWith(
        "/lances?leilaoId=1&_sort=valor&_order=desc"
      );
      expect(apiLeiloes.get).toHaveBeenCalledTimes(1);
    });

    it("deve retornar um array vazio ao ser rejeitado", async () => {
      apiLeiloes.get.mockImplementation(mockRequestErro);
      const result = await obtemLancesDoLeilao(1);

      expect(result).toEqual([]);
      expect(apiLeiloes.get).toHaveBeenCalledWith(
        "/lances?leilaoId=1&_sort=valor&_order=desc"
      );
      expect(apiLeiloes.get).toHaveBeenCalledTimes(1);
    });
  });

  describe("adicionaLance", () => {
    it("deve enviar o lance e retornar true", async () => {
        apiLeiloes.post.mockImplementation(() => mockRequest(mockLances[0]));
        const result = await adicionaLance(mockLances[0]);

        expect(result).toEqual(true);
        expect(apiLeiloes.post).toHaveBeenCalledWith("/lances", mockLances[0]);
        expect(apiLeiloes.post).toHaveBeenCalledTimes(1);
    });

    it("deve enviar o lance e retornar false", async () => {
      apiLeiloes.post.mockImplementation(mockRequestErro);
      const result = await adicionaLance(mockLances[0]);

      expect(result).toEqual(false);
      expect(apiLeiloes.post).toHaveBeenCalledWith("/lances", mockLances[0]);
      expect(apiLeiloes.post).toHaveBeenCalledTimes(1);
  });
  });
});
