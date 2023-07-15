import { Form } from "react-bootstrap";
import { type FC } from "react";

import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from "../Constants";
import { FromLanguage, Language, SectionType } from "../types.d";

type Props =
    | {
          type: SectionType.From;
          value: FromLanguage;
          onChange: (language: FromLanguage) => void;
      }
    | {
          type: SectionType.To;
          value: Language;
          onChange: (language: Language) => void;
      };

export const LanguageSelector: FC<Props> = ({ type, value, onChange }) => (
    <Form.Select
        aria-label="Select language"
        onChange={(e) => onChange(e.currentTarget.value as Language)}
        value={value}
        style={{ cursor: "pointer" }}
    >
        {type === SectionType.From && (
            <option value={AUTO_LANGUAGE}>Detect language</option>
        )}

        {Object.entries(SUPPORTED_LANGUAGES).map(([key, language]) => (
            <option key={key} value={key}>
                {language}
            </option>
        ))}
    </Form.Select>
);
