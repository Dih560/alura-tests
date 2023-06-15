import React from "react";
import EnviaLance from "../../../../src/telas/Leilao/componentes/EnviaLance";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import {
  ENVIADO,
  NAO_ENVIADO,
} from "../../../../src/negocio/constantes/estadosLance";
import { describe, expect, it, jest } from "@jest/globals";

jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");

describe("telas/Leilao/componentes/EnviaLance", () => {
  it("deve enviar o lance quando o botão for pressionado", async () => {
    const enviaLance = jest.fn(
      () => new Promise(resolve => resolve(ENVIADO))
    );
    const { getByPlaceholderText, getByA11yHint, getByText } = render(
      <EnviaLance enviaLance={enviaLance} cor="blue" />
    );

    const input = getByPlaceholderText("R$");
    const button = getByA11yHint("Enviar lance");

    fireEvent.changeText(input, "10");
    fireEvent.press(button);

    expect(enviaLance).toHaveBeenCalledWith("10");
    expect(enviaLance).toHaveBeenCalledTimes(1);

    await waitFor(() => {
      expect(getByText(ENVIADO)).toBeTruthy();
    });

    expect(() => getByText(NAO_ENVIADO)).toThrow();
  });

  it("deve enviar um lance e esperar um erro", async () => {
    const enviaLance = jest.fn(
      () => new Promise(resolve => resolve(NAO_ENVIADO))
    );
    const { getByPlaceholderText, getByA11yHint, getByText } = render(
      <EnviaLance enviaLance={enviaLance} cor="blue" />
    );

    const input = getByPlaceholderText("R$");
    const button = getByA11yHint("Enviar lance");

    fireEvent.changeText(input, "10");
    fireEvent.press(button);

    expect(enviaLance).toHaveBeenCalledWith("10");
    expect(enviaLance).toHaveBeenCalledTimes(1);

    await waitFor(() => {
      expect(getByText(NAO_ENVIADO)).toBeTruthy();
    });

    expect(() => getByText(ENVIADO)).toThrow();
  });
});
