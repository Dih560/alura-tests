import { act, renderHook } from "@testing-library/react-hooks";
import useListaLeiloes from "../../src/hooks/useListaLeiloes";
import { describe, it, expect, jest } from "@jest/globals";
import { obtemLeiloes } from "../../src/repositorio/leilao";

jest.mock("../../src/repositorio/leilao");

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

const mockLeiloesAtualizada = [
  {
    id: 1,
    nome: "TV",
    descricao: 'TV de LED 50"',
    valorInicial: 1000,
    icone: "tv",
    cor: "#ffba05",
  },
  {
    id: 2,
    nome: "Geladeira",
    descricao: "Geladeira 200 litros",
    valorInicial: 500,
    icone: "cheese",
    cor: "#6bd1ff",
  },
];

describe("hooks/useListaLeiloes", () => {
  it("deve retornar uma lista de leilões e uma função para atualizar", async () => {
    obtemLeiloes.mockImplementation(() => mockLeiloes);
    const { waitForNextUpdate, result } = renderHook(useListaLeiloes);
    await waitForNextUpdate();
    let [lista, atualizaLeiloes] = result.current;

    expect(lista).toEqual(mockLeiloes);

    obtemLeiloes.mockImplementation(() => mockLeiloesAtualizada);
    await act(() => atualizaLeiloes(mockLeiloesAtualizada));
    [lista] = result.current;

    expect(lista).toEqual(mockLeiloesAtualizada);
  });
});
