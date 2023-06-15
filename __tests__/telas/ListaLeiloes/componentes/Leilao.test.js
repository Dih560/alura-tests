import React from "react";
import Leilao from "../../../../src/telas/ListaLeiloes/componentes/Leilao";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { beforeEach, describe, expect, it } from "@jest/globals";
import { useNavigation } from "@react-navigation/native";

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn().mockReturnValue({
    navigate: jest.fn(),
  }),
}));

describe("telas/ListaLeiloes/componentes/Leilao", () => {
  const navigation = useNavigation();

  beforeEach(() => navigation.navigate.mockClear());

  const leilao = {
    id: 1,
    nome: "Leilão de teste",
    valorInicial: 250,
  };

  it("deve verificar as informações do leilão", async () => {
    const { getByText } = render(<Leilao {...leilao} />);

    await waitFor(() => {
      expect(getByText("Leilão de teste")).toBeTruthy();
      expect(getByText("R$ 250,00")).toBeTruthy();
    });
  });

  it("deve chamar o método de navegação para a tela de detalhes do lailão", () => {
    const { getByText } = render(<Leilao {...leilao} />);

    fireEvent.press(getByText("Leilão de teste"));

    expect(navigation.navigate).toHaveBeenCalledWith("Leilao", { id: 1 });
    expect(navigation.navigate).toHaveBeenCalledTimes(1);
  });
});
