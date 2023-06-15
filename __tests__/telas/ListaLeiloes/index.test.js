import React from "react";
import useListaLeiloes from "../../../src/hooks/useListaLeiloes";
import { describe, it, expect, beforeEach } from "@jest/globals";
import { act, render, waitFor } from "@testing-library/react-native";
import { Text } from "react-native";

import ListaLeiloes from "../../../src/telas/ListaLeiloes";
import Leilao from "../../../src/telas/ListaLeiloes/componentes/Leilao";

const mockLeiloes = [
  {
    id: 1,
    nome: "TV",
  },
  {
    id: 2,
    nome: "Geladeira",
  },
];
const mockObtemLeiloes = jest.fn();

jest.mock("../../../src/hooks/useListaLeiloes", () =>
  jest.fn(() => [mockLeiloes, mockObtemLeiloes])
);
jest.mock("../../../src/telas/ListaLeiloes/componentes/Leilao");

describe("telas/ListaLeiloes/index", () => {
  const [lista, obtemLeiloes] = useListaLeiloes();

  beforeEach(() => mockObtemLeiloes.mockClear());

  it("deve renderizar a tela de leilões com alguns dados", async () => {
    Leilao.mockImplementation(({ nome }) => <Text>Teste: {nome}</Text>);

    const { getByText } = render(<ListaLeiloes />);

    await waitFor(() => {
      expect(getByText("Teste: TV")).toBeTruthy();
      expect(getByText("Teste: Geladeira")).toBeTruthy();
      expect(obtemLeiloes).not.toHaveBeenCalled();
    });
  });

  it("deve atualizar a lista quando a flatlist recarregar", async () => {
    Leilao.mockImplementation(({ nome }) => <Text>{nome}</Text>);

    const { getByTestId } = render(<ListaLeiloes />);

    const flatList = getByTestId("lista-leiloes");

    act(() => {
      flatList.props.onRefresh();
    });

    await waitFor(() => {
        expect(mockObtemLeiloes).toHaveBeenCalledTimes(1);
    });
  });
});
