import React from "react";
import Lance from "../../../../src/telas/Leilao/componentes/Lance";
import { describe, it, expect } from "@jest/globals";
import { render, waitFor } from "@testing-library/react-native";

const lance = {
    id: 1,
    valor: 500
}

describe("telas/Leilao/componentes/Lance", () => {
    it("deve renderizar os lances com suas informações", async () => {
        const { getByText } = render(<Lance {...lance} />)

        await waitFor(() => {
            expect(getByText("R$ 500,00")).toBeTruthy();
        });
    });
});