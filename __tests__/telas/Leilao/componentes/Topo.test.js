import React from "react";
import Topo from "../../../../src/telas/Leilao/componentes/Topo";
import { describe, it, expect } from "@jest/globals";
import { render, waitFor } from "@testing-library/react-native";

const leilao = {
  nome: "Leilão de teste",
  descricao: "Teste automatizado",
  lances: [],
  valorInicial: 500,
};

describe("telas/Leilao/componentes/Topo", () => {
  it("deve renderizar o topo do lailão com algumas informações", async () => {
    const { getByText, getAllByText } = render(<Topo {...leilao} />);

    await waitFor(() => {
        expect(getByText("Leilão de teste")).toBeTruthy();
        expect(getByText("Teste automatizado")).toBeTruthy();
        expect(getAllByText("R$ 500,00")).toBeTruthy();
        expect(getAllByText("R$ 500,00").length).toBe(2);
    });
  });
});
