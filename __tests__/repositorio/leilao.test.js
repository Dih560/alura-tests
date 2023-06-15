import { obtemLeiloes, obtemLeilao } from "../../src/repositorio/leilao";
import apiLeiloes from "../../src/servicos/apiLeiloes";
import { describe, it, expect, jest } from "@jest/globals";

jest.mock("../../src/servicos/apiLeiloes");

const mockLeiloes = [
  {
    id: 1,
    nome: "TV",
    descricao: 'TV de LED 50"',
    valorInicial: 1000,
    icone: "tv",
    cor: "#ffba05",
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

describe("repositorio/leilao", () => {
  beforeEach(() => apiLeiloes.get.mockClear());

  describe("obtemLeiloes", () => {
    it("deve retornar uma lista de leilões", async () => {
      apiLeiloes.get.mockImplementation(() => mockRequest(mockLeiloes));
      const result = await obtemLeiloes();

      expect(result).toEqual(mockLeiloes);
      expect(apiLeiloes.get).toHaveBeenCalledWith('/leiloes');
      expect(apiLeiloes.get).toHaveBeenCalledTimes(1);
    });

    it("deve retornar uma lista vazia quando a requisição falhar", async () => {
      apiLeiloes.get.mockImplementation(mockRequestErro);
      const result = await obtemLeiloes();

      expect(result).toEqual([]);
      expect(apiLeiloes.get).toHaveBeenCalledWith('/leiloes');
      expect(apiLeiloes.get).toHaveBeenCalledTimes(1);
    });
  });

  describe("obtemLeilao", () => {
    it("deve retornar um leilao", async () => {
      apiLeiloes.get.mockImplementation(() => mockRequest(mockLeiloes[0]));
      const result = await obtemLeilao(1);

      expect(result).toEqual(mockLeiloes[0]);
      expect(apiLeiloes.get).toHaveBeenCalledWith("/leiloes/1");
      expect(apiLeiloes.get).toHaveBeenCalledTimes(1);
    });

    it("deve retornar um objeto vazio para um id inexistente", async () => {
      apiLeiloes.get.mockImplementation(() => mockRequest({}));
      const result = await obtemLeilao(2);

      expect(result).toEqual({});
      expect(apiLeiloes.get).toHaveBeenCalledWith("/leiloes/2");
      expect(apiLeiloes.get).toHaveBeenCalledTimes(1);
    });

    it("deve retornar um objeto vazio ao rejeitar a promisse", async () => {
      apiLeiloes.get.mockImplementation(mockRequestErro);
      const result = await obtemLeilao(1);

      expect(result).toEqual({});
      expect(apiLeiloes.get).toHaveBeenCalledWith("/leiloes/1");
      expect(apiLeiloes.get).toHaveBeenCalledTimes(1);
    });
  });
});
