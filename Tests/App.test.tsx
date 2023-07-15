import { describe, it, expect, test } from "vitest";
import { render } from "@testing-library/react";
import useEvent from "@testing-library/user-event";

import { App } from "../src/App";

test("My app works as expected", async () => {
    const app = render(<App />);

    const user = useEvent.setup();
    const textareaFrom = app.getByPlaceholderText("Introducir texto");

    await user.type(textareaFrom, "Hola mundo");

    const result = await app.findByDisplayValue(/Hello world/i, {}, { timeout: 5000 });

    expect(result).toBeTruthy();
});
